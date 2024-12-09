import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, cerrarSesion }) => {
    return (
        <>
            <Navbar cerrarSesion={cerrarSesion} />
            <main className="container mt-4">{children}</main>
        </>
    );
};

export default Layout;
