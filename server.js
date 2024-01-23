require("dotenv").config();
const { visionRequest } = require("./openai-vision");
const { speech } = require("./openai-texttospeach");
const { fetchImgSearch } = require("./googleimg");
const { scrapeImages } = require("./htmlparser");
const { FetchRandomPhotoForBg } = require("./randombgimg");

const express = require("express");

const app = express();

const port = 3000;

app.use(express.static("public"));

app.post("/submitUrl", express.json(), async (req, res) => {
  try {
    console.log(req.body.imgUrlInput);

    const visionResult = await visionRequest(req.body.imgUrlInput);
    console.log(visionResult);
    if (req.body.radioBtnOption === "description") {
      res.json({
        audioAndDescription: false,
        visionResult: visionResult.message.content,
      });
      return;
    }
    const speechData = await speech(visionResult.message.content);

    res.json({
      audioAndDescription: true,
      speechData: speechData,
      visionResult: visionResult.message.content,
    });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/image-search", express.json(), async (req, res) => {
  try {
    // console.log(req.body);
    const imgResultsArray = await fetchImgSearch(req.body.searchInput);
    res.json({ imgResultsArray: imgResultsArray });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/submitUrltoscrape", express.json(), async (req, res) => {
  try {
    console.log(req.body.imgUrlInput);

    const scrapedImgUrlArray = await scrapeImages(req.body.imgUrlInput);
    console.log(scrapedImgUrlArray);

    const visionResult = await visionRequest(scrapedImgUrlArray[0]);
    console.log(visionResult.message.content);
    //   const speechfile = await speech(visionResult.message.content);
    //   console.log("within server:", speechfile);

    //   res.json({speechfile:speechfile});
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/retrieveBgImage", express.json(), async (req, res) => {
  try {
    const imgUrl = await FetchRandomPhotoForBg();

    res.json({ success: true, imageUrl: imgUrl });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
