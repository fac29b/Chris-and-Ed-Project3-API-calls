require("dotenv").config();

const apiKey = process.env.GOOGLE_API_KEY;

const cx = process.env.YOUR_GOOGLE_CX;

const fetchImgSearch = async (searchQuery) => {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}`;

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchImgSearch };
