const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    cb(null, "pdfs");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


const userRouter = require("./routes/userRoutes");
app.use("/api/user", userRouter);

const jobRouter = require("./routes/jobRoutes");
app.use("/api/job", jobRouter);

const applyRouter = require("./routes/applyRoutes");
app.use("/api/apply", applyRouter);


const mediaRouter = require("./routes/medias.js");
app.use("/media",mediaRouter);

const feedbackRouter = require("./routes/feedbackRoutes");
app.use("/api/feedbacks", feedbackRouter);

const PaymentRouter = require("./routes/paymentRoutes.js");
app.use("/api/payments", PaymentRouter);
const reservationRouter = require("./routes/Reservations");
app.use("/api/reservation", reservationRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const resultRouter = require("./routes/results");
// Mount the results router under the "/results" path
app.use("/results", resultRouter);

const questionRouter = require("./routes/questions");
app.use("/questions", questionRouter);

/////////////////////////imageRoutes////////////////////////
const imageSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
});
const ImageModel = mongoose.model('Image', imageSchema);


app.get('/images', async (req, res) => {
  try {
    const data = await ImageModel.find({});
    res.json({ message: 'All Images', data: data.reverse() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/images/upload', async (req, res) => {
  const { image, title, description } = req.body;

  try {
    const newImage = new ImageModel({ image, title, description });
    await newImage.save();
    res.status(201).json({
      message: 'Image Uploaded Successfully',
      success: true,
      data: newImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/images/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await ImageModel.findByIdAndDelete(id);
    res.json({ message: 'Image Deleted Successfully', success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/images/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedImage = await ImageModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (updatedImage) {
      res.json({ message: 'Image Updated Successfully', success: true });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const postRouter = require("./routes/posts");
app.use("", postRouter);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
