import React, { Component } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class ReadRegistros extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registros: [],
            currentPage: 1,
            registrosPerPage: 10,
        };
    }
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
            const response = await axios.get('https://utparking-api.onrender.com/listarregistros');
            this.setState({ registros: response.data.listaRegistros });
        } catch (error) {
            console.error('Error al obtener registros', error);
        }
    };

    formatDate = (date) => {
        try {
            return format(parseISO(date), 'dd/MM/yyyy');
        } catch {
            return 'Fecha inválida';
        }
    };

    formatTime = (time) => {
        try {
            return time.slice(0, 5); // Extraer solo horas y minutos
        } catch {
            return 'Hora inválida';
        }
    };

    render() {
        const { registros, currentPage, registrosPerPage } = this.state;

        const indexOfLastRegistro = currentPage * registrosPerPage;
        const indexOfFirstRegistro = indexOfLastRegistro - registrosPerPage;
        const currentRegistros = registros.slice(indexOfFirstRegistro, indexOfLastRegistro);

        const totalPages = Math.ceil(registros.length / registrosPerPage);

        return (
            <div>
                <h2 className="text-center my-4">Registros</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha Ingreso</th>
                            <th>Hora Ingreso</th>
                            <th>Fecha Salida</th>
                            <th>Hora Salida</th>
                            <th>Tiempo Diferencia</th>
                            <th>Espacio</th>
                            <th>Vehículo</th>
                            <th>Usuario</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRegistros.map((registro) => (
                            <tr key={registro.id}>
                                <td>{registro.id}</td>
                                <td>{this.formatDate(registro.fecha_ingreso)}</td>
                                <td>{this.formatTime(registro.hora_ingreso)}</td>
                                <td>{this.formatDate(registro.fecha_salida)}</td>
                                <td>{this.formatTime(registro.hora_salida)}</td>
                                <td>{registro.tiempo_diferencia}</td>
                                <td>{registro.id_espacio}</td>
                                <td>{registro.patente_vehiculo}</td>
                                <td>{registro.nombre_completo}</td>
                                <td>{registro.estado === 0 ? 'Inactivo' : 'Activo'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination className="justify-content-center">
                    {[...Array(totalPages).keys()].map((page) => (
                        <Pagination.Item
                            key={page + 1}
                            active={page + 1 === currentPage}
                            onClick={() => this.setState({ currentPage: page + 1 })}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

            </div>
        );
    }
}

export default ReadRegistros;
