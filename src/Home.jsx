import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Game from './Game';
import Create from './create';


const Home = () => {
    const [showGame, setShowGame] = useState(false);
    const [difficulty, setDifficulty] = useState(null);



    const handleGenerate = (value) => {
        setShowGame(true);
        setDifficulty(value)
    };

    const handleBack = (newValue) => {
        setShowGame(newValue);
    };


    return (
        <div>
            {showGame ? (
                <div>
                <Game difficulty={difficulty} setShowGame={handleBack} />
                </div>
            ) : (
                <div>

                    <h3>Elige la dificultad</h3>
                    <ButtonGroup aria-label="Basic example" className="buttonGroup" variant="vertical">
                        <Button className="difficulty-buttom" onClick={() => handleGenerate(1)}>Muy fácil</Button>
                        <Button className="difficulty-buttom" onClick={() => handleGenerate(20)}>Fácil</Button>
                        <Button className="difficulty-buttom" onClick={() => handleGenerate(30)}>Medio</Button>
                        <Button className="difficulty-buttom" onClick={() => handleGenerate(40)}>Difícil</Button>
                        <Button className="difficulty-buttom" onClick={() => handleGenerate(50)}>Muy difícil</Button>
                    </ButtonGroup>

                </div>
                
            )}

        </div>
    )
}

export default Home
