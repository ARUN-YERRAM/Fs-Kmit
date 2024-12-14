// Vihan is given a number N and He wants to check whether N is a converse number
// or not. The binary form of number N is said to be converse number, if it obeys 
// the following property: "every pair of adjacent digits are different". 

// Your task is to help Vihan to find N is a converse number or not.
// If yes, print 'true', otherwise print 'false'.

// Input Format:
// -------------
// An integer N, the positive number.

// Output Format:
// --------------
// Print a boolean result.

// Sample Input-1:
// ---------------
// 85

// Sample Output-1:
// ----------------
// true

// Explanation:
// ------------
// Binary Rep of 85 is 1010101 


// Sample Input-2:
// ---------------
// 87

// Sample Output-2:
// ----------------
// false

// Explanation:
// ------------
// Binary Rep of 87 is 1010111


#include<bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cin>>n;
    
    string str="";
    while(n){
        str += to_string(n%2);
        n/= 2;
    }
    int i = 0;
    bool f = true;
    while(i < str.size()-1){
        if(str[i] == str[i+1]){
            cout<<"false"<<endl;
            f = false;
            break;
        }i++;
    }
    if(f)cout<<"true"<<endl;
    return 0;
}