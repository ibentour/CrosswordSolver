function crosswordSolver(emptyPuzzle, words) {
    try {
        // Check for correct types and empty inputs
        if (typeof emptyPuzzle !== 'string' || !Array.isArray(words)) {
            throw new Error();
        }

        // Check for empty puzzle or words
        if (emptyPuzzle.trim() === '' || words.length === 0) {
            throw new Error();
        }

        // Check if all words are strings
        if (words.some(word => typeof word !== 'string')) {
            throw new Error();
        }

        // Convert the puzzle string to a 2D array
        const grid = emptyPuzzle.split('\n').map(row => row.trim().split(''));
        const rows = grid.length;
        const cols = grid[0].length;

        // Check for wrong puzzle format
        if (rows === 0 || cols === 0 || !grid.every(row => row.length === cols)) {
            throw new Error();
        }

        // Find all word positions in the grid and validate starting numbers
        const wordPositions = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] !== '.' && !isNaN(parseInt(grid[r][c]))) {
                    const num = parseInt(grid[r][c]);
                    if (num > 2) {
                        throw new Error();
                    }
                    let wordCount = 0;
                    // Check horizontal
                    if (c === 0 || grid[r][c-1] === '.') {
                        let length = 0;
                        while (c + length < cols && grid[r][c + length] !== '.') length++;
                        if (length > 1) {
                            wordPositions.push({ row: r, col: c, length, direction: 'horizontal' });
                            wordCount++;
                        }
                    }
                    // Check vertical
                    if (r === 0 || grid[r-1][c] === '.') {
                        let length = 0;
                        while (r + length < rows && grid[r + length][c] !== '.') length++;
                        if (length > 1) {
                            wordPositions.push({ row: r, col: c, length, direction: 'vertical' });
                            wordCount++;
                        }
                    }
                    // Validate that the starting number matches the number of words that can start
                    if (wordCount !== num) {
                        throw new Error();
                    }
                }
            }
        }

        // Check for mismatch between number of input words and puzzle starting cells
        if (wordPositions.length !== words.length) {
            throw new Error();
        }

        // Check for word repetition
        if (new Set(words).size !== words.length) {
            throw new Error();
        }

        // Check for wrong word format
        if (words.some(word => !/^[a-zA-Z]+$/.test(word))) {
            throw new Error();
        }

        const usedWords = new Set();
        let solutionCount = 0;
        let solutions = new Set();

        function canPlaceWord(word, row, col, length, direction) {
            if (word.length !== length) return false;
            for (let i = 0; i < length; i++) {
                const r = direction === 'horizontal' ? row : row + i;
                const c = direction === 'horizontal' ? col + i : col;
                if (r >= rows || c >= cols) return false;
                const cellContent = grid[r][c];
                if (cellContent !== '.' && cellContent !== word[i] && isNaN(parseInt(cellContent))) {
                    return false;
                }
            }
            return true;
        }

        function placeWord(word, row, col, direction) {
            for (let i = 0; i < word.length; i++) {
                const r = direction === 'horizontal' ? row : row + i;
                const c = direction === 'horizontal' ? col + i : col;
                grid[r][c] = word[i];
            }
        }

        function removeWord(word, row, col, direction) {
            for (let i = 0; i < word.length; i++) {
                const r = direction === 'horizontal' ? row : row + i;
                const c = direction === 'horizontal' ? col + i : col;
                if (isNaN(parseInt(grid[r][c]))) {
                    grid[r][c] = '.';
                }
            }
        }

        function isValidSolution() {
            // Check if all words in the grid match words in the input list
            const gridWords = new Set();
            
            // Check horizontal words
            for (let r = 0; r < rows; r++) {
                let word = '';
                for (let c = 0; c < cols; c++) {
                    if (grid[r][c] !== '.') {
                        word += grid[r][c];
                    } else if (word.length > 1) {
                        gridWords.add(word);
                        word = '';
                    } else {
                        word = '';
                    }
                }
                if (word.length > 1) {
                    gridWords.add(word);
                }
            }
            
            // Check vertical words
            for (let c = 0; c < cols; c++) {
                let word = '';
                for (let r = 0; r < rows; r++) {
                    if (grid[r][c] !== '.') {
                        word += grid[r][c];
                    } else if (word.length > 1) {
                        gridWords.add(word);
                        word = '';
                    } else {
                        word = '';
                    }
                }
                if (word.length > 1) {
                    gridWords.add(word);
                }
            }

            // Check if all grid words are in the input word list
            for (const word of gridWords) {
                if (!words.includes(word)) {
                    return false;
                }
            }

            return gridWords.size === words.length;
        }

        function solve(posIndex) {
            if (posIndex === wordPositions.length) {
                if (isValidSolution()) {
                    const solution = grid.map(row => row.join('')).join('\n');
                    if (!solutions.has(solution)) {
                        solutionCount++;
                        solutions.add(solution);
                    }
                }
                return;
            }
        
            const { row, col, length, direction } = wordPositions[posIndex];
        
            for (const word of words) {
                if (!usedWords.has(word) && canPlaceWord(word, row, col, length, direction)) {
                    placeWord(word, row, col, direction);
                    usedWords.add(word);
        
                    solve(posIndex + 1);
        
                    removeWord(word, row, col, direction);
                    usedWords.delete(word);
                }
            }
        }

        solve(0);

        if (solutionCount === 1) {
            console.log([...solutions][0]);
        } else if (solutionCount > 1) {
            console.log('Error');
            // for (const solution of solutions) {
            //     console.log('\n\n');
            //     console.log(solution);
            // }
        } else {
            console.log('Error');
        }
    } catch (error) {
        console.log('Error');
    }
}
