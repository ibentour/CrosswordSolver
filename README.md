# Crossword Solver

## Description

This JavaScript program solves crossword puzzles given an empty puzzle grid and a list of words to fill in. It uses a backtracking algorithm to find all possible solutions and outputs either the unique solution or an error message if multiple solutions or no solutions are found.

## Features

- Solves crossword puzzles with a given grid and word list
- Validates input for correct format and consistency
- Handles both horizontal and vertical word placements
- Detects and reports multiple solutions or no solutions
- Provides detailed error checking for various input scenarios

## Requirements

- Node.js environment to run the JavaScript file

## Usage

1. Run the script using Node.js:

   ```bash
   node crosswordSolver.js
   ```

2. Modify the `puzzle` and `words` variables at the bottom of the file to input your own crossword puzzle and word list.

## Input Format

### Puzzle Grid

The puzzle grid should be a string where:
- Each row is separated by a newline character (`\n`)
- Empty cells are represented by dots (`.`)
- Numbered cells are represented by digits
- The puzzle should be rectangular (all rows have the same length)

Example:
```javascript
const puzzle = '2001\n0..0\n1000\n0..0'
```

This represents a 4x4 grid:
```
2 0 0 1
0 . . 0
1 0 0 0
0 . . 0
```

### Word List

The word list should be an array of strings, where each string is a word to be placed in the puzzle.

Example:
```javascript
const words = ['casa', 'alan', 'ciao', 'anta']
```

## Function: crosswordSolver(emptyPuzzle, words)

### Parameters:
- `emptyPuzzle` (string): The empty crossword puzzle grid
- `words` (array of strings): List of words to be placed in the puzzle

### Output:
- If a unique solution is found, it prints the solved puzzle to the console.
- If multiple solutions or no solutions are found, it prints "Error" to the console.

## Algorithm

The solver uses a backtracking algorithm with the following steps:

1. Validate input (puzzle format, word list, etc.)
2. Find all word positions in the grid
3. Recursively try placing words in the available positions
4. Check if a valid solution is found
5. Backtrack if the current placement doesn't lead to a solution

## Error Handling

The program checks for various error conditions, including:
- Incorrect input types
- Empty puzzle or word list
- Mismatched number of words and starting positions
- Invalid puzzle format
- Repeated words in the input list
- Invalid characters in words (only letters are allowed)
- Inconsistent numbering of starting positions

If any of these conditions are met, the program will output "Error".

## Future Improvements

Potential enhancements for the program could include:
- Performance optimizations for larger puzzles
- User interface for inputting puzzles and words
- Step-by-step solving visualization
- Option to output all valid solutions when multiple exist