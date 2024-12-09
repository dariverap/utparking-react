import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import axios from 'axios';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faParking, faUsers, faList, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const cookies = new Cookies();
class GestionRegistros extends Component {
    state = {
        registros: [] // Inicializa como un array vacío
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
            this.fetchRegistros();
        }
    }

    fetchRegistros = async () => {
        try {
            const response = await axios.get('https://utparking-api.onrender.com/verregistros');
            this.setState({ registros: response.data.listaRegistros || [] });
        } catch (error) {
            console.error("Error fetching registros:", error);
        }
    };

    cancelarReserva = async (id) => {
        try {
            // Cancelar la reserva
            await axios.put(`https://utparking-api.onrender.com/registro2/update/${id}`);
            
            // Obtener el ID del usuario desde la cookie
            const userId = cookies.get('id'); // Utiliza la cookie configurada durante el login
    
            // Actualizar el estado del usuario
            await axios.put(`https://utparking-api.onrender.com/usuario/actualizarEstado`, { id: userId });
            
            // Refrescar los datos después de actualizar
            this.fetchRegistros();
        } catch (error) {
            console.error("Error cancelando reserva o actualizando estado del usuario:", error);
        }
    };
    

    confirmarReserva = async (id) => {
        try {
            await axios.put(`https://utparking-api.onrender.com/registro2/update2/${id}`);
            this.fetchRegistros();
        } catch (error) {
            console.error("Error confirmando reserva:", error);
        }
    };

    render() {
        return (
            <div>



                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Fecha de Ingreso</th>
                            <th scope="col">Hora de Ingreso</th>
                            <th scope="col">N° de Espacio</th>
                            <th scope="col">Número de Placa del Vehículo</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.registros.length > 0 ? (
                            this.state.registros.map(registro => (
                                <tr key={registro.id}>
                                    <td>{registro.id}</td>
                                    <td>{new Date(registro.fecha_ingreso).toLocaleDateString()}</td>
                                    <td>{new Date(registro.fecha_ingreso).toLocaleTimeString()}</td>
                                    <td>{registro.id_espacio}</td>
                                    <td>{registro.patente_vehiculo}</td>
                                    <td>
                                        {registro.estado === 0 && 'Finalizado'}
                                        {registro.estado === 1 && 'Reservado'}
                                        {registro.estado === 2 && 'Ocupado'}
                                    </td>
                                    <td>
                                        {registro.estado === 1 && (
                                            <>
                                                <button 
                                                    className="btn btn-danger me-2"
                                                    onClick={() => this.cancelarReserva(registro.id)}
                                                >
                                                    Cancelar Reserva
                                                </button>
                                                <button 
                                                    className="btn btn-success"
                                                    onClick={() => this.confirmarReserva(registro.id)}
                                                >
                                                    Confirmar Reserva
                                                </button>
                                            </>
                                        )}
                                        {registro.estado === 2 && (
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => this.cancelarReserva(registro.id)}
                                            >
                                                Finalizar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={7}>No hay registros disponibles.</td></tr>
                        )}
                    </tbody>
                </table>


            </div>
        );
    }
}

export default GestionRegistros;
