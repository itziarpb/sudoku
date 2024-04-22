import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Game from './component/Game';
import { GlobalContext } from './store/appContext';


const Home = () => {
    const { showGame, setShowGame } = useContext(GlobalContext);
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
                <div className="container">
                    <h3>Pon a prueba tu habilidad jugando al conocido juego japonés</h3>
                    <div className="row">
                        <div className="col-md-8 align-middle">
                            <h3 className="">Elige la dificultad:</h3>
                            <ButtonGroup className="buttonGroup container d-flex flex-sm-row flex-column" >
                                <Button className="difficulty-buttom" onClick={() => handleGenerate(1)}>Muy fácil</Button>
                                <Button className="difficulty-buttom" onClick={() => handleGenerate(20)}>Fácil</Button>
                                <Button className="difficulty-buttom" onClick={() => handleGenerate(30)}>Medio</Button>
                                <Button className="difficulty-buttom" onClick={() => handleGenerate(40)}>Difícil</Button>
                                <Button className="difficulty-buttom" onClick={() => handleGenerate(50)}>Muy difícil</Button>
                            </ButtonGroup>
                        </div>
                        <div className="col-md">
                            <p>
                                Top jugdores
                                <div>1º Ana</div>
                                <div>2º Pedro</div>
                                <div>3º Laura</div>
                                <div>4º Julia</div>
                                <div>5º Hugo</div>
                            </p>
                            <p className="m-1 d-flex justify-content-center">Registrate si quieres guardar tus partidas </p>
                        </div>
                    </div>
                </div>

            )}

        </div>
    )
}

export default Home
