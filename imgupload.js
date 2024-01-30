require("dotenv").config();
const fs = require('fs');
const { OpenAI } = require("openai");


async function askAboutImages(imageFilePaths, prompt) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const imagesContent = imageFilePaths.map((image) => {
    const imageAsBase64 = fs.readFileSync(image, 'base64');
    return {
      type: 'image_url',
      image_url: `data:image/png;base64,${imageAsBase64}`,
    };
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: [
          ...imagesContent,
        ],
      },
    ],
    max_tokens: 1000,
  });
  console.log('RESPONSE HERE', response.choices[0].message.content);
}
// (async () => {
//   await askAboutImages(['test.png', 'test-2.png'], 'What is in this image?');
// })();

module.exports = { askAboutImages };