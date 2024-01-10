const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.post("/uploadfile", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  // const parts = originalname.split(".");
  // const ext = parts[parts.length - 1];
  // const newPath = path + "." + ext;
  fs.renameSync(path, `uploads/${originalname}`);
  console.log(`New video added: ${originalname}`);
  res.json({ success: "ok" });
});

app.listen(process.env.PORT);
console.log(`Server is running on port ${process.env.PORT}`);
