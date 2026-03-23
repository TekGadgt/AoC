const fs = require("fs");

const MAX_MOVES = 1000;

// Load the map from the input file
function loadMap(filename) {
    const data = fs.readFileSync(filename, "utf-8").trim();
    return data.split("\n").map(row => row.split(""));
}

// Find the guard's starting position and direction
function findGuardStart(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if ("^>v<".includes(map[y][x])) {
                return { x, y, direction: map[y][x] };
            }
        }
    }
    throw new Error("Guard starting position not found!");
}

// Simulate guard movement
function simulateGuard(map) {
    const directions = { "^": [0, -1], ">": [1, 0], "v": [0, 1], "<": [-1, 0] };
    const turnRight = { "^": ">", ">": "v", "v": "<", "<": "^" };

    const visited = new Set();
    let { x, y, direction } = findGuardStart(map);
    let moves = 0;

    while (true) {
        const key = `${x},${y}`;
        if (!visited.has(key)) visited.add(key);

        const [dx, dy] = directions[direction];
        const nx = x + dx;
        const ny = y + dy;

        if (
            nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length ||
            map[ny][nx] === "#"
        ) {
            // Turn right if hitting a boundary or obstacle
            direction = turnRight[direction];
        } else {
            // Move forward
            x = nx;
            y = ny;
        }

        moves++;
        if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) break; // Guard exits map
        if (moves > MAX_MOVES) break; // Prevent infinite loop
    }

    return visited;
}

// Test obstructions and identify valid ones for loops
function testObstructions(map) {
    const originalVisited = simulateGuard(map);
    const obstructions = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] !== ".") continue; // Skip non-empty cells
            if (originalVisited.has(`${x},${y}`)) continue; // Skip original patrol path

            const testMap = map.map(row => [...row]);
            testMap[y][x] = "#"; // Add an obstruction

            const testVisited = simulateGuard(testMap);
            if (testVisited.size < originalVisited.size) {
                obstructions.push({ x, y });
            }
        }
    }

    return obstructions;
}

// Main function
function main(filename) {
    const map = loadMap(filename);
    console.log("Map loaded successfully:");
    console.log(map.map(row => row.join("")).join("\n"));

    // Part One
    const visited = simulateGuard(map);
    console.log("Part One:", visited.size);

    // Part Two
    const obstructions = testObstructions(map);
    console.log("Part Two:", obstructions.length);
}

// Run the program
main("day6-example.txt");
