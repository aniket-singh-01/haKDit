const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const tesseract = require('tesseract.js');
const { randomInt } = require('crypto');
const { ChatGroq } = require("@langchain/groq");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StructuredOutputParser } = require('@langchain/core/output_parsers');

// Global filename and filepath variables
let filename = '';
let filepath = '';

// Process image using Sharp (resize, grayscale, and convert to WebP)
const processImage = async (fileBuffer) => {
    filename = `${Date.now()}-${randomInt(1000)}.webp`; // Generate a unique filename
    filepath = path.join(__dirname, '../uploads', filename); // Filepath for saving the image

    try {
        const resizedImageBuffer = await sharp(fileBuffer)
            .grayscale(true) // Convert to grayscale
            .resize({
                width: 800, // Resize image width to 800px
                withoutEnlargement: true, // Prevent enlarging smaller images
            })
            .sharpen({
                sigma: 1,
                m1: 3,
                m2: 3,
            })
            .webp({
                quality: 100, // Convert to WebP format with maximum quality
            })
            .toBuffer();

        // Save the processed image to the uploads folder
        fs.writeFileSync(filepath, resizedImageBuffer);

        return filepath; // Return the filepath for further processing
    } catch (error) {
        console.error('Error during image processing:', error);
        throw error;
    }
};

// Perform OCR using Tesseract.js
const performOCR = async () => {
    try {
        const result = await tesseract.recognize(filepath, 'eng');
        return result.data.text; // Return extracted text from OCR
    } catch (error) {
        console.error('Error during OCR:', error);
        throw error;
    }
};

// Generate extraction prompt for LangChain
const generateExtractionPrompt = async (type, ocrText) => {
    let prompt = '';
    switch (type) {
        case 'AadhaarCard':
            prompt = `
Extract the following information without markdown formatting from the Aadhaar Card and return it in RAW, parsable JSON format:

name: The name of the person. Remove any Indian name prefixes like 'Mr', 'Mrs', 'Shri', etc.
dob: The date of birth of the person in DD-MM-YYYY format.
docno: The 12-digit Aadhaar number.
address: The address of the person. If uncertain, return empty string.
type: Aadhaar Card.
otherdata: Any other relevant information that can be extracted.

Output only the RAW, parsable JSON data as described above.

Document OCR Output:
${ocrText}`;
            break;
        case 'PANCard':
            prompt = `
Extract the following information without markdown formatting from the PAN Card and return it in RAW, parsable JSON format:

name: The name of the person. Remove any Indian name prefixes like 'Mr', 'Mrs', 'Shri', etc.
dob: The date of birth of the person in DD-MM-YYYY format.
docno: The 10-character alphanumeric PAN number (format: [A-Z]{5}[\\d]{4}[A-Z]).
address: The address of the person. If uncertain, return empty string.
type: PAN Card.
otherdata: Any other relevant information that can be extracted.

Output only the RAW, parsable JSON data as described above.

Document OCR Output:
${ocrText}`;
            break;
        // Add more document types as needed
        default:
            prompt = `
Extract the following information from a generic document and return it in RAW, parsable JSON format:

name: The name of the person or entity. Remove any Indian name prefixes like 'Mr', 'Mrs', 'Shri', etc.
dob: The date of birth or establishment in DD-MM-YYYY format.
docno: The unique identifier or number found on the document.
address: The address of the person or entity. If uncertain, return empty string.
type: ${type}.
otherdata: Any other relevant information that can be extracted.

Output only the RAW, parsable JSON data as described above.

Document OCR Output:
${ocrText}`;
            break;
    }

    const parser = StructuredOutputParser.fromNamesAndDescriptions({
        name: 'The name of the person or entity. Return empty string if uncertain',
        dob: 'The date of birth or establishment in DD-MM-YYYY format. Return empty string if uncertain',
        docno: 'The unique identifier or number found on the document. Return empty string if uncertain',
        address: 'The address of the person or entity. Return empty string if uncertain',
        type: 'The type of document. Return empty string if uncertain',
        typematched: 'Boolean value indicating if the type of document was same as the one in OCR text supplied. Return false if uncertain',
        otherdata: 'Any other relevant information that can be extracted. Return empty string if uncertain',
        disabilitypercentage: 'The percentage of disability. Return empty string if uncertain',
        disabilitytype: 'The type of disability mentioned in the document. Return empty string if uncertain',
        gender: 'The gender of the person. Return empty string if uncertain',
        language: 'The language in which the document is written. Return empty string if uncertain',
        incomedetails: 'Income details mentioned in the document. Return empty string if uncertain',
        subjects: 'A delimited string of subjects and scores. Return empty string if uncertain',
    });

    const formatInstructions = parser.getFormatInstructions();

    const _prompt = new PromptTemplate({
        outputParser: parser,
        template: `
Whatever may be the case, output only the RAW, parsable JSON data as described above. 

ONLY include the extracted information in the RAW JSON format.

DO NOT include any markdown formatting. 
DO NOT include any additional information.
DO NOT include any comments, notes, explanations, or any other text apart from the JSON.

{promptTemplate}
{formatInstructions}

Document OCR Output:
{ocrText}
        `,
        inputVariables: [
            "promptTemplate",
            "formatInstructions",
            "ocrText",
        ],
    });

    const partialPrompt = await _prompt.partial({
        promptTemplate: prompt,
        formatInstructions: formatInstructions,
        ocrText: ocrText,
    });

    const model = new ChatGroq({
        temperature: 0,
        apiKey: process.env.GROQ_API_KEY
    });

    const input = await partialPrompt.format();
    const response = await model.invoke(input);

    console.log(response.content);

    return parser.parse(response.content);
};

// Controller function to handle file upload and process
const processFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { type } = req.body;

    try {
        // Process the uploaded image (resize, convert to WebP)
        await processImage(req.file.buffer);

        // Perform OCR on the processed image
        const extractedText = await performOCR();

        // Generate prompt and call LangChain API
        const langchainOutput = await generateExtractionPrompt(type, extractedText);

        res.json(langchainOutput);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Clean up the processed file after response
        fs.rmSync(filepath);
    }
};

module.exports = { processFile };
