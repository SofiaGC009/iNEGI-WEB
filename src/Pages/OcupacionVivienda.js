import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import NavBar from "./NavBar";

function OcupacionVivienda() {
  const [viviendas, setViviendas] = useState([]);
  const [ocupaciones, setOcupaciones] = useState([]);
  const [selectedVivienda, setSelectedVivienda] = useState("");
  const [selectedOcupaciones, setSelectedOcupaciones] = useState([]);

  useEffect(() => {
    // Obtener viviendas
    Axios.get("http://localhost:3001/vivienda")
      .then((response) => {
        setViviendas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las viviendas:", error);
      });

    // Obtener ocupaciones
    Axios.get("http://localhost:3001/ocupacion")
      .then((response) => {
        setOcupaciones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ocupaciones:", error);
      });
  }, []);

  const handleRegistrar = () => {
    // Verifica que se haya seleccionado una vivienda y al menos una ocupación
    if (selectedVivienda && selectedOcupaciones.length > 0) {
      // Enviar datos al servidor
      Axios.post("http://localhost:3001/createOcupacionVivienda", {
        idVivienda: selectedVivienda,
        idOcupacion: selectedOcupaciones,
      })
        .then((response) => {
          console.log(response.data);
          // Mostrar alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'La ocupación se ha registrado en la vivienda correctamente',
          });
        })
        .catch((error) => {
          console.error("Error al registrar la ocupación en la vivienda:", error);
        });
    } else {
      console.error("Por favor, selecciona una vivienda y al menos una ocupación");
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="selectVivienda" className="form-label">Selecciona una vivienda:</label>
          <select
            id="selectVivienda"
            className="form-select"
            value={selectedVivienda}
            onChange={(e) => setSelectedVivienda(e.target.value)}
          >
            <option value="">Selecciona una vivienda</option>
            {viviendas.map((vivienda) => (
              <option key={vivienda.IDVIVIENDA} value={vivienda.IDVIVIENDA}>
                {vivienda.CALLE}, {vivienda.COLONIA}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="selectOcupaciones" className="form-label">Selecciona las ocupaciones:</label>
          <select
            id="selectOcupaciones"
            className="form-select"
            multiple
            value={selectedOcupaciones}
            onChange={(e) => setSelectedOcupaciones(Array.from(e.target.selectedOptions, (option) => option.value))}
          >
            {ocupaciones.map((ocupacion) => (
              <option key={ocupacion.IDOCUPACION} value={ocupacion.IDOCUPACION}>
                {ocupacion.OCUPACION}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <button className="btn btn-info m-2" type="button" onClick={handleRegistrar}>Registrar</button>
        </div>
        <div className="col-md-12">
        <button
          className="btn btn-primary m-2"
          onClick={() => (window.location.href = "/vivienda")}
        >
          Regresar
        </button>
        </div>
      </div>
    </div>
  );
}

export default OcupacionVivienda;
