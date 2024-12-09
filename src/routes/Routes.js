import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import GestionEspacios from "../pages/GestionEspacios";
import GestionRegistros from "../pages/GestionRegistros";
import ReadUsers from "../pages/ReadUsers ";
import CreateUser from "../pages/CreateUser";
import UpdateUser from "../pages/UpdateUser";
import ReadRegistros from "../pages/ReadRegistros";
import Layout from "../pages/Layout"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Routes() {

    const cerrarSesion = () => {
        console.log("Cerrando sesión...");
        cookies.remove('id', { path: "/" });
        cookies.remove('apellido_paterno', { path: "/" });
        cookies.remove('apellido_materno', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('username', { path: "/" });
        window.location.href = './';
    };


    return (
        <BrowserRouter>
            <Switch>
                {/* Ruta sin navbar */}
                <Route exact path="/" component={Login} />

                {/* Rutas con navbar */}
                <Route
                    path="/"
                    render={({ location }) => (
                        <Layout cerrarSesion={cerrarSesion}>
                            <Switch location={location}>
                                <Route exact path="/menu" component={Menu} />
                                <Route exact path="/espacios" component={GestionEspacios} />
                                <Route exact path="/registros" component={GestionRegistros} />
                                <Route exact path="/usuarios" component={ReadUsers} />
                                <Route exact path="/crearusuarios" component={CreateUser} />
                                <Route path="/actualizarusuario/:id" component={UpdateUser} />
                                <Route exact path="/listarRegistros" component={ReadRegistros} />
                            </Switch>
                        </Layout>
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
