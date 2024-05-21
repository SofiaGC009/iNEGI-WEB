import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Axios from 'axios';

function Dashboard() {
  const [localidadesData, setLocalidadesData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/viviendasPorLocalidad")
      .then(response => {
        const data = response.data;
        setLocalidadesData(data);
        renderLocalidadesChart(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderLocalidadesChart = (data) => {
    const ctx = document.getElementById('localidadesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.localidad),
        datasets: [{
          label: 'Número de viviendas',
          data: data.map(item => item.numeroViviendas),
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color de fondo de las barras
          borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Iniciar el eje y en cero
          }
        }
      }
    });
  };

  return (
    <div>
      <div>
        <h2>Número de viviendas en cada localidad</h2>
        <canvas id="localidadesChart"></canvas>
      </div>
    </div>
  );
}

export default Dashboard;
