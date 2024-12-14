// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StudentsTable = () => {
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         // Fetch student data from the server
//         axios.get('http://localhost:4000/students')
//             .then(response => {
//                 setStudents(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching students:', error);
//             });
//     }, []);

//     return (
//         <div>
//             <h3>Students List</h3>
//             <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Roll Number</th>
//                         <th>Java</th>
//                         <th>CPP</th>
//                         <th>Python</th>
//                         <th>GenAI</th>
//                         <th>FSD</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student, index) => (
//                         <tr key={index}>
//                             <td>{student.name}</td>
//                             <td>{student.rollNo}</td>
//                             <td>{student.scores.Java}</td>
//                             <td>{student.scores.CPP}</td>
//                             <td>{student.scores.Python}</td>
//                             <td>{student.scores.GenAI}</td>
//                             <td>{student.scores.FSD}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StudentsTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch student data from the server
        axios.get('http://localhost:4000/students') // Replace with ngrok URL when deployed
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h3>Students List</h3>
            <table
                border="1"
                style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}
            >
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
                            <td>{student.rollNo}</td>
                            <td>{student.scores.Java}</td>
                            <td>{student.scores.CPP}</td>
                            <td>{student.scores.Python}</td>
                            <td>{student.scores.GenAI}</td>
                            <td>{student.scores.FSD}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;
