require("dotenv").config();
const SCRAPE_API_KEY = process.env.SCRAPE_API_KEY;

const axios = require('axios');
// const params = {
//   access_key: SCRAPE_API_KEY,
//   url: 'https://medium.com/nerd-for-tech/a-beginner-introduction-to-using-axios-for-requests-e07fe9c87f54'
// }

async function getScrape(urltoscrape) {
    const response = await axios.get('http://api.scrapestack.com/scrape', {
        params: {
            access_key: SCRAPE_API_KEY,
            url: urltoscrape
        }
        
    });
    console.log(response.data);
};

// getScrape('https://mau.ru/');

module.exports = { getScrape };