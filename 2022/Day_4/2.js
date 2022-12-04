var fs = require("fs");

Number.prototype.between = function (a, b, inclusive) {
  var min = Math.min.apply(Math, [a, b]);
  var max = Math.max.apply(Math, [a, b]);
  return inclusive ? this >= min && this <= max : this > min && this < max;
};

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) {
    throw err;
  }

  let total = 0;
  let dataArr = data.split("\n");
  dataArr.forEach((rangeSet) => {
    let ranges = rangeSet.split(",");
    if (contains(ranges[0], ranges[1])) {
      total++;
    }
  });
  console.log(total);
});

function contains(val1, val2) {
  let range1 = val1.split("-").map((a) => Number(a));
  let range2 = val2.split("-").map((a) => Number(a));
  let check1 = range1[0].between(range2[0], range2[1], true);
  let check2 = range1[1].between(range2[0], range2[1], true);
  let check3 = range2[0].between(range1[0], range1[1], true);
  let check4 = range2[1].between(range1[0], range1[1], true);
  if (check1 || check2 || check3 || check4) {
    return true;
  }
  return false;
}
