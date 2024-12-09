
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import React, { useState, useEffect , Component} from 'react';


const cookies = new Cookies();
class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            correo: '',
            contrasena: '',
            id_rol: ''
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
         //   this.fetchEspacios();
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Al crear un nuevo usuario, no es necesario enviar el estado,
            // ya que se establece en 1 por defecto en el backend.
            await axios.post('https://utparking-api.onrender.com/usuario/add', {
                ...this.state,
                estado: 1 // Establecer estado como activo (1) por defecto
            });
            alert('Usuario creado exitosamente');
            this.setState({
                nombre: '',
                apellido: '',
                correo: '',
                contrasena: '',
                id_rol: ''
            });
        } catch (error) {
            console.error('Error al crear el usuario', error);
        }
    };

    render() {
        return (
            <div>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" onChange={this.handleChange} value={this.state.nombre} required />
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" name="apellido" onChange={this.handleChange} value={this.state.apellido} required />
                    </Form.Group>

                    <Form.Group controlId="formCorreo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" name="correo" onChange={this.handleChange} value={this.state.correo} required />
                    </Form.Group>

                    <Form.Group controlId="formContrasena">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="contrasena" onChange={this.handleChange} value={this.state.contrasena} required />
                    </Form.Group>

                    <Form.Group controlId="formRol">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control as="select" name="id_rol" onChange={this.handleChange} value={this.state.id_rol} required>
                            <option value="">Selecciona un rol</option>
                            <option value="1">Administrador</option>
                            <option value="2">Empleado</option>
                            <option value="3">Estudiante</option>
                            <option value="4">Profesor</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">Crear Usuario</Button>
                </Form>
            </div>
        );
    }
}

export default CreateUser;