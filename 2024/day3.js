var fs = require('fs');
var readline = require('readline');

var filename = 'day3.txt';
var lines = [];
const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
const contextRegex = /(do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))/g;

function mul(x,y) {
  return x * y;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({input: fileStream, crlfDelay: Infinity});

  for await (const line of rl) {
    lines.push(line);
  }
  let single_line = lines.join('');
  console.log(`Part 1: ${single_line.match(mulRegex).reduce((total, item) => total + eval(item), 0)}`);

  const sections = single_line.split(contextRegex);
  let isValidSection = true;
  let validMatches = [];

  sections.forEach((match) => {
    if (match === "do()") {
      isValidSection = true;
    } else if (match === "don't()") {
      isValidSection = false;
    } else if (isValidSection && /^mul\(\d{1,3},\d{1,3}\)$/.test(match)) {
      validMatches.push(match);
    }
  });

  console.log(validMatches);
  console.log(`Part 2: ${validMatches.reduce((total, item) => total + eval(item), 0)}`);
}

processLineByLine();