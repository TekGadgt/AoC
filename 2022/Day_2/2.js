var fs = require("fs");

let outcomeScores = {
  X: 0,
  Y: 3,
  Z: 6,
};

let enemyChoices = {
  A: {
    X: 3,
    Y: 1,
    Z: 2,
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3,
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1,
  },
};

fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) {
    throw err;
  }
  let scores = [];
  let dataArr = data.split("\n");
  dataArr.forEach((set) => {
    let enemyChoice = set.charAt(0);
    let outcome = set.charAt(2);
    let roundTotal =
      enemyChoices[enemyChoice][outcome] + outcomeScores[outcome];
    scores.push(roundTotal);
  });
  console.log(scores.reduce((a, b) => a + b));
});
