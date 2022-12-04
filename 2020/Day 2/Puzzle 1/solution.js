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
    let re = new RegExp(finalArr[k][0][1], "g");
    let range = finalArr[k][0][0].split("-");
    if (
      (finalArr[k][1].match(re) || []).length >= range[0] &&
      (finalArr[k][1].match(re) || []).length <= range[1]
    ) {
      countArr.push(finalArr[k]);
    }
  }
  console.log(dataArr.length);
  console.dir(countArr.length, { maxArrayLength: null });
});
