require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

async function speech(textToConvert) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: textToConvert,
  });
  const speechFileName = textToConvert.replace(/\s/g, "_").slice(0, 20);
  const speechFile = path.resolve(`./public/audio/${speechFileName}.mp3`);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  const file = await fs.promises.writeFile(speechFile, buffer);
  return [speechFile, speechFileName];
}

module.exports = { speech };
