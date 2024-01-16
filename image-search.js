require("dotenv").config();
const accessKey = process.env.UNSPLASH_ACCESS_KEY;

// Function to fetch a random photo from Unsplash
const fetchRandomPhoto = async () => {
  try {
    // Construct the API URL
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

    // Make a GET request to the Unsplash API using async/await
    const response = await fetch(apiUrl);

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();
      // Access photo information from the data
      console.log(data.urls.raw);
    } else {
      // Handle errors
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// Call the function
fetchRandomPhoto();
