require("dotenv").config();
const { visionRequest } = require("./openai-vision");
const { speech } = require("./openai-texttospeach");
const { fetchImgSearch } = require("./googleimg");
const { scrapeImages } = require("./htmlparser");
const { FetchRandomPhotoForBg } = require("./randombgimg");
const { deleteFilesInFolder } = require("./deletemp3");

const express = require("express");

const app = express();

const port = 3000;

app.use(express.static("public"));

app.post("/submitUrl", express.json(), async (req, res) => {
  try {
    const visionResult = await visionRequest(req.body.imgUrlInput);
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
    const imgResultsArray = await fetchImgSearch(req.body.searchInput);
    res.json({ imgResultsArray: imgResultsArray });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/submitUrltoscrape", express.json(), async (req, res) => {
  try {
    const scrapedImgUrlArray = await scrapeImages(req.body.imgUrlInput);
    res.json({ scrapedImgUrlArray: scrapedImgUrlArray });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/retrieveBgImage", express.json(), async (req, res) => {
  try {
    const imgUrl = await FetchRandomPhotoForBg();
    //when page is loaded delete mp3 cache
    deleteFilesInFolder(`./public/audio`);
    res.json({ success: true, imageUrl: imgUrl });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/getImageDescription", express.json(), async (req, res) => {
  try {
    const visionResult = await visionRequest(req.body.imageUrl);

    res.json({
      description: visionResult.message.content,
      descriptionId: req.body.descripId,
    });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/getImgDescriptionAndAudio", express.json(), async (req, res) => {
  try {
    const visionResult = await visionRequest(req.body.imageUrl);

    const speechData = await speech(visionResult.message.content);

    res.json({
      description: visionResult.message.content,
      descriptionId: req.body.descripId,
      speechData: speechData,
    });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.post("/getImageAudio", express.json(), async (req, res) => {
  try {
    const speechData = await speech(req.body.description);

    res.json({
      descriptionId: req.body.descriptionId,
      speechData: speechData,
    });
  } catch (error) {
    console.error("error found:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
