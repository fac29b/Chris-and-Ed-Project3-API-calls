const axios = require("axios");
const { JSDOM } = require("jsdom");

async function scrapeImages(url) {
  try {
    // Fetch HTML content of the website
    const response = await axios.get(url);
    const html = response.data;

    // Parse HTML using jsdom
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract image elements
    const imageElements = document.querySelectorAll("img");

    // Extract image URLs - adding original url source at their root
    const imageUrls = Array.from(imageElements).map((img) => img.src);

    return imageUrls;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = { scrapeImages };
