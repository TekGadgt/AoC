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
      isReadingRules = false;
      continue;
    }

    if (isReadingRules) {
      rules.push(line.trim());
    } else {
      updates.push(line.trim().split(',').map(Number));
    }
  }

  handleUpdates(rules, updates);
}

function parseRules(rules) {
  const graph = {};
  rules.forEach(rule => {
    const [x, y] = rule.split('|').map(Number);
    if (!graph[x]) graph[x] = new Set();
    graph[x].add(y);
  });
  return graph;
}

function isValidUpdate(update, graph) {
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
}

function correctUpdate(update, graph) {
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
}

function getMiddlePagesSum(updates) {
  return updates
    .map(update => update[Math.floor(update.length / 2)])
    .reduce((sum, page) => sum + page, 0);
}

function handleUpdates(rules, updates) {
  const graph = parseRules(rules);

  const validUpdates = [];
  const invalidUpdates = [];

  updates.forEach(update => {
    if (isValidUpdate(update, graph)) {
      validUpdates.push(update);
    } else {
      invalidUpdates.push(update);
    }
  });

  const correctedUpdates = invalidUpdates.map(update => correctUpdate(update, graph));

  const part1Sum = getMiddlePagesSum(validUpdates);
  const part2Sum = getMiddlePagesSum(correctedUpdates);

  console.log("Part 1 - Valid Updates:", validUpdates);
  console.log("Part 1 - Middle Pages Sum:", part1Sum);
  console.log("Part 2 - Corrected Updates:", correctedUpdates);
  console.log("Part 2 - Middle Pages Sum:", part2Sum);
}

processLineByLine();
