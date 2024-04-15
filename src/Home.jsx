import React, { useState, useEffect } from 'react'
import sudokusJson from './dataSudokus.json'

const Home = () => {
    const [sudokuSolution, setSudokuSolution] = useState([]);

    const generateSudoku = () => {
        const randomIndex = Math.floor(Math.random() * sudokusJson.length);
        setSudokuSolution(sudokusJson[randomIndex]);
        console.log("Sudoku ", sudokuSolution)
    }

    useEffect(() => {
        generateSudoku()

    }, []);

    return (
        <div>
            <h2>SUDOKU</h2>
            <div className="sudoku-board">
                {sudokuSolution.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="sudoku-cell">
                            {cell !== null ? cell : ''}
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default Home
