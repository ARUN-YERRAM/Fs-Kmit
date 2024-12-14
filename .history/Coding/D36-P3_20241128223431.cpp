// You are given a set of N integers, and a value to find F. Initially a variable, 
// 'total' is set to 0. You can perform either addition(+) or subtraction(-)
// of every integer from the set to the 'total'. The resultant total should be
// equal to the value F.

// Your task is to find out the number of ways, you can make the 'total' equal to
// the value F.

// Input Format:
// -------------
// Line-1: Two integers N and F.
// Line-2: N space separated integers 

// Output Format:
// --------------
// Print an integer, number of ways.


// Sample Input:
// ---------------
// 5 3
// 1 1 1 1 1

// Sample Output:
// ----------------
// 5

// Explanation:
// ------------
// total = -1+1+1+1+1 = 3 -> total=value-F
// total = +1-1+1+1+1 = 3 -> total=value-F
// total = +1+1-1+1+1 = 3 -> total=value-F
// total = +1+1+1-1+1 = 3 -> total=value-F
// total = +1+1+1+1-1 = 3 -> total=value-F

// NOTE: + means addition, - means subtraction

#include<bits/stdc++.h>
using namespace std;

int Recrse(vector<int>&vec,int tar,int idx,int sum){
    if(idx >= vec.size()){
        if(sum == tar){
            return 1;
        }return 0;
    }
    sum += vec[idx];
    int c1 = Recrse(vec,tar,idx+1,sum);
    sum -= vec[idx];
    int c2 = Recrse(vec,tar,idx+1,sum);
    
    return c1+c2;
}
int main(){
    int n,k;
    cin>>n>>k;
    
    vector<int>vec;
    for(int i=0;i<n;i++){
        int a;
        cin>>a;
        vec.push_back(a);
    }
    int tot = 0;
    for(auto it:vec)
        tot += it;
    
    int cnt = 0;
    int tar = (tot+k)/2;
    
    cout<<Recrse(vec,tar,0,0)<<endl;
    return 0;
}