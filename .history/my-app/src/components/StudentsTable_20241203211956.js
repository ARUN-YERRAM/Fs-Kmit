import React from "react";

function StudentsTable() {
  const students = [
    { id: 1, name: "John Doe", age: 18 },
    { id: 2, name: "Jane Smith", age: 19 },
    { id: 3, name: "Mark Johnson", age: 17 },
  ];

  return (
    <div className="container mt-4">
      <h2>Students List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsTable;
