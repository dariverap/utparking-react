
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';

const cookies = new Cookies();

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                nombre: '',
                apellido: '',
                correo: '',
                contrasena: '',
                id_rol: '',
                estado: 1 // Estado por defecto (1: activo)
            }
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

    async componentDidMount() {
        if (!cookies.get('username')) {
            window.location.href = "./";
        } else {
            try {
                const response = await axios.get(`https://utparking-api.onrender.com/usuario/${this.props.match.params.id}`);
                this.setState({ usuario: response.data[0] }); // Asumiendo que la API devuelve un array
            } catch (error) {
                console.error('Error al obtener usuario:', error);
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://utparking-api.onrender.com/usuario/update/${this.props.match.params.id}`, this.state.usuario);
            alert('Usuario actualizado exitosamente');
            this.props.history.push('/usuarios'); // Redirige a la lista de usuarios
        } catch (error) {
            console.error('Error al actualizar el usuario', error);
        }
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            onChange={this.handleChange}
                            value={this.state.usuario.nombre}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellido"
                            onChange={this.handleChange}
                            value={this.state.usuario.apellido}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formCorreo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            name="correo"
                            onChange={this.handleChange}
                            value={this.state.usuario.correo}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formContrasena">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="contrasena"
                            onChange={this.handleChange}
                            value={this.state.usuario.contrasena}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formRol">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            as="select"
                            name="id_rol"
                            onChange={this.handleChange}
                            value={this.state.usuario.id_rol}
                            required
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="1">Administrador</option>
                            <option value="2">Empleado</option>
                            <option value="3">Estudiante</option>
                            <option value="4">Profesor</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            as="select"
                            name="estado"
                            onChange={this.handleChange}
                            value={this.state.usuario.estado}
                        >
                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">Actualizar Usuario</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(UpdateUser); // Envolvemos el componente para habilitar el uso de history
