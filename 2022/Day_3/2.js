var fs = require("fs");

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) {
    throw err;
  }
  let scores = [];
  let dataArr = data
    .split("\n")
    .reduce(
      (r, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r,
      []
    );
  dataArr.forEach((set) => {
    let match = set[0]
      .split("")
      .filter((el) => set[1].split("").includes(el))
      .filter((el) => set[2].split("").includes(el))[0];
    scores.push(getCharValue(match));
  });
  console.log(scores.reduce((a, b) => a + b));
});

function getCharValue(char) {
  let caps = new RegExp("[A-Z]");
  let lower = new RegExp("[a-z]");
  let value;
  if (char.match(caps)) {
    value = char.charCodeAt(0) - 38;
  } else if (char.match(lower)) {
    value = char.charCodeAt(0) - 96;
  }
  return value;
}
