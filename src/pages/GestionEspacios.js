import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from 'axios';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faParking, faUsers, faList, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const cookies = new Cookies();

class GestionEspacios extends Component {
    state = {
        espacios: []
    };

    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('apellido_paterno', { path: "/" });
        cookies.remove('apellido_materno', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('username', { path: "/" });
        window.location.href = './';
    };

    componentDidMount() {
        if (!cookies.get('username')) {
            window.location.href = "./";
        } else {
            this.fetchEspacios();
        }
    }

    fetchEspacios = async () => {
        try {
            const response = await axios.get(`https://utparking-api.onrender.com/verespacios`);
            this.setState({ espacios: response.data.listaEspacios });
        } catch (error) {
            console.error("Error fetching espacios:", error);
        }
    };

    handleChange = async (id, disponible) => {
        try {
            this.setState(prevState => ({
                espacios: prevState.espacios.map(espacio =>
                    espacio.id === id ? { ...espacio, disponible: Number(disponible) } : espacio
                )
            }));

            await axios.put(`https://utparking-api.onrender.com/espacio/update/${id}`, {
                numero: id,
                disponible: Number(disponible)
            });
        } catch (error) {
            console.error("Error updating espacio:", error);
            this.fetchEspacios();
        }
    };

    render() {
        return (
            <div>
                {/* Navbar Mejorado */}


                {/* Tabla de Espacios */}
                <div className="container mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">N° DE ESPACIO</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.espacios.map(espacio => (
                                <tr key={espacio.id}>
                                    <th>{espacio.id}</th>
                                    <td>{espacio.numero}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={espacio.disponible}
                                            onChange={(e) => this.handleChange(espacio.id, e.target.value)}
                                        >
                                            <option value={1}>Libre</option>
                                            <option value={0}>Ocupado</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default GestionEspacios;
