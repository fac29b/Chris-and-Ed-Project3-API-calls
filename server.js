require("dotenv").config();
const { visionRequest } = require("./openai-vision");
const { speech } = require("./openai-texttospeach");


const express = require("express");

const app = express();

app.use(express.static("public"));

app.post("/submitUrl", express.json(), async (req, res) => {
  try {
    console.log(req.body.imgUrlInput);

    const visionResult = await visionRequest(req.body.imgUrlInput);
    // console.log(visionResult.message.content);
    const speechfile = await speech(visionResult.message.content);
    console.log("within server:", speechfile);

    res.json({speechfile:speechfile});
  } catch(error) {
    console.error("error found:", error);
  };
});






const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});