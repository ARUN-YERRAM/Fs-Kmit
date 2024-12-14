// There are some cubes, and each cube has an alphabet (from A to Z) 
// printed on it. You can construct different, non-empty words using these 
// cubes and each of the word length should be 0 < length <= number of cubes.

// You are given a string of alphabets S, 
// Your task is to findout number of possible non-empty distinct words

// Input Format:
// -------------
// A string S, consist of A-Z letters only.

// Output Format:
// --------------
// Print an integer, number of possible non-empty distinct words.


// Sample Input-1:
// ---------------
// EGG

// Sample Output-1:
// ----------------
// 8

// Explanation:
// --------------
// The possible distinct words are "E", "G", "EG", "GG", "GE", "EGG", "GEG", "GGE".


// Sample Input-2:
// ---------------
// MADAM

// Sample Output-2:
// ----------------
// 89

#include <iostream>
#include <unordered_map>
#include <set>
using namespace std;

// Backtracking function to calculate distinct permutations
void backtrack(string &current, unordered_map<char, int> &freq, set<string> &distinct_perms, int k) {
    if (current.size() == k) {
        distinct_perms.insert(current);
        return;
    }
    for (auto &entry : freq) {
        if (entry.second > 0) {
            entry.second--;
            current.push_back(entry.first);
            backtrack(current, freq, distinct_perms, k);
            current.pop_back();
            entry.second++;
        }
    }
}

int countDistinctWords(string &s) {
    unordered_map<char, int> freq;
    // Count character frequencies
    for (char c : s) freq[c]++;
    
    set<string> distinct_perms;
    int total_words = 0;
    string current = "";
    
    // Generate permutations of all lengths
    for (int k = 1; k <= s.size(); k++) {
        distinct_perms.clear(); // Reset for each length
        backtrack(current, freq, distinct_perms, k);
        total_words += distinct_perms.size();
    }
    
    return total_words;
}

int main() {
    string s;
    cin >> s;
    cout << countDistinctWords(s) << endl;
    return 0;
}
