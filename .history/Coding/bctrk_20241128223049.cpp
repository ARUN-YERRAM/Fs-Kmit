
// Mr Ajay Sharma is working woth words.
// He found that few words in the langugage have same meaning.
// Such words are given as a list of pairs as mappedpairs[],
// where mappedpairs[i] = [word1, word2] indicates that word1 and word2 are 
// the words with same meaning.

// He is given phrase, and he wants to apply all the mappedpairs[] on the phrase.

// Your task is to help Mr.Ajay Sharma to find and return all possible 
// Mapped Phrases generated after applying all the mapped words,
// and print them in lexicographical order.


// Input Format:
// -------------
// Line-1: An integer N, number of mapped pairs.
// Next N lines: Two space separated words, mappedpair[].
// Last Line: A line of words, the phrase.

// Output Format:
// --------------
// Print the list of mapped phrases in sorted order.


// Sample Input-1:
// ---------------
// 3
// hi hello
// sweet sugar
// candy chocolate
// hi sam! ram has a sugar candy

// Sample Output-1:
// ----------------
// [hello sam! he has sugar candy, hello sam! he has sugar chocolate, 
// hello sam! he has sweet candy, hello sam! he has sweet chocolate, 
// hi sam! he has sugar candy, hi sam! he has sugar chocolate, 
// hi sam! he has sweet candy, hi sam! he has sweet chocolate]



// Sample Input-2:
// ---------------
// 2
// hi hey
// hey hello
// hi how are you

// Sample Output-2:
// ----------------
// [hello how are you, hey how are you, hi how are you]



#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <set>
#include <sstream>
#include <algorithm>

using namespace std;

// Function to find all synonyms for a given word using DFS
void dfs(const string& word, unordered_map<string, unordered_set<string>>& graph, 
         unordered_set<string>& visited, unordered_set<string>& synonyms) {
    if (visited.count(word)) return;
    visited.insert(word);
    synonyms.insert(word);
    for (const string& neighbor : graph[word]) {
        dfs(neighbor, graph, visited, synonyms);
    }
}

// Function to generate all possible phrases
void generatePhrases(int idx, vector<vector<string>>& options, vector<string>& current, 
                     vector<string>& result) {
    if (idx == options.size()) {
        string phrase = "";
        for (const string& word : current) {
            phrase += word + " ";
        }
        phrase.pop_back(); // Remove trailing space
        result.push_back(phrase);
        return;
    }
    for (const string& word : options[idx]) {
        current[idx] = word;
        generatePhrases(idx + 1, options, current, result);
    }
}

int main() {
    // Input number of mapped pairs
    int n;
    cin >> n;
    cin.ignore(); // To consume the newline character
    
    unordered_map<string, unordered_set<string>> graph;
    
    // Input the mapped pairs
    for (int i = 0; i < n; ++i) {
        string word1, word2;
        cin >> word1 >> word2;
        graph[word1].insert(word2);
        graph[word2].insert(word1);
    }
    cin.ignore(); // Consume the newline character
    
    // Input the phrase
    string phrase;
    getline(cin, phrase);
    
    // Split the phrase into words
    istringstream ss(phrase);
    vector<string> words;
    string word;
    while (ss >> word) {
        words.push_back(word);
    }
    
    // Find all synonym groups
    unordered_map<string, unordered_set<string>> synonymGroups;
    unordered_set<string> visited;
    for (const auto& pair : graph) {
        if (!visited.count(pair.first)) {
            unordered_set<string> synonyms;
            dfs(pair.first, graph, visited, synonyms);
            for (const string& synonym : synonyms) {
                synonymGroups[synonym] = synonyms;
            }
        }
    }
    
    // Build options for each word in the phrase
    vector<vector<string>> options;
    for (const string& w : words) {
        if (synonymGroups.count(w)) {
            vector<string> synonyms(synonymGroups[w].begin(), synonymGroups[w].end());
            sort(synonyms.begin(), synonyms.end());
            options.push_back(synonyms);
        } else {
            options.push_back({w});
        }
    }
    
    // Generate all possible phrases
    vector<string> result;
    vector<string> current(words.size());
    generatePhrases(0, options, current, result);
    
    // Sort the result lexicographically
    sort(result.begin(), result.end());
    
    // Print the result
    cout << "[";
    for (size_t i = 0; i < result.size(); ++i) {
        cout << result[i];
        if (i != result.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    return 0;
}
