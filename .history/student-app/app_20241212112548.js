const express = require("express");
const mongoose = require("mongoose");
const app = express();

// const express  =require("express");
// const mongoose = require(/"mongoose");
// const app = express();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ARUN:1234@cluster0.mmyigrp.mongodb.net/StudentDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  mongoose.connect("",{
    useNewUrlParser:true,
    useUnifie
  }).then(() => console.log("Connected ďto MongoDb")).catch((err) => console.log("Connection error",err));
// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  scores: {
    Java: { type: Number, required: true },
    CPP: { type: Number, required: true },
    Python: { type: Number, required: true },
    GenAI: { type: Number, required: true },
    FSD: { type: Number, required: true },
  },
});

// Create Student Model
const Student = mongoose.model("Student", studentSchema);

// Middleware
app.use(express.json());

// Route to fetch student data by roll number
app.get("/student/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    const student = await Student.findOne({ rollNo }, { _id: 0 });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student data", error: err });
  }
});

// Route to insert a new student document
app.post("/student", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", newStudent });
  } catch (err) {
    res.status(400).json({ message: "Failed to add student", error: err });
  }
});

// Route to delete a student by roll number
app.delete("/student/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    const deletedStudent = await Student.findOneAndDelete({ rollNo });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully", deletedStudent });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete student", error: err });
  }
});

// Route to update a student's scores by roll number
app.put("/student/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    const updatedScores = req.body.scores;
    const updatedStudent = await Student.findOneAndUpdate(
      { rollNo },
      { $set: { scores: updatedScores } },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully", updatedStudent });
  } catch (err) {
    res.status(400).json({ message: "Failed to update student", error: err });
  }
});

// Route to fetch students with GPA
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, { name: 1, rollNo: 1, scores: 1, _id: 0 });
    const studentsWithGPA = students.map((student) => {
      const { Java, CPP, Python, GenAI, FSD } = student.scores;
      const gpa = ((Java + CPP + Python + GenAI + FSD) / 5).toFixed(2);
      return {
        name: student.name,
        rollNo: student.rollNo,
        gpa: parseFloat(gpa),
      };
    });
    res.status(200).json(studentsWithGPA);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch students", error: err });
  }
});

