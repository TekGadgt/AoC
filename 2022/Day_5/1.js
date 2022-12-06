var fs = require("fs");
const readline = require("readline");

const map = {
  1: ["V", "C", "D", "R", "Z", "G", "B", "W"],
  2: ["G", "W", "F", "C", "B", "S", "T", "V"],
  3: ["C", "B", "S", "N", "W"],
  4: ["Q", "G", "M", "N", "J", "V", "C", "P"],
  5: ["T", "S", "L", "F", "D", "H", "B"],
  6: ["J", "V", "T", "W", "M", "N"],
  7: ["P", "F", "L", "C", "S", "T", "G"],
  8: ["B", "D", "Z"],
  9: ["M", "N", "Z", "W"],
};

async function processPerLine() {
  const fileStream = fs.createReadStream("input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    let splitLine = line.split(" ");
    let numToMove = splitLine.slice(1, 2).map((a) => Number(a))[0];
    let fromCol = splitLine.slice(3, 4).map((a) => Number(a))[0];
    let toCol = splitLine.slice(5, 6).map((a) => Number(a))[0];
    for (let i = 0; i < numToMove; i++) {
      let item = map[fromCol].pop();
      map[toCol].push(item);
    }
  }
  console.log(map);
}

processPerLine();
