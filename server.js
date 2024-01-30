require("dotenv").config();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { visionRequest } = require("./openai-vision");
const { speech } = require("./openai-texttospeach");
const { fetchImgSearch } = require("./googleimg");
const { scrapeImages } = require("./htmlparser");
const { FetchRandomPhotoForBg } = require("./randombgimg");
const { deleteFilesInFolder } = require("./deletemp3");
const { askAboutImages  } = require("./imgupload");



const express = require("express");

const app = express();

const port = 3000;

app.use(express.static("public"));
// Parse JSON requests
app.use(express.json({ limit: '10mb' }));

//init multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where you want to store the uploaded files
    const uploadDir = 'public/uploads';
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use the original file name as the destination file name
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


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

// Handle file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   // Process the file as needed (e.g., save it to disk, database, etc.)
//   // For now, just send back a response with the file information.
//   res.json({
//     filename: file.originalname,
//     size: file.size,
//     mimetype: file.mimetype,
//     path: path.join(__dirname, file.path),
//   });
// });

// Handle image upload
app.post('/upload', async (req, res) => {
  const { imageData } = req.body;

  // Add logic to save the image to the 'uploads' folder
  // For simplicity, we'll assume 'imageData' contains the base64-encoded image data
  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  const imagePath = path.join(__dirname, 'uploads', 'uploaded_image.png');

  fs.writeFileSync(imagePath, buffer);



  
  res.json({ message: 'Image uploaded successfully!' });



});

//       fs.writeFile(path.join(__dirname, "uploads", req.body.file), data, (err) => {
//         if (err) {
//           console.error(err);
//           res.statusCode = 500;
//           res.end('Internal Server Error');
//         } else {
//           res.statusCode = 200;
//           res.end('File uploaded successfully');
//         }
//       });


//   try {
//   const uploadandget = await askAboutImages([`./public/uploads/${req.body.file}`], 'What is in this image?');
  
//   res.json({
//     uploadandget
//   })
//   // Process the file as needed (e.g., save it to disk, database, etc.)
//   // For now, just send back a response with the file information.
// } catch (error) {
//   console.error("error found:", error);
// }



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
