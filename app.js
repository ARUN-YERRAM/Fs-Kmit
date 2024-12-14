const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://jayanth:mongoDBps@cluster0.idqmlue.mongodb.net/studentsDB?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
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
    res
      .status(500)
      .json({ message: "Error fetching student data", error: err });
  }
});

// Route to insert the student document
app.post("/student", async (req, res)=>{
    const data = req.body;
    try {
        const student = await Student.create(data);
        res.status(201).json({ message: "Student added successfully", student });           
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to add student", error: err });
    }
});

// Route to delete student data
app.delete("/student/:rollNo", async(req,res)=>{
    const rollNo = req.params.rollNo;
    try{
        const deletedStudent = await Student.findOneAndDelete({rollNo});
        if(deletedStudent){
            res.status(200).json({ message: "Student deleted successfully", deletedStudent });
        }else{
            res.status(404).json({ message: "Student not found" });
        }
    } catch(err){
        console.log(err);
        res.status(400).json({ message: "Failed to delete student", error: err });
    }
}); 

// Route to update the scores of the student
app.put("/student/:rollNo",async (req,res)=>{
    const rollNo = req.params.rollNo;
    const scores = req.body;
    try {
        const updatedStudent = await Student.findOneAndUpdate({rollNo},{$set:scores},{new:true});
        if(updatedStudent){
            res.status(200).json({ message: "Student updated successfully", updatedStudent });
        }else{
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(400).json({ message: "Failed to update student", error: err });
    }
});

// Route to get the gpa of the student
app.get("/students", async (req, res) => {
    try {
        const studentsWithGPA = [];
        const students = await Student.find({}); // Await the query to resolve

        students.forEach(student => {
            const scores = Object.values(student.scores); // Extract score values
            const sum = scores.reduce((acc, curr) => acc + curr, 0); // Calculate the sum
            const gpa = sum / scores.length; // Calculate GPA

            studentsWithGPA.push({
                name: student.name,
                rollNo: student.rollNo,
                gpa: gpa.toFixed(2), // Format GPA to 2 decimal places
            });
        });

        res.status(200).json(studentsWithGPA); // Send a 200 response
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Failed to fetch students", error: err });
    }
});


// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
