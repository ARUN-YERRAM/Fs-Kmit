
// Ms Manasa is working on numbers; she is fascinated by number factors.
// She is given a number N, she wants to find out all possible ways of 
// obtaining N as multiple of its factors.
// For example given N =12
// can be written as multiple of 2,3 and 4.
// and the ways to obtains 12 from ots factors are: 2*2*3, 2*6, 3*4

// Your task is to help Ms Manasa to find the all possible ways of obtaining N 
// from its factors and return all the possible ways as shown in the samples.

// Input Format:
// -------------
// An integer N, value of N.

// Output Format:
// --------------
// Print the list of possiblilties.

// Sample Input-1:
// ---------------
// 12

// Sample Output-1:
// ----------------
// [[2, 2, 3], [2, 6], [3, 4]]


// Sample Input-2:
// ---------------
// 16


// Sample Output-2:
// ----------------
// [[2, 2, 2, 2], [2, 2, 4], [2, 8], [4, 4]]


// Sample Input-3:
// ---------------
// 32

// Sample Output-3:
// ----------------
// [[2, 2, 2, 2, 2], [2, 2, 2, 4], [2, 2, 8], [2, 4, 4], [2, 16], [4, 8]]

// Ms Manasa is working on numbers; she is fascinated by number factors.
// She is given a number N, she wants to find out all possible ways of 
// obtaining N as multiple of its factors.
// For example given N =12
// can be written as multiple of 2,3 and 4.
// and the ways to obtains 12 from ots factors are: 2*2*3, 2*6, 3*4

// Your task is to help Ms Manasa to find the all possible ways of obtaining N 
// from its factors and return all the possible ways as shown in the samples.

// Input Format:
// -------------
// An integer N, value of N.

// Output Format:
// --------------
// Print the list of possiblilties.

// Sample Input-1:
// ---------------
// 12

// Sample Output-1:
// ----------------
// [[2, 2, 3], [2, 6], [3, 4]]


// Sample Input-2:
// ---------------
// 16


// Sample Output-2:
// ----------------
// [[2, 2, 2, 2], [2, 2, 4], [2, 8], [4, 4]]


// Sample Input-3:
// ---------------
// 32

// Sample Output-3:
// ----------------
// [[2, 2, 2, 2, 2], [2, 2, 2, 4], [2, 2, 8], [2, 4, 4], [2, 16], [4, 8]]


#include <bits/stdc++.h>
using namespace std;

void findFactorCombinations(int n, int start, vector<int>& path, vector<vector<int>>& result) {
    // Base case: If n becomes 1, and path has more than one element, add the path to the result
    if (n == 1 && path.size() > 1) {
        result.push_back(path);
        return;
    }

    // Try all factors from `start` to `n`
    for (int i = start; i <= n; ++i) {
        // If i is a divisor of n
        if (n % i == 0) {
            path.push_back(i);  // Add current factor to the path
            findFactorCombinations(n / i, i, path, result);  // Recurse with reduced n
            path.pop_back();  // Backtrack
        }
    }
}

int main() {
    int n;
    cin >> n;

    vector<vector<int>> result;
    vector<int> path;

    findFactorCombinations(n, 2, path, result);

    // Print the result
    for (auto j=0;j<result.size();j++) {
        cout << "[";
        for (size_t i = 0; i < result[j].size(); ++i) {
            cout << result[j][i];
            if (i != result[j].size() - 1) cout << ", ";
        }
        cout << "]";
        if(j != result.size()-1)
            cout<<",";
    }
    return 0;
}
