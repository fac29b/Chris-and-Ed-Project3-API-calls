require("dotenv").config();

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

const FetchRandomPhotoForBg = async () => {
  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      // console.log(data.urls.raw);
      return data.urls.raw;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { FetchRandomPhotoForBg };
