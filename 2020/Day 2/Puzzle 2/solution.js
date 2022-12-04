#!/usr/bin/env node

var fs = require("fs");
var file = "input.txt";

fs.readFile(file, "utf8", function (err, data) {
  if (err) {
    throw err;
  }
  let dataArr = data.split("\n").filter(function (el) {
    return el !== "";
  });
  let subDataArr = [];
  let finalArr = [];
  for (let i = 0; i < dataArr.length; i++) {
    subDataArr.push(dataArr[i].split(":"));
  }
  for (let j = 0; j < subDataArr.length; j++) {
    let holdingArr = [];
    holdingArr.push(subDataArr[j][0].split(" "));
    holdingArr.push(subDataArr[j][1].trim());
    finalArr.push(holdingArr);
  }
  let countArr = [];
  for (let k = 0; k < finalArr.length; k++) {
    let range = finalArr[k][0][0].split("-");
    let first = false;
    let second = false;
    if (
      finalArr[k][1].indexOf(finalArr[k][0][1], range[0] - 1) ===
      range[0] - 1
    ) {
      first = true;
    }
    if (
      finalArr[k][1].indexOf(finalArr[k][0][1], range[1] - 1) ===
      range[1] - 1
    ) {
      second = true;
    }
    if (
      (first === true && second === true) ||
      (first === false && second === false)
    ) {
      continue;
    }
    countArr.push(finalArr[k]);
  }
  console.log(finalArr.length);
  console.dir(countArr.length, { maxArrayLength: null });
});
