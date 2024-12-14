
const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

// Define CORS options
const corsOptions = {
    origin: '*', // Use the ngrok React App URL when in production
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Students Data
const students = [
    { name: "Ramesh Reddy", rollNo: "201", scores: { Java: 85, CPP: 88, Python: 92, GenAI: 91, FSD: 87 } },
    { name: "Sravani Rao", rollNo: "202", scores: { Java: 78, CPP: 82, Python: 79, GenAI: 86, FSD: 80 } },
    { name: "Venkatesh Goud", rollNo: "203", scores: { Java: 90, CPP: 89, Python: 94, GenAI: 92, FSD: 88 } },
    { name: "Padmavathi", rollNo: "204", scores: { Java: 82, CPP: 84, Python: 83, GenAI: 90, FSD: 85 } },
    { name: "Harish Kumar", rollNo: "205", scores: { Java: 88, CPP: 86, Python: 87, GenAI: 89, FSD: 92 } },
];

// GET route to fetch student data
app.get('/students', (req, res) => {
    res.json(students);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
