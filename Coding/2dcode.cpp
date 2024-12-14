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

#include<bits/stdc++.h>
using namespace std;

bool Recrse(vector<vector<char>>&vec,string str,int i,int j,int r,int c,int idx,vector<vector<int>>&vis){
    if(idx == str.size())return true;
    if(i < 0 || j < 0 || i>=r || j>= c || vis[i][j] == 1 || vec[i][j] != str[idx]){
        return false;
    }
    
    vis[i][j] = 1;
    
        bool found =  (Recrse(vec,str,i+1,j,r,c,idx+1,vis) || Recrse(vec,str,i,j+1,r,c,idx+1,vis) || Recrse(vec,str,i-1,j,r,c,idx+1,vis) || 
        Recrse(vec,str,i,j-1,r,c,idx+1,vis));
    
    vis[i][j] = 0;
    return found;
}
int main(){
    int r,c;
    cin>>r>>c;
    
    vector<vector<char>>vec(r,vector<char>(c));
    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++){
            char c;
            cin>>c;
            vec[i][j] = c;
        }
    }
    string str;
    cin>>str;
    if(str.size() == 0){
        cout<<"true"<<endl;
        return 0;
    }
    bool f = false;
    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++){
            if(vec[i][j] == str[0]){
                vector<vector<int>>vis(r,vector<int>(c,0));
                if(Recrse(vec,str,i,j,r,c,0,vis)){
                    cout<<"true"<<endl;
                    return 0;
                }
            }
        }
    }
    cout<<"false"<<endl;
    return 0;
}