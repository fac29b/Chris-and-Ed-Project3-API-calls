require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

async function visionRequest(imagesUrl) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What's in this image? Give me short description.",
          },
          {
            type: "image_url",
            image_url: {
              url: imagesUrl,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0];
}

module.exports = { visionRequest };
