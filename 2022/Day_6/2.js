var fs = require("fs");

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) {
    throw err;
  }

  let charArr = data.split("");
  console.log(findFirstMatch(charArr, 14).length);
});

function findFirstMatch(arr, len) {
  for (let i = 0; i < arr.length; i++) {
    testArr = arr.slice(i, i + len);
    if (new Set(testArr).size === len) {
      return arr.slice(0, i + len);
    }
  }
}
