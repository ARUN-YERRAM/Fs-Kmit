// The Pandavas and Kauravas each rule different kingdoms separated by a river. 
// If the two kingdoms are connected, the land will form a square-shaped area. 
// The kingdoms are represented by cells marked with 1, and the river is 
// represented by cells marked with 0.

// The Pandavas and Kauravas have decided to build a bridge over the river to 
// improve connectivity between their kingdoms. To minimize the cost of construction, 
// they aim to reduce the length of the bridge. The bridge can only be built on 
// river cells that are connected in the four cardinal directions (up, down, left, 
// and right).

// Your task is to help the rulers minimize the number of river cells used for 
// building the bridge, and return the count of river cells occupied.

// Input Format:
// -------------
// Line-1: An integer N, size of the land.
// Next N lines: N space separated integers, either 0 or 1. 

// Output Format:
// --------------
// Print an integer result.


// Sample Input-1:
// ---------------
// 4
// 1 1 1 0
// 1 0 0 0
// 1 0 0 1
// 0 0 1 1

// Sample Output-1:
// ----------------
// 2


// Sample Input-2:
// ---------------
// 5
// 1 1 0 0 0
// 1 1 0 0 0
// 0 0 0 0 1
// 0 0 0 1 1
// 0 0 1 1 1

// Sample Output-2:
// ----------------
// 3


#include <iostream>
#include <vector>
#include <queue>
#include <utility>

using namespace std;

// Directions for BFS (up, down, left, right)
const int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

// Helper function to perform DFS and find the first kingdom
void dfs(int x, int y, vector<vector<int>>& grid, queue<pair<int, int>>& boundary, vector<vector<bool>>& visited) {
    int n = grid.size();
    visited[x][y] = true;

    for (auto& dir : directions) {
        int nx = x + dir[0];
        int ny = y + dir[1];

        // Check bounds
        if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
            if (grid[nx][ny] == 1 && !visited[nx][ny]) {
                dfs(nx, ny, grid, boundary, visited);
            } else if (grid[nx][ny] == 0) {
                // If it's water, add it to the boundary queue
                boundary.push({x, y});
            }
        }
    }
}

// Function to find the shortest bridge
int findShortestBridge(vector<vector<int>>& grid) {
    int n = grid.size();
    vector<vector<bool>> visited(n, vector<bool>(n, false));
    queue<pair<int, int>> boundary;

    // Step 1: Find the first kingdom and its boundary using DFS
    bool found = false;
    for (int i = 0; i < n && !found; i++) {
        for (int j = 0; j < n && !found; j++) {
            if (grid[i][j] == 1) {
                dfs(i, j, grid, boundary, visited);
                found = true;
            }
        }
    }

    // Step 2: Use BFS to find the shortest bridge
    int bridgeLength = 0;
    while (!boundary.empty()) {
        int size = boundary.size();
        for (int i = 0; i < size; i++) {
            pair<int, int> current = boundary.front();
            boundary.pop();
            int x = current.first, y = current.second;

            for (auto& dir : directions) {
                int nx = x + dir[0];
                int ny = y + dir[1];

                if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
                    if (grid[nx][ny] == 1 && !visited[nx][ny]) {
                        // If we reach the second kingdom
                        return bridgeLength;
                    }
                    if (grid[nx][ny] == 0 && !visited[nx][ny]) {
                        boundary.push({nx, ny});
                        visited[nx][ny] = true;
                    }
                }
            }
        }
        bridgeLength++;
    }

    return -1; // If no bridge can be built (should not happen for valid input)
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> grid(n, vector<int>(n));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> grid[i][j];
        }
    }

    cout << findShortestBridge(grid) << endl;
    return 0;
}


