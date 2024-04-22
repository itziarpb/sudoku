import React from 'react'
import { Link } from 'react-router-dom'



const NavbarComponent = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">SUDOKU</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/auth">Login</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Perfil
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="#">Perfil</Link></li>
                                    <li><Link className="dropdown-item" href="#">Cerrar sesión</Link></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavbarComponent