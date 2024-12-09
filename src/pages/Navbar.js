import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faParking, faList, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Navbar = ({ cerrarSesion }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/50/Utplogonuevo.svg"
                        alt="UTP Logo"
                        style={{ height: "40px", marginRight: "10px" }}
                    />
                    Sistema de Parqueo
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                <FontAwesomeIcon icon={faHome} /> Inicio
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/espacios">
                                <FontAwesomeIcon icon={faParking} /> Espacios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/registros">
                                <FontAwesomeIcon icon={faParking} /> Parqueos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/listarRegistros">
                                <FontAwesomeIcon icon={faList} /> Lista de Parqueos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/usuarios">
                                <FontAwesomeIcon icon={faUsers} /> Usuarios
                            </a>
                        </li>
                        <li className="nav-item">
                            <Button variant="primary" className="ms-2" onClick={cerrarSesion}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
