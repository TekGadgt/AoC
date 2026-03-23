var fs = require('fs');
var readline = require('readline');

var filename = 'day1.txt';
var list1 = [];
var list2 = [];
var lengthList = [];
var similarityList = [];

async function processLineByLine() {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({input: fileStream, crlfDelay: Infinity});
  for await (const line of rl) {
    let tempArray = line.split("   ");
    list1.push(tempArray[0]);
    list2.push(tempArray[1]);
  }
  list1.sort((a, b) => a - b)
  list2.sort((a, b) => a - b)

  for (let i = 0; i < list1.length; i++) {
    lengthList.push(list1[i] > list2[i] ? list1[i] - list2[i] : list2[i] - list1[i]);
  }
  console.log(`Length: ${lengthList.reduce((a,b)=>a+b, 0)}`);

  for (let i = 0; i < list1.length; i++) {
    similarityList.push(list1[i] * list2.filter(item => item === list1[i]).length)
  }
  console.log(`Similarity: ${similarityList.reduce((a,b)=>a+b, 0)}`);

}

processLineByLine();