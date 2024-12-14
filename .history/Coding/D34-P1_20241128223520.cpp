// Given an 2D character array, Letters[][], of size r*c.
// You have to construct the word W, using the given array.

// Rules to construct the word are as follows:
// 	- All the letters of the word W, should be adjacent to each other 
// 	in the array Letters(either horizontal or vertical).
// 	- You can use each charcater in Letters[][] only once.

// If you are able to construct the word W, return 'true'
// Otherwise 'false'.

// Input Format:
// -------------
// Line-1 -> two integers R and C, array size.
// R lines -> C space separated characters.
// Last line -> a string, word W

// Output Format:
// --------------
// print the boolean result.


// Sample Input-1:
// ---------------
// 3 3
// a b c
// d e f
// g h i
// bad

// Sample Output-1:
// ----------------
// true


// Sample Input-2:
// ---------------
// 3 3
// a b c
// d e f
// g h i
// ace

// Sample Output-2:
// ----------------
// false


// Sample Input-3:
// ---------------
// 3 3
// a b c
// d e f
// g h i
// add

// Sample Output-3:
// ----------------
// false


