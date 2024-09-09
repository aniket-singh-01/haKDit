const Groq = require("groq-sdk");
const { ocrSpace } = require('ocr-space-api-wrapper');

require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const performOCR = async (filepaths) => {
    try {
        let text = '';
        const result = await ocrSpace(filepaths, process.env.SPACE_OCR_KEY);
        text += result.ParsedResults[0].ParsedText + '\n';
        return text;
    } catch (error) {
        console.error('Error during OCR:', error);
        throw error;
    }
};

const generateExtractionPrompt = (type, ocrText) => {
    let fields = `
        name: The name of the person or entity. Return empty string if uncertain.
        dob: The date of birth or establishment in DD-MM-YYYY format. Return empty string if uncertain.
        docno: The unique identifier or number found on the document. Return empty string if uncertain.
        address: The address of the person or entity. Return empty string if uncertain.
        type: ${type}. Return empty string if uncertain.
        typematched: true/false value indicating if the type of document was same or similar as ${type}. Return false if uncertain.
        otherdata: Any other relevant information that can be extracted. Return empty string if uncertain.
        disabilitypercentage: The percentage of disability. Return empty string if uncertain.
        disabilitytype: The type of disability mentioned in the document. Return empty string if uncertain.
        gender: The gender of the person. Return empty string if uncertain.
        language: The language in which the document is written. Return empty string if uncertain.
        incomedetails: Income details mentioned in the document. Return empty string if uncertain.
        subjects: A delimited string of subjects and scores. Return empty string if uncertain.
    `;
    switch (type) {
        case 'aadhaar':
            fields = `
                name: The name of the person.
                dob: The date of birth in DD-MM-YYYY format.
                docno: The Aadhaar number.
                gender: The gender of the card holder.
            `
            break;
        case 'pan':
            fields = `
                name: The name of the person or entity.
                dob: The date of birth or establishment in DD-MM-YYYY format.
                docno: The PAN number.
                fathername: The name of the father of the person.
            `
            break;
        case 'ews':
            fields = `
                name: The name of the person.
                docno: The EWS certificate number.
                certno: The certificate number.
                dateofissue: The date of issue of the certificate in DD-MM-YYYY format.
                validtill: The date till which the certificate is valid in DD-MM-YYYY format.
                income: The annual income of the person.
                caste: The caste of the person.
                address: The address of the person.
                fathername: The name of the father of the person.
            `
            break;
        case 'pwd':
            fields = `
                name: The name of the person.
                certno: The PWD certificate number.
                dateofissue: The date of issue of the certificate in DD-MM-YYYY format.
                dob: The date of birth of the person in DD-MM-YYYY format.
                gender: The gender of the person.
                regno: The registration number of the person.
                disabilitytype: The type of disability.
                disabilitypercentage: The percentage of disability.
                fathername: The name of the father of the person.
                address: The address of the person.
            `
            break;
        case 'caste':
            fields = `
                name: The name of the person.
                certno: The caste certificate number.
                fathername: The name of the father of the person.
                address: The address of the person.
                caste: The caste of the person.
            `
            break;
        case 'gate':
            fields = `
                name: The name of the person.
                parentname: The name of the parent of the person.
                regno: The registration/roll number of the person.
                dob: The date of birth of the person in DD-MM-YYYY format.
                exampaper: The paper in which the person appeared.
                gatescore: The score obtained in the GATE exam.
                marks: The total marks atainable in the exam.
                air: The All India Rank of the person.
                validupto: The date till which the score is valid in DD-MM-YYYY format.
                qualifyingmarks: The qualifying marks for the exam.
                caste: The caste of the person.
            `
            break;
        case 'license':
            fields = `
                name: The name of the person
                parentname: Card holder's parent name
                dob: The date of birth of the holder
                validupto: The date till the license is 
                dlnumber: This number is two digit state code followed by 13 numeric digits
                address: The address of the holder
                issuingauthority: The issuing authority of the license  
            `
            break;
        default:
            fields = `
                name: The name of the person or entity. Return empty string if uncertain.
                dob: The date of birth or establishment in DD-MM-YYYY format. Return empty string if uncertain.
                docno: The unique identifier or number found on the document. Return empty string if uncertain.
                address: The address of the person or entity. Return empty string if uncertain.
                otherdata: Any other relevant information that can be extracted. Return empty string if uncertain.
            `
            break;

    }

    let prompt = `
        Extract the following information from the ${type} and return it in RAW, parsable JSON format, RETURN EMPTY STRING IF UNCERTAIN:

        ${fields}

        Document OCR Output:
        ${ocrText}
    `;

    return prompt;
};

const generateExtractionOutput = async (type, ocrText) => {
    const prompt = generateExtractionPrompt(type, ocrText);

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "Extract the information as specified and return it in RAW, parsable JSON format.",
            },
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama-3.1-70b-versatile",
        response_format: { type: "json_object" },
    });

    console.log(JSON.stringify(response, null, 2));

    return response;
};

module.exports = { performOCR, generateExtractionPrompt, generateExtractionOutput };
