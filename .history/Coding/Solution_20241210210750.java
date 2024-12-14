
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


import java.util.*;

/*
//Sample Binary tree Node sturcture for reference 

class Node {
    public int data;
    public Node left;
    public Node right;
    public Node(int value) {
        data = value;
        left = null;
        right = null;
    }
}
*/


import java.util.*;

class Solution {
    public boolean isXmasTree(Node root) {
        if (root == null) return true;

        Queue<Node> queue = new LinkedList<>();
        queue.add(root);
        int level = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> values = new ArrayList<>();

            for (int i = 0; i < size; i++) {
                Node current = queue.poll();
                if (current != null) {
                    values.add(current.data);
                    if (current.left != null) queue.add(current.left);
                    if (current.right != null) queue.add(current.right);
                }
            }

            // Validate the current level
            if (!isValidLevel(values, level)) {
                return false;
            }

            level++;
        }

        return true;
    }

    private boolean isValidLevel(List<Integer> values, int level) {
        if (values.isEmpty()) return true;

        if (level % 2 == 0) {
            for (int i = 0; i < values.size(); i++) {
                if (values.get(i) % 2 == 0 || (i > 0 && values.get(i) <= values.get(i - 1))) {
                    return false;
                }
            }
        } else {
            for (int i = 0; i < values.size(); i++) {
                if (values.get(i) % 2 != 0 || (i > 0 && values.get(i) >= values.get(i - 1))) {
                    return false;
                }
            }
        }
        return true;
    }

    public Node buildTree(String data) {
        if (data == null || data.isEmpty()) return null;

        String[] values = data.split(" ");
        Node root = new Node(Integer.parseInt(values[0]));
        Queue<Node> queue = new LinkedList<>();
        queue.add(root);

        int i = 1;
        while (!queue.isEmpty() && i < values.length) {
            Node current = queue.poll();

            if (!values[i].equals("-1")) {
                current.left = new Node(Integer.parseInt(values[i]));
                queue.add(current.left);
            }
            i++;

            if (i < values.length && !values[i].equals("-1")) {
                current.right = new Node(Integer.parseInt(values[i]));
                queue.add(current.right);
            }
            i++;
        }

        return root;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        Solution solution = new Solution();
        Node root = solution.buildTree(input);

        System.out.println(solution.isXmasTree(root));
    }
}
