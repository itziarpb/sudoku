import React, { useState, useEffect } from 'react'
import sudokusJson from './dataSudokus.json'

const Home = () => {
    const [solutionSudoku, setsolutionSudoku] = useState([]);
    const [visibleSudoku, setVisibleSudoku] = useState([]);
    const [inputSudoku, setInputSudoku] = useState([]);

    const generateSudoku = (difficulty) => {
        const randomIndex = Math.floor(Math.random() * sudokusJson.length);

        setsolutionSudoku(JSON.parse(JSON.stringify(sudokusJson[randomIndex])));

        // Poner huecos vacíos en las coordenadas aleatorias
        const emptyIndexes = [];
        const modifiedSudoku = (JSON.parse(JSON.stringify(sudokusJson[randomIndex])))

        while (emptyIndexes.length < difficulty) {
            const randomRow = Math.floor(Math.random() * 9);
            const randomCol = Math.floor(Math.random() * 9);
            const index = `${randomRow},${randomCol}`;
            if (!emptyIndexes.includes(index)) {
                emptyIndexes.push(index);
            }
        }
        for (const index of emptyIndexes) {
            const [row, col] = index.split(',').map(Number);
            modifiedSudoku[row][col] = null;
        }
        setVisibleSudoku(modifiedSudoku);
        setInputSudoku(modifiedSudoku.map(row => row.slice()));
    }


    const handlegenerate = () => {
        generateSudoku(45)
    }

    const handleInputChange = (event, rowIndex, colIndex) => {
        const newValue = parseInt(event.target.value);
        //Comprueba si el valor introducido es valido. Si no, mantiene el valor actual
        const validatedValue = (newValue >= 1 && newValue <= 9) ? newValue : null;
        const newInputSudoku = inputSudoku.map((row, rIndex) =>
            rIndex === rowIndex
                ? row.map((cell, cIndex) => (cIndex === colIndex ? validatedValue : cell))
                : row
        );
        setInputSudoku(newInputSudoku);
    };
    const handleRestart = () => {
        // Mostrar una confirmación antes de reiniciar
        const confirmRestart = window.confirm("¿Estás seguro de que deseas reiniciar?");
        if (confirmRestart) {
            setInputSudoku(visibleSudoku.map(row => row.slice()));
        }
    }



    return (
        <div>
            <h2>SUDOKU</h2>
            <button onClick={handlegenerate}>Crear</button>
            <div className="sudoku-board">
                {inputSudoku.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            className="sudoku-cell"
                            type="numeric"
                            min="1"
                            max="9"
                            disabled={visibleSudoku[rowIndex][colIndex] !== null}
                            value={cell !== null ? cell : ''}
                            onChange={(event) => handleInputChange(event, rowIndex, colIndex)}
                        />
                    ))
                ))}
            </div>
            <button onClick={handleRestart}>Reiniciar</button>
        </div>
    )
}

export default Home
