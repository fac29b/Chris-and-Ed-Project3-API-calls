require("dotenv").config();

// Replace 'YOUR_API_KEY' with your actual API key from the Google Cloud Console.
const apiKey = process.env.GOOGLE_API_KEY;

// Replace 'YOUR_CX' with your actual Custom Search Engine ID.
const cx = process.env.YOUR_GOOGLE_CX;

const fetchImgSearch = async (searchQuery) => {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}`;

  try {
    // Make a GET request to the Unsplash API using async/await
    const response = await fetch(apiUrl);

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();
      // Access photo information from the data
      // console.log(data.queries.request);
      //console.log(data.items[0].pagemap.cse_image[0].src);
      return data.items;
    } else {
      // Handle errors
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchImgSearch };
