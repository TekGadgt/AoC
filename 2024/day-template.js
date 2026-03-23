var fs = require('fs');
var readline = require('readline');
var filename = '';

async function processLineByLine() {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
  }
}

processLineByLine();