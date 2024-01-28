const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
require("dotenv").config();

app.use(
  cors({ credentials: true, origin: "https://sharing-ideas.vercel.app" })
);
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (req, res) => {
  res.json({ success: "ok" });
});

app.post("/uploadfile", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  fs.renameSync(path, `uploads/${originalname}`);
  console.log(`New video added: ${originalname}`);
  res.json({ success: "ok" });
});

app.listen(3000);
console.log(`Server is running on port 3000`);
