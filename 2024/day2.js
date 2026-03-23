var fs = require('fs');
var readline = require('readline');

var UPPER_LIMIT = 3;
var LOWER_LIMIT = 1;

var filename = 'day2.txt';
var safe_unsafe = [];
var safe_unsafe_dampened = [];


function analyzeReports(arr) {
  if (arr.length < 2) return true;

  const differences = arr.slice(1).map((val, i) => val - arr[i]);

  return differences.every(diff => (diff >= LOWER_LIMIT && diff <= UPPER_LIMIT)) ||
         differences.every(diff => (diff <= -LOWER_LIMIT && diff >= -UPPER_LIMIT));
}

function analyzeReportsDampener(reports) {
  const isSafe = (report) => {
    const diffs = [];
    for (let i = 0; i < report.length - 1; i++) {
      const diff = report[i + 1] - report[i];
      diffs.push(diff);
    }
    const allIncreasing = diffs.every(diff => diff >= LOWER_LIMIT && diff <= UPPER_LIMIT);
    const allDecreasing = diffs.every(diff => diff <= -LOWER_LIMIT && diff >= -UPPER_LIMIT);
    return allIncreasing || allDecreasing;
  };

  let safeCount = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      // If the report is already safe, count it
      safeCount++;
    } else {
      // Try removing each level and see if the report becomes safe
      let canBeMadeSafe = false;
      for (let i = 0; i < report.length; i++) {
        // Create a modified report by removing one level
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafe(modifiedReport)) {
          canBeMadeSafe = true;
          break;
        }
      }
      if (canBeMadeSafe) {
        safeCount++;
      }
    }
  }

  return safeCount;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({input: fileStream, crlfDelay: Infinity});

  for await (const line of rl) {
    tempArr = line.split(' ');
    safe_unsafe.push(analyzeReports(tempArr));
    safe_unsafe_dampened.push(tempArr);
  }
  console.log(`Safe: ${safe_unsafe.filter(item => item === true).length}`);
  console.log(`Safe (Dampened): ${analyzeReportsDampener(safe_unsafe_dampened)}`);
}

processLineByLine();