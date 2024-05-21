import React from "react";
import { useNavigate } from "react-router-dom";
import inegi from "../Images/inegi.png";
import casa from "../Images/casa.jpg";
import personas from "../Images/personas.png";
import mateerial from "../Images/mateerial.png";
import work from "../Images/work.jpg";
import d2 from "../Images/d2.png";

const Menu = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      img: casa,
      alt: "Vivienda",
      text: "Explora datos sobre las viviendas.",
      path: "/vivienda",
    },
    {
      img: personas,
      alt: "Habitante",
      text: "Información sobre los habitantes.",
      path: "/habitante",
    },
    {
      img: mateerial,
      alt: "Material",
      text: "Datos sobre los materiales utilizados.",
      path: "/material",
    },
    {
      img: work,
      alt: "Ocupación",
      text: "Detalles sobre las distintas ocupaciones.",
      path: "/ocupacion",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header bg-dark text-white">
        </div>
        <div className="card-body">
          <img 
            src={inegi} 
            alt="Inegi Logo" 
            className="img-fluid mb-4" 
          />
          <h3>Bienvenido al sistema de registro!</h3>
          <h4>Aqui podras guardar, ver, modificar y eliminar informacion importante de las encuestas realizadas 
            por el INEGI en el Censo de Coahuila</h4>
          <div className="row">
            {cardsData.map((card, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card">
                  <img src={card.img} className="card-img-top" alt={card.alt} />
                  <div className="card-body">
                    <p className="card-text">{card.text}</p>
                    <button 
                      className="btn btn-info" 
                      onClick={() => navigate(card.path)}
                    >
                      {card.alt}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h4 className="mt-4">Aqui podras revisar estadisticas, graficos y tendencias, sobre los datos
          recabados en el Censo.</h4>
          <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
              <img src={d2} className="img-fluid mt-4" alt="Dashboard 2" />
            </div>
          </div>
          <button 
            className="btn btn-info mt-3" 
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
