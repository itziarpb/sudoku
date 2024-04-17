import React, { useState, useEffect } from 'react'
import './Game.css'
import sudokusJson from './dataSudokus.json'

const Game = (props) => {
    const [visibleSudoku, setVisibleSudoku] = useState([]); //el sudoku que verá el jugador al inicio
    const [inputSudoku, setInputSudoku] = useState([]); //almacena los valores que introduce el jugador

    const [solutionSudoku, setSolutionSudoku] = useState([]); //almacena la solución para comprobar si esta correcto.
    const [wrongCells, setWrongCells] = useState([]);
    const [winner, setWinner] = useState(false);

    const [totalSeconds, setTotalSeconds] = useState(0); // almacena el tiempo total del contador
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);



    //Funcion que genera el sudoku. 1ª obtiene una solucion del archivo .json. 2º elimina numeros para mostrarlo al jugador
    const generateSudoku = (difficulty) => {

        const randomIndex = Math.floor(Math.random() * sudokusJson.length);
        setSolutionSudoku(JSON.parse(JSON.stringify(sudokusJson[randomIndex])));

        // Poner el numero de huecos vacíos en las coordenadas aleatorias que indica la prop.difficulty.
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

    //Funcion que almacena los valores introducidos por el jugador en inputSudoku
    const handleInputChange = (event, rowIndex, colIndex) => {
        const newValue = parseInt(event.target.value);
        //Comprueba si el valor introducido es valido. Si no, mantiene el valor actual
        const validatedValue = (newValue >= 1 && newValue <= 9) ? newValue : null;
        //recorre el inputSudoku hasta encontrar la celda que coincide con los index de los parametros y cambia su valor
        const newInputSudoku = inputSudoku.map((row, rIndex) =>
            rIndex === rowIndex
                ? row.map((cell, cIndex) => (cIndex === colIndex ? validatedValue : cell))
                : row
        );
        setInputSudoku(newInputSudoku);
        //Elimina la celda de las incorrecta para que vuelva a ser azul
        const newWrongCells = wrongCells.filter(cell => cell !== `${rowIndex},${colIndex}`);
        setWrongCells(newWrongCells);
    };

    //Funcion que reestablece los valores iniciales.
    const handleRestart = () => {
        const confirmRestart = window.confirm("¿Estás seguro de que deseas reiniciar?");
        if (confirmRestart) {
            setInputSudoku(visibleSudoku.map(row => row.slice()));
        }
    }



    //Funcion que comprueba si la solucion es correcta
    const handleSolve = () => {
        let isSolved = true;
        const newWrongCells = []; // Almacenar las celdas incorrectas
        const newInputSudoku = inputSudoku.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (cell !== solutionSudoku[rowIndex][colIndex]) {
                    isSolved = false;
                    newWrongCells.push(`${rowIndex},${colIndex}`); // Añadir la celda incorrecta
                    return cell;
                } else {
                    return cell;
                }
            })
        );
        setInputSudoku(newInputSudoku);
        setWrongCells(newWrongCells); // Actualizar las celdas incorrectas
        if (isSolved) {
            setWinner(isSolved)
            alert("¡Enhorabuena! Has resuelto el sudoku correctamente.");
            props.setShowGame(false);
        }
    }


    //Funcion que vuelve al inicio
    const handleBack = () => {
        props.setShowGame(false);
    }

    //Crea el sudoku cuando se carga el componente.
    useEffect(() => {
        generateSudoku(props.difficulty);

        const intervalId = setInterval(() => {
            if (!winner) {
                setTotalSeconds((prevSeconds) => prevSeconds + 1)
            }

        }, 1000)
        return () => { clearInterval(intervalId) }


    }, []);

    useEffect(() => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        setHours(h);
        setMinutes(m);
        setSeconds(s);
    }, [totalSeconds]);


    return (
        <div className="game">
            <div className="chrono">{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
            <div className="sudoku-board">
                {inputSudoku.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            //className="sudoku-cell" 
                            className={wrongCells.includes(`${rowIndex},${colIndex}`) ? "sudoku-cell wrong" : "sudoku-cell"}
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
            <div className="game-bottoms">
                <button className="game-bottom" onClick={handleRestart}>Reiniciar</button>
                <button className="game-bottom" onClick={handleSolve}>Resolver</button>
                <button className="game-bottom" onClick={handleBack}>Volver atrás</button>
            </div>

        </div>
    )
}

export default Game
