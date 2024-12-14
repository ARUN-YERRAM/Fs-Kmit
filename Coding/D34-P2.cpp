// Mr Parandhamayya working with words.
// He is given a word W, you need to divide the word into N non-empty parts, 
// such that all the newly formed words should be distinct, and 
// if you append all those words should form original word W.

// Your task is to help Mr Parandhamayya to divide the word into N parts,
// such that, the value of N should be maximized, and print N.

// Input Format:
// -------------
// Line-1: A string W, a word.

// Output Format:
// --------------
// Print an integer result, the value of N.


// Sample Input-1:
// ---------------
// banana

// Sample Output-1:
// ----------------
// 4

// Explanation: 
// ------------
// One way to divide the word is "b","a","n","ana".
// If you divide it like "b","a","n","an","a".The word "a" will be repeated.
// So it is not allowed to divide like the second way.


// Sample Input-2:
// ---------------
// mississippi

// Sample Output-2:
// ----------------
// 7

// Explanation: 
// ------------
// One of the way to divide the word is "m","i","s","si","ssi","p","pi".

// NOTE: Subsequences are not allowed.


#include <iostream>
#include <unordered_set>
#include <string>

using namespace std;

void backtrack(const string& W, int start, unordered_set<string>& seen, int& maxCount) {
    // Base case: if we've traversed the entire string
    if (start == W.size()) {
        maxCount = max(maxCount, (int)seen.size());
        return;
    }

    string current = "";
    // Try all possible substrings starting from 'start'
    for (int i = start; i < W.size(); ++i) {
        current += W[i];
        // If the current substring is not in the set, proceed
        if (seen.find(current) == seen.end()) {
            seen.insert(current); // Add substring to the set
            backtrack(W, i + 1, seen, maxCount); // Recurse for the remaining string
            seen.erase(current); // Backtrack: remove substring from the set
        }
    }
}

int maxDistinctPartitions(const string& W) {
    unordered_set<string> seen; // To track distinct substrings
    int maxCount = 0; // To store the maximum count of distinct substrings
    backtrack(W, 0, seen, maxCount);
    return maxCount;
}

int main() {
    string W;
    cin >> W; // Input the word
    cout << maxDistinctPartitions(W) << endl; // Output the result
    return 0;
}
