var fs = require('fs');
var readline = require('readline');

var filename = 'day4-example.txt';
var wordsearcharrays = [];
var wordsearchstrings = [];
var wordsToFind = ['XMAS'];

const directions = [
  { dx: -1, dy: 0, name: 'Up' },
  { dx: 1, dy: 0, name: 'Down' },
  { dx: 0, dy: -1, name: 'Left' },
  { dx: 0, dy: 1, name: 'Right' },
  { dx: -1, dy: -1, name: 'Up-Left' },
  { dx: -1, dy: 1, name: 'Up-Right' },
  { dx: 1, dy: -1, name: 'Down-Left' },
  { dx: 1, dy: 1, name: 'Down-Right' }
];

function searchWord(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;
  const matches = [];

  function dfs(x, y, index, direction) {
    if (index === word.length) {
      matches.push({ word, start: [x - direction.dx * index, y - direction.dy * index], direction: direction.name });
      return true;
    }

    if (x < 0 || y < 0 || x >= rows || y >= cols || grid[x][y] !== word[index]) return false;

    const temp = grid[x][y];
    grid[x][y] = '#'; // Mark cell as visited

    const found = dfs(x + direction.dx, y + direction.dy, index + 1, direction);
    grid[x][y] = temp; // Unmark cell
    return found;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === word[0]) {
        for (const direction of directions) {
          dfs(i, j, 0, direction);
        }
      }
    }
  }

  return matches;
}

function findWords(grid, words) {
  const result = [];
  for (const word of words) {
    const matches = searchWord(grid, word);
    result.push(...matches);
  }
  return result;
}

function countXMASPatterns(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const patterns = ['MAS', 'SAM'];
  let count = 0;

  // Helper function to check diagonal patterns
  function isValidDiagonal(row, col, dx1, dy1, dx2, dy2) {
    const diagonal1 = [
      grid[row + dx1][col + dy1],
      grid[row][col],
      grid[row + dx2][col + dy2]
    ].join('');
    return patterns.includes(diagonal1);
  }

  // Iterate over each potential center of an "X"
  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (grid[row][col] === 'A') {
        const topLeftBottomRight = isValidDiagonal(row, col, -1, -1, 1, 1);
        const topRightBottomLeft = isValidDiagonal(row, col, -1, 1, 1, -1);
        if (topLeftBottomRight && topRightBottomLeft) {
          count++;
        }
      }
    }
  }

  return count;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({input: fileStream, crlfDelay: Infinity});

  for await (const line of rl) {
    wordsearchstrings.push(line);
    wordsearcharrays.push(line.split(''));
  }

  console.log(findWords(wordsearcharrays, wordsToFind).length);
  console.log(findWords(wordsearcharrays, wordsToFind));

  console.log(countXMASPatterns(wordsearchstrings));
}

processLineByLine();