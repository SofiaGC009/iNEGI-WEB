import React from "react";
import error from "../Images/error.gif";

const NotFound = () => {
    return (
        <div className="container text-center">
            <h1 className="mt-5 display-2">404 - Página no encontrada</h1>
            <h3 className="mt-3 mb-4 display-4">Lo sentimos, la página que estás buscando no existe.</h3>
            <img src={error} alt="Gif" className="img-fluid" />
        </div>
    );
}

export default NotFound;
