
// For X-Mas, santa claus is preparing a X-Mas Tree with set of Bulbs.
// The bulbs are of different voltages, and preparation of tree as follows:
// 	- The bulbs are arranged in level-wise, levels are numbered from 0,1,2,3..
// 	  so on.
// 	- At level-1: There will be only one bulb as root bulb.,
// 	- From next level onwards, we can attach atmost two bulbs, one is to left side
// 	  and/or the other is to right side of every bulb in previous level.
	
// Entire X-Mas tree has to be prepared with certian rules as follows:
// 	- For every even level in the X-Mas Tree, all the bulbs should have
// 	  odd voltages in strictly ascending order.
// 	- For every odd level in the X-Mas Tree, all the bulbs should have
// 	  even voltages in strictly descending order.
	
// You will be given the X-Mas Tree root,
// Your task is to findout whether the X-Mas tree is prepared as per the rules
// or not.

// Implement the class Solution.
// 1.public boolean isXmasTree(Node root): returns a boolean value.

// NOTE:
//     '-1' in the input is to indicate NULL values.


// Input Format:
// -------------
// A single line of space separated integers, voltages of the set of bulbs.

// Output Format:
// --------------
// Print a boolean value.


// Sample Input-1:
// ---------------
// 3 8 4 3 5 -1 7 

// Sample Output-1:
// ----------------
// true


// Sample Input-2:
// ---------------
// 3 8 4 3 5 7 7 

// Sample Output-2:
// ----------------
// false


// Sample Input-3:
// ---------------
// 1

// Sample Output-3:
// ----------------
// true

