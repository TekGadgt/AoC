var fs = require("fs");

let options = {
	X: {
		score: 1,
		losesTo: "B",
		tiesWith: "A",
	},
	Y: {
		score: 2,
		losesTo: "C",
		tiesWith: "B",
	},
	Z: {
		score: 3,
		losesTo: "A",
		tiesWith: "C",
	},
};

fs.readFile("input.txt", "utf-8", function (err, data) {
	if (err) {
		throw err;
	}
	let scores = [];
	let dataArr = data.split("\n");
	dataArr.forEach((set) => {
		let currentObj = options[set.charAt(2)];
		let response = set.charAt(0);
		let choiceScore = currentObj.score;
		let outcomeScore;
		if (response === currentObj.losesTo) {
			outcomeScore = 0;
		} else if (response === currentObj.tiesWith) {
			outcomeScore = 3;
		} else {
			outcomeScore = 6;
		}
		let roundTotal = choiceScore + outcomeScore;
		scores.push(roundTotal);
	});
	console.log(scores.reduce((a, b) => a + b));
});
