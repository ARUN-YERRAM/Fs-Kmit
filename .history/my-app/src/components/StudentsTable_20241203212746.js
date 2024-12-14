import React from "react";

function StudentsTable({ students }) {
  return (
    <div>
      <h2>View Students</h2>
      {students.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students to display.</p>
      )}
    </div>
  );
}

export default StudentsTable;
