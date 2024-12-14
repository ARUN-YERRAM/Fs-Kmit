/*
Convert an Array of Objects to an Array of Strings Using map().

Task: You have an array of user objects, and you need to create an array of their names.

//output
['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy']

*/


const users = [
    { name: 'Alice', age: 21 },
    { name: 'Bob', age: 22 },
    { name: 'Charlie', age: 21 },
    { name: 'David', age: 22 },
    { name: 'Eve', age: 23 },
    { name: 'Frank', age: 21 },
    { name: 'Grace', age: 23 },
    { name: 'Hank', age: 24 },
    { name: 'Ivy', age: 22 }
  ];
  
  const userNames = users.map(user => user.name);
  
  // Implement your logic here and store the result as "userNames".
  console.log(userNames);
  
  