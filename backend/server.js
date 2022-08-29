const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(fileUpload());

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/style.css`));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/script.js`));
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.post("/uploadimage", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No file was uploaded");
  }

  const file = req.files.imageFile;
  const fileName = req.body.imageName;

  file.mv(`${__dirname}/../frontend/public/${fileName}.jpg`, (error) => {
    if (error) {
      return res.status(500).send(error);
    }

    return res.status(200).send({
      imageName: fileName,
    });
  });
});

app.listen(9000, () => {
  console.log(`Example app listening at port http://127.0.0.1:9000`);
});
