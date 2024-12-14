const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://ARUN:1234@cluster0.mmyigrp.mongodb.net/StudentDB?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  scores: {
    Java: Number,
    CPP: Number,
    Python: Number,
    GenAI: Number,
    FSD: Number,
  },
});

// Create Student Model
const Student = mongoose.model("Student", studentSchema);

// Middleware
app.use(express.json());

// Route to fetch student data by roll number
app.get("/student/:rollNo", async (req, res) => {
  const rollNo = req.params.rollNo;
  try {
    const student = await Student.findOne({ rollNo }, { _id: 0 });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching student data", error: err });
  }
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


