import "./Style.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import casa from "../Images/casa.jpg";
import NavBar from "./NavBar";

function Vivienda() {
  const [idVivienda, setVivienda] = useState("");
  const [material, setMaterial] = useState("");
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [numInt, setNumInt] = useState("");
  const [numExt, setNumExt] = useState("");
  const [cp, setCp] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");

  const [editar, setEditar] = useState(false);

  const [viviendaList, setViviendaList] = useState([]);

  const [materialViviendaList, setMaterialViviendaList] = useState([]);

  const validarCampos = () => {
    if (
      !idVivienda ||
      !material ||
      !calle ||
      !colonia ||
      !cp ||
      !localidad ||
      !selectedMunicipio
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios, excepto el número interior!",
      });
      return false;
    }
    return true;
  };

  const municipioLocalidades = {
    Abasolo: ["Abasolo", "Los Rodriguez", "Oscar Jimenez Perez"],
    Acuña: ["Ciudad Acuña", "Las Cuevas", "Calles"],
    Allende: ["Allende", "Rio Bravo", "La Tembladora"],
    Arteaga: ["Arteaga", "San Antonio de las Alazanas", "Huachichil"],
    Candela: ["Candela", "El Huizachal", "Valladares"],
    Castaños: ["Castaños", "Soledad", "Dolores"],
    "Cuatro Ciénegas": [
      "Cuatro Ciénegas de Carranza",
      "Santa Teresa de Sofia",
      "Estanque de Leon",
    ],
    Escobedo: ["Escobedo", "Primero de Mayo", "Obayos"],
    "Francisco I. Madero": [
      "Francisco I. Madero",
      "Hidalgo",
      "Seis de Octubre",
    ],
    Frontera: [
      "Frontera",
      "Colonia Diana Laura Riojas de Colosio",
      "Ocho de Enero",
    ],
    "General Cepeda": ["General Cepeda", "Macuyú", "La Unión"],
    Guerrero: ["Guerrero", "Santa Mónica ", "Guadalupe"],
    Hidalgo: ["Hidalgo", "San Antonio", "San Juan"],
    Jiménez: ["Jiménez", "San Carlos", "Santa María"],
    Juárez: ["Juárez", "Don Martin", "El Alamo"],
    Lamadrid: ["Lamadrid", "Polka", "San Marcos"],
    Matamoros: ["Matamoros", "San Antonio del Coyote ", "Hidalgo"],
    Monclova: ["Monclova", "Lupita Murguía", "El Oro"],
    Morelos: ["Morelos", "Los Álamos", "Campamento Venustiano Carranza "],
    Múzquiz: ["Ciudad Melchor Múzquiz", "Palaú", "Minas de Barroterán"],
    Nadadores: ["Nadadores", "San José del Águila", "Villa de Nadadores "],
    Nava: ["Nava", "Colonia Venustiano Carranza ", "Estacion Rio Escondido"],
    Ocampo: ["Ocampo", "Laguna del Rey", "Chula Vista"],
    Parras: [
      "Parras de la Fuente",
      "San Francisco del Progreso",
      "Veintiocho de Agosto",
    ],
    "Piedras Negras": [
      "Piedras Negras",
      "Centro de Readaptación Social Piedras Negras",
      "Fraccionamiento Villa Real",
    ],
    Progreso: ["Progreso", "San José de Aura", "Mineral la Luz"],
    "Ramos Arizpe": ["Ramos Arizpe", "Paredon", "Santa Maria"],
    Sabinas: ["Sabinas", "Cloete", "Valle Dorado"],
    Sacramento: ["Sacramento", "San Felipe", "El Pokar"],
    Saltillo: ["Saltillo", "Agua Nueva", "San Juan de la Vaquería"],
    "San Buenaventura": [
      "San Buenaventura",
      "Santa Gertrudis",
      "San Antonio de la Cascada",
    ],
    "San Juan de Sabinas": [
      "San Juan de Sabinas",
      "Nueva Rosita",
      "Paso del Coyote",
    ],
    "San Pedro": ["San Pedro", "Concordia", "Luchana"],
    "Sierra Mojada": ["Sierra Mojada", "Hercules", "La Esmeralda"],
    Torreón: ["Torreón", "La Partida", "La Concha"],
    Viesca: ["Viesca", "La Ventana", "Boquilla de las Perlas"],
    "Villa Unión": ["Villa Unión", "San Antonio", "San Juan"],
    Zaragoza: ["Zaragoza", "Paso del Tío Pío ", "Congregación el Remolino"],
  };

  const handleMunicipioChange = (e) => {
    setSelectedMunicipio(e.target.value);
    setLocalidad(""); // Reinicia la localidad seleccionada al cambiar el municipio
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/material").then((response) => {
      setMaterialViviendaList(response.data);
    });
  }, []);

  const handleIdViviendaChange = (e) => {
    const value = e.target.value;
    // Verifica si el valor ingresado es un número entero
    if (/^\d+$/.test(value) || value === "") {
      setVivienda(value);
    }
  };

  const obtenerUltimoIdVivienda = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/vivienda");
      const viviendas = response.data;
      const ultimoId =
        viviendas.length > 0
          ? Math.max(...viviendas.map((v) => v.IDVIVIENDA))
          : 0;
      setVivienda(ultimoId + 1);
    } catch (error) {
      console.error("Error al obtener el último ID de vivienda:", error);
    }
  };

  const registrar = () => {
    if (!validarCampos()) return;

    Axios.post("http://localhost:3001/createV", {
      idVivienda: idVivienda,
      material: material,
      calle: calle,
      colonia: colonia,
      numInt: numInt,
      numExt: numExt,
      cp: cp,
      localidad: localidad,
      municipio: selectedMunicipio,
    })
      .then(() => {
        mostrar();
        limpiar();
        Swal.fire({
          title: "La vivienda " + idVivienda + " fue registrada con éxito!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido registrar la vivienda!",
          footer: error.message,
        });
      });
  };

  const update = () => {
    Axios.put("http://localhost:3001/updateV", {
      idVivienda: idVivienda,
      material: material,
      calle: calle,
      colonia: colonia,
      numInt: numInt,
      numExt: numExt,
      cp: cp,
      localidad: localidad,
      municipio: selectedMunicipio,
    })
      .then(() => {
        mostrar();
        limpiar();
        Swal.fire({
          title: "La vivienda " + idVivienda + " fue actualizada con exito!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido actualizar la vivienda!",
          footer: error.message,
        });
      });
  };

  const eliminar = (val) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar la vivienda? ",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(val.IDVIVIENDA);
        Axios.delete(`http://localhost:3001/deleteV/${val.IDVIVIENDA}`)
          .then(() => {
            mostrar();
            limpiar();
            Swal.fire(
              "Eliminado!",
              `La vivienda ${val.IDVIVIENDA} fue eliminada.`,
              "success"
            );
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se ha podido eliminar la vivienda!",
              footer: JSON.parse(JSON.stringify(error)).message,
            });
          });
      }
    });
  };

  const editarVivienda = (val) => {
    setEditar(true);
    setVivienda(val.IDVIVIENDA);
    setMaterial(val.IDMATVIV);
    setCalle(val.CALLE);
    setColonia(val.COLONIA);
    setNumInt(val.NUMEROINT);
    setNumExt(val.NUMEROEXT);
    setCp(val.CODIGOPOSTAL);
    setLocalidad(val.LOCALIDAD);
    setSelectedMunicipio(val.MUNICIPIO);
  };

  const mostrar = () => {
    Axios.get("http://localhost:3001/vivienda").then((response) => {
      setViviendaList(response.data);
    });
  };

  const limpiar = () => {
    setVivienda("");
    setMaterial("");
    setCalle("");
    setColonia("");
    setNumInt("");
    setNumExt("");
    setCp("");
    setLocalidad("");
    setSelectedMunicipio("");
    setEditar(false);
  };

  useEffect(() => {
    mostrar();
    obtenerUltimoIdVivienda();
  }, []);

  const municipiosList = [
    "Abasolo",
    "Acuña",
    "Allende",
    "Arteaga",
    "Candela",
    "Castaños",
    "Cuatro Ciénegas",
    "Escobedo",
    "Francisco I. Madero",
    "Frontera",
    "General Cepeda",
    "Guerrero",
    "Hidalgo",
    "Jiménez",
    "Juárez",
    "Lamadrid",
    "Matamoros",
    "Monclova",
    "Morelos",
    "Múzquiz",
    "Nadadores",
    "Nava",
    "Ocampo",
    "Parras",
    "Piedras Negras",
    "Progreso",
    "Ramos Arizpe",
    "Sabinas",
    "Sacramento",
    "Saltillo",
    "San Buenaventura",
    "San Juan de Sabinas",
    "San Pedro",
    "Sierra Mojada",
    "Torreón",
    "Viesca",
    "Villa Unión",
    "Zaragoza",
  ];

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h1>VIVIENDAS</h1>
          <img
            id="icono"
            src={casa}
            alt="Vivienda"
            className="img-fluid mb-4"
          />
        </div>
        <div className="card-body">
          <NavBar />
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Id Vivienda:
            </span>
            <input
              onChange={handleIdViviendaChange}
              type="text"
              className="form-control"
              value={idVivienda}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <label htmlFor="material" className="input-group-text">
              Material Vivienda:
            </label>
            <select
              id="material"
              className="form-select"
              value={material}
              onChange={(event) => {
                setMaterial(event.target.value);
              }}
            >
              <option value="">Seleccione el material de la vivienda...</option>
              {materialViviendaList.map((material) => (
                <option key={material.IDMATVIV} value={material.IDMATVIV}>
                  {material.TIPOMATERIAL}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Calle:
            </span>
            <input
              onChange={(event) => {
                setCalle(event.target.value);
              }}
              type="text"
              className="form-control"
              value={calle}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Colonia:
            </span>
            <input
              onChange={(event) => {
                setColonia(event.target.value);
              }}
              type="text"
              className="form-control"
              value={colonia}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Numero Interior:
            </span>
            <input
              onChange={(event) => {
                setNumInt(event.target.value);
              }}
              type="text"
              className="form-control"
              value={numInt}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Numero Exterior:
            </span>
            <input
              onChange={(event) => {
                // Verifica si el valor ingresado es un número entero
                const value = event.target.value;
                if (/^\d*$/.test(value) || value === "") {
                  setNumExt(value);
                }
              }}
              type="text"
              className="form-control"
              value={numExt}
              aria-label="Número Exterior"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Codigo Postal:
            </span>
            <input
              onChange={(event) => {
                // Verifica si el valor ingresado es un número entero
                const value = event.target.value;
                if (/^\d*$/.test(value) || value === "") {
                  setCp(value);
                }
              }}
              type="text"
              className="form-control"
              value={cp}
              aria-label="Código Postal"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <label htmlFor="selectedMunicipio" className="input-group-text">
              Municipio:
            </label>
            <select
              id="municipality"
              className="form-select"
              value={selectedMunicipio}
              onChange={handleMunicipioChange}
            >
              <option value="">Seleccione un municipio...</option>
              {municipiosList.map((municipio, index) => (
                <option key={index} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="selectedLocalidad" className="input-group-text">
              Localidad:
            </label>
            <select
              id="locality"
              className="form-select"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            >
              <option value="">Seleccione una localidad...</option>
              {municipioLocalidades[selectedMunicipio] &&
                municipioLocalidades[selectedMunicipio].map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {}
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                {" "}
                Actualizar{" "}
              </button>
              <button className="btn btn-danger m-2" onClick={limpiar}>
                {" "}
                Cancelar{" "}
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={registrar}>
              {" "}
              Registrar{" "}
            </button>
          )}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/OcupacionVivienda")}
        >
          OcupacionVivienda
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Material</th>
            <th scope="col">Calle</th>
            <th scope="col">Colonia</th>
            <th scope="col"># Interior</th>
            <th scope="col"># Exterior</th>
            <th scope="col">Codigo Postal</th>
            <th scope="col">Localidad</th>
            <th scope="col">Municipio</th>
          </tr>
        </thead>
        <tbody>
          {viviendaList.map((val, key) => {
            return (
              <tr key={val.IDVIVIENDA}>
                <th>{val.IDVIVIENDA}</th>
                <td>{val.IDMATVIV}</td>
                <td>{val.CALLE}</td>
                <td>{val.COLONIA}</td>
                <td>{val.NUMEROINT}</td>
                <td>{val.NUMEROEXT}</td>
                <td>{val.CODIGOPOSTAL}</td>
                <td>{val.LOCALIDAD}</td>
                <td>{val.MUNICIPIO}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarVivienda(val);
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

export default Vivienda;
