var fs = require('fs');
var readline = require('readline');
var filename = 'day5.txt';

var rules = [];
var updates = [];

async function processLineByLine() {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let isReadingRules = true;

  for await (const line of rl) {
    if (line.trim() === '') {
      // Empty line indicates switching from rules to updates
      isReadingRules = false;
      continue;
    }

    if (isReadingRules) {
      rules.push(line.trim());
    } else {
      updates.push(line.trim().split(',').map(Number));
    }
  }

  // Once rules and updates are loaded, process them
  processRulesAndUpdates(rules, updates);
}

function processRulesAndUpdates(rules, updates) {
  // Parse rules into a graph representation
  const graph = {};
  rules.forEach(rule => {
    const [x, y] = rule.split('|').map(Number);
    if (!graph[x]) graph[x] = new Set();
    graph[x].add(y);
  });

  // Function to check if an update is in correct order
  const isValidUpdate = (update, graph) => {
    const indexMap = {};
    update.forEach((page, idx) => {
      indexMap[page] = idx;
    });

    for (const x of update) {
      if (graph[x]) {
        for (const y of graph[x]) {
          if (indexMap[y] !== undefined && indexMap[x] > indexMap[y]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Function to correct an update using topological sort
  const correctUpdate = (update, graph) => {
    const dependencies = {};
    const inDegree = {};

    // Initialize graph for the update
    update.forEach(page => {
      dependencies[page] = new Set();
      inDegree[page] = 0;
    });

    // Build dependency graph for the update
    update.forEach(x => {
      if (graph[x]) {
        graph[x].forEach(y => {
          if (update.includes(y)) {
            dependencies[x].add(y);
            inDegree[y] += 1;
          }
        });
      }
    });

    // Perform topological sort
    const queue = [];
    update.forEach(page => {
      if (inDegree[page] === 0) {
        queue.push(page);
      }
    });

    const sorted = [];
    while (queue.length > 0) {
      const current = queue.shift();
      sorted.push(current);

      dependencies[current].forEach(next => {
        inDegree[next] -= 1;
        if (inDegree[next] === 0) {
          queue.push(next);
        }
      });
    }

    return sorted;
  };

  // Part 1: Validate updates
  const validUpdates = [];
  const invalidUpdates = [];
  const middlePagesPart1 = [];

  updates.forEach(update => {
    if (isValidUpdate(update, graph)) {
      validUpdates.push(update);
      middlePagesPart1.push(update[Math.floor(update.length / 2)]);
    } else {
      invalidUpdates.push(update);
    }
  });

  const middlePagesSumPart1 = middlePagesPart1.reduce((sum, page) => sum + page, 0);

  // Part 2: Correct invalid updates
  const correctedUpdates = invalidUpdates.map(update => correctUpdate(update, graph));
  const middlePagesPart2 = correctedUpdates.map(update => update[Math.floor(update.length / 2)]);
  const middlePagesSumPart2 = middlePagesPart2.reduce((sum, page) => sum + page, 0);

  // Output results
  console.log("Part 1 - Valid Updates:", validUpdates);
  console.log("Part 1 - Middle Pages Sum:", middlePagesSumPart1);
  console.log("Part 2 - Corrected Updates:", correctedUpdates);
  console.log("Part 2 - Middle Pages Sum:", middlePagesSumPart2);
}

processLineByLine();
