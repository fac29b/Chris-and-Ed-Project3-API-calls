require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const speechFile = path.resolve("./speech.mp3");

async function speech(textToConvert) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: textToConvert,
  });
  console.log("withintTTS:", speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  const file = await fs.promises.writeFile(speechFile, buffer);
  return speechFile;
}

module.exports = { speech };
