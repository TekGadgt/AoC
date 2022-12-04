#!/usr/bin/env node

var fs = require("fs");
var file, delimiter, algorithmType, desiredSum;

if (process.argv[2] == "--help") {
  console.log(
    `please pass a file, delimiter, either duo or trio, and the desired sum`
  );
  console.log(`e.g. node solution.js input.txt \\n duo 2020`);
} else {
  file = process.argv[2];
  delimiter = process.argv[3];
  algorithmType = process.argv[4];
  desiredSum = process.argv[5];
}
if (!file) {
  return;
}

function solutionPairs(arr) {
  let solutionPairs = [];
  arr.map((itemOne) => {
    arr.map((itemTwo) => {
      if (itemOne !== itemTwo && itemOne + itemTwo == desiredSum) {
        solutionPairs.push([itemOne, itemTwo]);
      }
    });
  });

  return solutionPairs;
}

function solutionTrios(arr) {
  let solutionTrios = [];
  arr.map((itemOne) => {
    arr.map((itemTwo) => {
      arr.map((itemThree) => {
        if (
          itemOne !== itemTwo &&
          itemOne !== itemThree &&
          itemTwo !== itemThree &&
          itemOne + itemTwo + itemThree == desiredSum
        ) {
          solutionTrios.push([itemOne, itemTwo, itemThree]);
        }
      });
    });
  });

  return solutionTrios;
}

function solutionPair(arr) {
  let solutionArr = arr[0].filter((item) => typeof item === "number");
  console.log(solutionArr);
  let solution = solutionArr[0] * solutionArr[1];
  return solution;
}

function solutionTrio(arr) {
  let solutionArr = arr[0].filter((item) => typeof item === "number");
  console.log(solutionArr);
  let solution = solutionArr[0] * solutionArr[1] * solutionArr[2];
  return solution;
}

fs.readFile(file, "utf8", function (err, data) {
  if (err) throw err;
  let dataArr = data
    .split(delimiter)
    .sort((a, b) => a - b)
    .slice(1)
    .map(function (x) {
      return parseInt(x, 10);
    });
  if (algorithmType == "duo") {
    console.log(solutionPair(solutionPairs(dataArr)));
  } else if (algorithmType == "trio") {
    console.log(solutionTrio(solutionTrios(dataArr)));
  } else {
    console.log(`invalid option, please use duo or trio`);
  }
});
