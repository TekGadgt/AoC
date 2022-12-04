var fs = require("fs");

fs.readFile("input.txt", "utf-8", function (err, data) {
	if (err) {
		throw err;
	}
	let scores = [];
	let dataArr = data.split("\n");
	dataArr.forEach((set) => {
		let firstHalf = set
			.substring(0, set.length / 2)
			.split("")
			.sort();
		let secondHalf = set
			.substring(set.length / 2)
			.split("")
			.sort();
		let uniqueFirstHalf = [...new Set(firstHalf)];
		let uniqueSecondHalf = [...new Set(secondHalf)];
		let match = uniqueFirstHalf.filter((el) =>
			uniqueSecondHalf.includes(el),
		)[0];
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
