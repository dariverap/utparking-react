
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import React, { Component} from 'react';


const cookies = new Cookies();

class ReadUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: []
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
            this.fetchUsuarios();
        }
    }

    fetchUsuarios = async () => {
        try {
            const response = await axios.get('https://utparking-api.onrender.com/usuarios');
            this.setState({ usuarios: response.data.listaUsuarios });
        } catch (error) {
            console.error('Error al obtener usuarios', error);
        }
    };

    handleDelete = async (id) => {
        try {
            // Cambiar el estado a 0 para desactivar el usuario
            await axios.put(`https://utparking-api.onrender.com/usuario/eliminar/${id}`);
            alert('Usuario desactivado exitosamente');
            this.fetchUsuarios(); // Re-fetch users after deletion
        } catch (error) {
            console.error('Error al desactivar el usuario', error);
        }
    };

    render() {
        return (
            <div>
                <Button href='/crearusuarios'>CREAR USUARIO</Button>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th> {/* Nueva columna para el estado */}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.correo}</td>

                                {/* Aquí puedes mapear el id_rol a su nombre correspondiente */}
                                {/* 
                                  const roles = {1: "Administrador", 2: "Empleado", 3: "Estudiante", 4: "Profesor"};
                                  En lugar de mostrar id_rol directamente puedes hacer:
                                  */}
                                {/* 
                                  <td>{roles[usuario.id_rol]}</td> 
                                */}
                                {/* O simplemente mostrar el id_rol como está */}
                                <td>{usuario.rol_nombre}</td>

                                {/* Mostrar el estado del usuario */}
                                <td>{usuario.estado === 1 || usuario.estado === 2 ? 'Activo' : 'Inactivo'}</td>


                                {/* Botón para editar */}
                                <td><Button variant="warning" href={`/actualizarusuario/${usuario.id}`}>Editar</Button>{' '}
                                    {/* Botón para eliminar */}
                                    <Button variant="danger" onClick={() => this.handleDelete(usuario.id)}>Desactivar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default ReadUsers;