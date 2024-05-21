import "./Style.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import work from "../Images/work.jpg";
import "./Style.css";
import NavBar from "./NavBar";

function Ocupacion() {
  const [idOcupacion, setIdOcupacion] = useState("");
  const [ocupacion, setOcupacion] = useState("");

  const [editar, setEditar] = useState(false);

  const [ocupacionList, setOcupacionList] = useState([]);

  const obtenerUltimoIdOcupacion = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/ocupacion");
      const ocupaciones = response.data;
      const ultimoId = ocupaciones.length > 0 ? Math.max(...ocupaciones.map(v => v.IDOCUPACION)) : 0;
      setIdOcupacion(ultimoId + 1);
    } catch (error) {
      console.error("Error al obtener el último ID de ocupacion:", error);
    }
  };

  const registrar = () => {
    Axios.post("http://localhost:3001/createO", {
      idOcupacion: idOcupacion,
      ocupacion: ocupacion,
    })
      .then(() => {
        mostrar();
        limpiar();
        Swal.fire({
          icon: "success",
          title: "Ocupacion " + ocupacion + " registrado",
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido registrar la ocupacion!",
          footer: error.message,
        });
      });
  };

  const update = () => {
    Axios.put("http://localhost:3001/updateO", {
      idOcupacion: idOcupacion,
      ocupacion: ocupacion,
    })
      .then(() => {
        mostrar();
        limpiar();
        Swal.fire({
          icon: "success",
          title: "Ocupacion " + ocupacion + " actualizada!",
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido actualizar la ocupacion!",
          footer: error.message,
        });
      });
  };

  const eliminar = (val) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar la ocupacion? ",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(val.IDOCUPACION);
        Axios.delete(`http://localhost:3001/deleteO/${val.IDOCUPACION}`).then(() => {
          mostrar();
          limpiar();
          Swal.fire(
            "Eliminado!",
            `La ocupacion ${val.OCUPACION} fue eliminado.`,
            "success"
          );
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido eliminar la ocupacion!",
            footer: JSON.parse(JSON.stringify(error)).message
          });
        });
      }
    });
  };

  const editarOcupacion = (val)=>{
    setEditar(true);
    setIdOcupacion(val.IDOCUPACION);
    setOcupacion(val.OCUPACION);
  }

  const mostrar = () => {
    Axios.get("http://localhost:3001/ocupacion").then((response) => {
      setOcupacionList(response.data);
    });
  };

  const limpiar  = () => {
    setIdOcupacion("");
    setOcupacion("");
  };

  useEffect(() => {
    mostrar();
    obtenerUltimoIdOcupacion();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h1>OCUPACIONES</h1>
          <img id="icono" src={work} alt="Ocupaciones" className="img-fluid mb-4" />
        </div>
        <div className="card-body">
        <NavBar />
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Id Ocupacion:
            </span>
            <input
              onChange={(event) => {
                setIdOcupacion(event.target.value);
              }}
              type="text"
              className="form-control"
              value = {idOcupacion}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Ocupacion:
            </span>
            <input
              onChange={(event) => {
                setOcupacion(event.target.value);
              }}
              type="text"
              className="form-control"
              value = {ocupacion}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          {
            editar? 
            <div>
              <button className="btn btn-warning m-2" onClick={update}> Actualizar </button>
              <button className="btn btn-danger m-2" onClick={limpiar}> Cancelar </button>
            </div>
            : <button className="btn btn-success" onClick={registrar}> Registrar </button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ocupacion</th>
          </tr>
        </thead>
        <tbody>
          {ocupacionList.map((val, key) => {
            return (
              <tr key={val.IDOCUPACION}>
                <th>{val.IDOCUPACION}</th>
                <td>{val.OCUPACION}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" 
                    onClick={()=>{
                      editarOcupacion(val);
                    }}
                    className="btn btn-info"> Editar </button>
                    <button type="button" 
                    onClick={()=>{
                      eliminar(val);
                    }}
                    className="btn btn-danger"> Eliminar </button>
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

export default Ocupacion;
