
import './App.css';
import { BrowserRouter, Routes, Route, Swih } from 'react-router-dom';
import { GlobalProvider } from './store/appContext';
import Home from './Home';
import Auth from './Auth'
import NavbarComponent from './component/NavbarComponent'

function App() {


  return (
    <BrowserRouter className="App">
      <GlobalProvider> 
        <div className="App">
          <NavbarComponent />
          <h1>JUEGO DEL SUDOKU</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </div>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
