const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { randomInt } = require('crypto');
const { performOCR, generateExtractionOutput } = require('./controllerUtils');

let filename = '';
let filepath = '';

const processImage = async (fileBuffer) => {
    filename = `${Date.now()}-${randomInt(1000)}.webp`;
    filepath = path.join(__dirname, '../uploads', filename);

    try {
        const resizedImageBuffer = await sharp(fileBuffer)
            .grayscale(true)
            .resize({
                width: 800,
                withoutEnlargement: true,
            })
            .sharpen({
                sigma: 1,
                m1: 3,
                m2: 3,
            })
            .webp({
                quality: 100,
            })
            .toBuffer();

        fs.writeFileSync(filepath, resizedImageBuffer);

        return filepath;
    } catch (error) {
        console.error('Error during image processing:', error);
        throw error;
    } finally {
        fs.existsSync(filepath) && fs.rmSync(filepath);
    }
};

const processImageFile = async (req, res) => {
    const startTime = Date.now();

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { type } = req.body;
    let filepaths;

    try {
        filepaths = await processImage(req.file.buffer);

        const extractedText = await performOCR(filepaths);

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
        fs.existsSync(filepath) && fs.rmSync(filepath);
    }
};

module.exports = { processImageFile };
