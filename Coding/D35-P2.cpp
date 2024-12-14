// Given a nokia phone,with the following dialpad.
// 		1 2 3
// 		4 5 6
// 		7 8 9
// 		* 0 #
// And You are given an L band to dial the number,  
// Using the L band you can dial the number as follows, 
// You can start with any digit,
// 	if you are at digit 1, next digit you can choose {6,8}
// 	if you are at digit 2, next digit you can choose {7,9}
// 	if you are at digit 3, next digit you can choose {4,8}
// 	and so on..

// Now your task is to find how many distinct numbers of length N you can dial.

// Note: Numbers should contain only digits, no {* , #}.
// Answer is modulo 1000000007.

// Input Format:
// -----------------
// An integer N, length of numbers
 
// Output Format:
// ------------------
// Print an integer, number of distinct numbers you can dial.


// Sample Input-1:
// ---------------
// 1

// Sample Output-1:
// ----------------
// 10

// Explanation:
// -------------
// To dial a number of length 1, you can dial all digits.


// Sample Input-2:
// ---------------
// 2

// Sample Output-2:
// ----------------
// 20

// Explanation:
// ------------
// To dial a number of length 2, the possible numbers are
// {04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94}

// Sample Input-3:
// ---------------
// 5

// Sample Output-3:
// ----------------
// 240


#include <iostream>
#include <vector>
using namespace std;

const int MOD = 1000000007;

int countDistinctNumbers(int N) {
    // Transition map for each digit
    vector<vector<int>> transitions = {
        {4, 6},    // 0
        {6, 8},    // 1
        {7, 9},    // 2
        {4, 8},    // 3
        {3, 9, 0}, // 4
        {},        // 5 (not used)
        {1, 7, 0}, // 6
        {2, 6},    // 7
        {1, 3},    // 8
        {2, 4}     // 9
    };

    // DP table
    vector<vector<int>> dp(N + 1, vector<int>(10, 0));

    // Base case: numbers of length 1
    for (int digit = 0; digit <= 9; digit++) {
        dp[1][digit] = 1;
    }

    // Fill DP table for lengths 2 to N
    for (int length = 2; length <= N; length++) {
        for (int digit = 0; digit <= 9; digit++) {
            for (int prev : transitions[digit]) {
                dp[length][digit] = (dp[length][digit] + dp[length - 1][prev]) % MOD;
            }
        }
    }

    // Sum up all numbers of length N
    int result = 0;
    for (int digit = 0; digit <= 9; digit++) {
        result = (result + dp[N][digit]) % MOD;
    }

    return result;
}

int main() {
    int N;
    cin >> N;
    cout << countDistinctNumbers(N) << endl;
    return 0;
}
