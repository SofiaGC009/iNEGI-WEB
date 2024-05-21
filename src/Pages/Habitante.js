import "./Style.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import personas from "../Images/personas.png";
import NavBar from "./NavBar";

function Habitante() {
  const [curp, setCurp] = useState("");
  const [idVivienda, setIdVivienda] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [fecha, setFecha] = useState("");

  const [viviendaList, setViviendaList] = useState([]);
  const [editar, setEditar] = useState(false);
  const [habitantesList, setHabitantesList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/vivienda").then((response) => {
      setViviendaList(response.data);
    });
  }, []);

  const validarCURP = (curp) => {
    return curp.length === 18;
  };

  const registrar = () => {
    if (!validarCURP(curp)) {
      Swal.fire({
        icon: "info",
        title: "Formato de CURP inválido",
        html: `La CURP debe tener una longitud de 18 caracteres.<br/><a href="https://www.gob.mx/curp/" target="_blank">Consulta tu CURP aquí</a>.`,
        confirmButtonText: "Entendido",
      });
      return;
    }

    Axios.post("http://localhost:3001/createH", {
      curp: curp,
      idVivienda: idVivienda,
      nombre: nombre,
      apellidoP: apellidoP,
      apellidoM: apellidoM,
      fecha: fecha,
    })
      .then(() => {
        mostrar();
        limpiar();
        Swal.fire({
          icon: "success",
          title: "Habitante " + nombre + " " + apellidoP + " registrado",
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido registrar al habitante!",
          footer: error.message,
        });
      });
  };

  const update = () => {
    Axios.put("http://localhost:3001/updateH", {
      curp: curp,
      idVivienda: idVivienda,
      nombre: nombre,
      apellidoP: apellidoP,
      apellidoM: apellidoM,
      fecha: fecha,
    })
      .then(() => {
        mostrar();
        limpiar();
        Swal.fire({
          icon: "success",
          title: "Habitante " + nombre + " " + apellidoP + " actualizado!",
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido actualizar al habitante!",
          footer: error.message,
        });
      });
  };

  const eliminar = (val) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar al habitante? ",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteH/${val.CURP}`)
          .then(() => {
            mostrar();
            limpiar();
            Swal.fire(
              "Eliminado!",
              `El habitante ${val.NOMBREH} fue eliminado.`,
              "success"
            );
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se ha podido eliminar al habitante!",
              footer: JSON.parse(JSON.stringify(error)).message,
            });
          });
      }
    });
  };

  const editarHabitante = (val) => {
    setEditar(true);
    setCurp(val.CURP);
    setIdVivienda(val.IDVIVIENDA);
    setNombre(val.NOMBREH);
    setApellidoP(val.PATERNOH);
    setApellidoM(val.MATERNOH);
    setFecha(val.FECHANACIMIENTO);
  };

  const mostrar = () => {
    Axios.get("http://localhost:3001/habitante").then((response) => {
      setHabitantesList(response.data);
    });
  };

  const limpiar = () => {
    setCurp("");
    setIdVivienda("");
    setNombre("");
    setApellidoP("");
    setApellidoM("");
    setFecha("");
    setEditar(false);
  };

  useEffect(() => {
    mostrar();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h1>HABITANTES</h1>
          <img
            id="icono"
            src={personas}
            alt="Habitante"
            className="img-fluid mb-4"
          />
        </div>
        <div className="card-body">
          <NavBar />
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              CURP:
            </span>
            <input
              onChange={(event) => setCurp(event.target.value)}
              type="text"
              className="form-control"
              value={curp}
              placeholder="Ej. XXXX123456XXXXXX12"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <label htmlFor="idVivienda" className="input-group-text">
              Vivienda:
            </label>
            <select
              id="idVivienda"
              className="form-select"
              value={idVivienda}
              onChange={(event) => setIdVivienda(event.target.value)}
            >
              <option value="">Seleccione la vivienda</option>
              {viviendaList.map((vivienda) => (
                <option key={vivienda.IDVIVIENDA} value={vivienda.IDVIVIENDA}>
                  {vivienda.IDVIVIENDA}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre(s):
            </span>
            <input
              onChange={(event) => setNombre(event.target.value)}
              type="text"
              className="form-control"
              value={nombre}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Apellido Paterno:
            </span>
            <input
              onChange={(event) => setApellidoP(event.target.value)}
              type="text"
              className="form-control"
              value={apellidoP}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Apellido Materno:
            </span>
            <input
              onChange={(event) => setApellidoM(event.target.value)}
              type="text"
              className="form-control"
              value={apellidoM}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Fecha de Nacimiento:
            </span>
            <input
              onChange={(event) => setFecha(event.target.value)}
              type="date"
              className="form-control"
              value={fecha}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-danger m-2" onClick={limpiar}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={registrar}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">CURP</th>
            <th scope="col">Vivienda</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido P</th>
            <th scope="col">Apellido M</th>
            <th scope="col">Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {habitantesList.map((val, key) => {
            return (
              <tr key={val.CURP}>
                <th>{val.CURP}</th>
                <td>{val.IDVIVIENDA}</td>
                <td>{val.NOMBREH}</td>
                <td>{val.PATERNOH}</td>
                <td>{val.MATERNOH}</td>
                <td>{val.FECHANACIMIENTO}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarHabitante(val);
                      }}
                      className="btn btn-info"
                    >
                      {" "}
                      Editar{" "}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        eliminar(val);
                      }}
                      className="btn btn-danger"
                    >
                      {" "}
                      Eliminar{" "}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Habitante;