const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  const username = req.body.username;
  const imageUrl = req.file.filename;

  // You may want to store the username and image URL in a database here

  res.json({
    username: username,
    imageUrl: imageUrl
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
