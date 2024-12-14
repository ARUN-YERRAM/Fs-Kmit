// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// // Connect to MongoDB
// mongoose
//   .connect("mongodb+srv://ARUN:1234@cluster0.mmyigrp.mongodb.net/StudentDB?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Define Student Schema
// const studentSchema = new mongoose.Schema({
//   name: String,
//   rollNo: String,
//   scores: {
//     Java: Number,
//     CPP: Number,
//     Python: Number,
//     GenAI: Number,
//     FSD: Number,
//   },
// });

// // Create Student Model
// const Student = mongoose.model("Student", studentSchema);

// // Middleware
// app.use(express.json());

// // Route to fetch student data by roll number
// app.get("/student/:rollNo", async (req, res) => {
//   const rollNo = req.params.rollNo;
//   try {
//     const student = await Student.findOne({ rollNo }, { _id: 0 });
//     if (student) {
//       res.status(200).json(student);
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching student data", error: err });
//   }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://ARUN:1234@cluster0.mmyigrp.mongodb.net/StudentDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

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

// Insert Data
const insertData = async () => {
  const students = [
    {
      name: "Ramesh Reddy",
      rollNo: "201",
      scores: { Java: 85, CPP: 88, Python: 92, GenAI: 91, FSD: 87 },
    },
    {
      name: "Sravani Rao",
      rollNo: "202",
      scores: { Java: 78, CPP: 82, Python: 79, GenAI: 86, FSD: 80 },
    },
    {
      name: "Venkatesh Goud",
      rollNo: "203",
      scores: { Java: 90, CPP: 89, Python: 94, GenAI: 92, FSD: 88 },
    },
    {
      name: "Padmavathi",
      rollNo: "204",
      scores: { Java: 82, CPP: 84, Python: 83, GenAI: 90, FSD: 85 },
    },
    {
      name: "Harish Kumar",
      rollNo: "205",
      scores: { Java: 88, CPP: 86, Python: 87, GenAI: 89, FSD: 92 },
    },
  ];

  try {
    await Student.insertMany(students);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
};

insertData();
