import React from 'react';

// Sample student data
const students = [
  {
    name: 'John Doe',
    rollNumber: '123',
    java: 'A',
    cpp: 'B',
    python: 'A',
    genAI: 'A',
    fsd: 'B',
  },
  {
    name: 'Jane Smith',
    rollNumber: '124',
    java: 'B',
    cpp: 'A',
    python: 'A',
    genAI: 'B',
    fsd: 'A',
  },
  {
    name: 'Alex Brown',
    rollNumber: '125',
    java: 'C',
    cpp: 'B',
    python: 'B',
    genAI: 'A',
    fsd: 'C',
  },
  // Add more students as needed
];

const StudentsTable = () => {
  return (
    <div>
      <h3>Students List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Java</th>
            <th>CPP</th>
            <th>Python</th>
            <th>GenAI</th>
            <th>FSD</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.java}</td>
              <td>{student.cpp}</td>
              <td>{student.python}</td>
              <td>{student.genAI}</td>
              <td>{student.fsd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
