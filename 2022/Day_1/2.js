var fs = require("fs");

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) {
    throw err;
  }
  let dataArr = data.split("\n\n");
  let resultsArray = [];
  dataArr.forEach((set) => {
    let value = set
      .split("\n")
      .map((x) => parseInt(x))
      .reduce((a, b) => a + b);
    resultsArray.push(value);
  });
  console.log(
    resultsArray
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a + b)
  );
});
