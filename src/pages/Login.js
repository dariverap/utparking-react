import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js"
import axios from 'axios';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }



    iniciarSesion = async () => {
        try {
            const response = await axios.get('https://utparking-api.onrender.com/obtenerusuarios');
            const usuarios = response.data.listaUsuarios; // Accede a la lista de usuarios
    
            // Depuración
            console.log("Usuario ingresado:", this.state.form.username);
            console.log("Contraseña ingresada:", this.state.form.password);
            console.log("Usuarios desde API:", usuarios);
    
            // Busca el usuario que coincida con el nombre y contraseña
            const usuarioEncontrado = usuarios.find(usuario => 
                usuario.correo === this.state.form.username && 
                usuario.contrasena === this.state.form.password // Sin md5 aquí
            );
    
            if (usuarioEncontrado) {
                // Verifica si el rol del usuario es Administrador o Empleado
                if (usuarioEncontrado.id_rol === 1 || usuarioEncontrado.id_rol === 2) {
                    cookies.set('id', usuarioEncontrado.id, { path: "/" });
                    cookies.set('apellido', usuarioEncontrado.apellido, { path: "/" });
                    cookies.set('nombre', usuarioEncontrado.nombre, { path: "/" });
                    cookies.set('username', usuarioEncontrado.correo, { path: "/" });
                    cookies.set('id_rol', usuarioEncontrado.id_rol, { path: "/" });
                    alert(`Bienvenido ${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}`);
                    window.location.href = "./menu";
                } else {
                    alert('Acceso denegado: Solo administradores y empleados pueden iniciar sesión.');
                }
            } else {
                alert('El usuario o la contraseña no son correctos');
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert('Ocurrió un error al intentar iniciar sesión.');
        }
    }
    

    componentDidMount() {
        if (cookies.get('username')) {
            window.location.href = "./menu";
        }
    }

    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn btn-primary" onClick={this.iniciarSesion}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;