const fs = require('fs');
const path = require('path');
const { randomInt } = require('crypto');
const { performOCR, generateExtractionOutput } = require('./controllerUtils');
const sharp = require('sharp');
const { PDFImage } = require("pdf-image");

let filename = '';
let filepath = '';

const convertPDFToImages = async (pdfBuffer) => {
    filename = `${Date.now()}${randomInt(1000)}.webp`;
    filepath = path.join(__dirname, "../uploads", filename);
    const intermediateImageBaseName = `${Date.now()}${randomInt(1000)}`;
    const intermediateImagePath = path.join(__dirname, "../uploads", intermediateImageBaseName + ".png");

    try {
        const tempPDFPath = path.join(__dirname, "../uploads", `${intermediateImageBaseName}.pdf`);
        fs.writeFileSync(tempPDFPath, pdfBuffer);

        const pdfImage = new PDFImage(tempPDFPath, {
            convertOptions: {
                "-resize": "800px", // Resizing image width to 800px, keeping aspect ratio
                "-quality": "100", // High-quality conversion
            },
        });

        // Convert first page of the PDF to an image
        const convertedImagePath = await pdfImage.convertPage(0);

        if (!fs.existsSync(convertedImagePath)) {
            throw new Error(`Converted image not found: ${convertedImagePath}`);
        }

        const webpBuffer = await sharp(convertedImagePath)
            .grayscale(true)
            .resize({
                width: 800,
                withoutEnlargement: true
            })
            .sharpen({
                sigma: 1,
                m1: 3,
                m2: 3
            })
            .webp({
                quality: 100
            })
            .toBuffer();

        fs.writeFileSync(filepath, webpBuffer);

        // Clean up
        fs.unlinkSync(tempPDFPath);
        fs.unlinkSync(convertedImagePath);

        return filepath;

    } catch (err) {
        console.error('Error converting PDF to webp:', err);
        throw new Error('PDF to webp conversion failed');
    }
};

const processPDFFile = async (req, res) => {
    const startTime = Date.now();

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { type } = req.body;
    let filepath;

    try {
        filepath = await convertPDFToImages(req.file.buffer);

        console.log(filepath);
        const extractedText = await performOCR(filepath);

        const groqOutput = await generateExtractionOutput(type, extractedText);

        const endTime = Date.now();
        return res.json({
            ...groqOutput,
            executiontime: (endTime - startTime) / 1000,
        });
    } catch (error) {
        console.error('Error processing file:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        if (fs.existsSync(filepath)) {
            fs.rmSync(filepath);
        }
    }
};

module.exports = { processPDFFile };
