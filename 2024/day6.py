def load_map(filename):
    with open(filename, 'r') as file:
        return [list(line.strip()) for line in file.readlines()]

def find_guard_start(grid):
    for y, row in enumerate(grid):
        for x, cell in enumerate(row):
            if cell in "^>v<":
                return (x, y), cell
    raise ValueError("Guard starting position not found")

def turn_right(direction):
    return {'^': '>', '>': 'v', 'v': '<', '<': '^'}[direction]

def move_forward(x, y, direction):
    moves = {'^': (0, -1), '>': (1, 0), 'v': (0, 1), '<': (-1, 0)}
    dx, dy = moves[direction]
    return x + dx, y + dy

def simulate_patrol(grid, start, direction, max_moves=1000):
    visited = set()
    x, y = start
    moves = 0
    state_history = []  # Tracks sequential states for cycle detection

    while moves < max_moves:
        state = (x, y, direction)
        if state in state_history:
            # Check for a cycle by ensuring the repeated state matches
            cycle_start = state_history.index(state)
            if state_history[cycle_start:] == state_history[:len(state_history[cycle_start:])]:
                print(f"Loop detected at ({x}, {y}) facing {direction}")
                return visited, True  # True loop detected
        state_history.append(state)

        visited.add((x, y))
        nx, ny = move_forward(x, y, direction)

        # Check boundaries or obstacles
        if not (0 <= ny < len(grid) and 0 <= nx < len(grid[0])) or grid[ny][nx] == '#':
            direction = turn_right(direction)  # Turn right if blocked
        else:
            x, y = nx, ny  # Move forward

        moves += 1

    print(f"Simulation completed. Visited positions: {len(visited)}")
    return visited, False

def find_valid_obstructions(grid, visited):
    valid_positions = set()
    for y, row in enumerate(grid):
        for x, cell in enumerate(row):
            if (x, y) in visited or cell != '.':
                continue

            # Add obstruction
            modified_grid = [list(row) for row in grid]
            modified_grid[y][x] = '#'

            # Re-simulate
            start, direction = find_guard_start(modified_grid)
            new_visited, has_loop = simulate_patrol(modified_grid, start, direction)

            # Check if the patrol is stuck in a loop
            if has_loop:
                valid_positions.add((x, y))
                print(f"Valid obstruction found at: ({x}, {y})")

    return valid_positions

def main():
    grid = load_map('day6-example.txt')
    print("Map loaded successfully:")
    for row in grid:
        print("".join(row))

    # Part One
    start, direction = find_guard_start(grid)
    visited, _ = simulate_patrol(grid, start, direction)
    print(f"Part One: {len(visited)}")

    # Part Two
    valid_obstructions = find_valid_obstructions(grid, visited)
    print(f"Part Two: {len(valid_obstructions)}")

if __name__ == "__main__":
    main()
