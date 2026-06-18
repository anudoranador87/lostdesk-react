import React, { useMemo } from 'react';
import { useLostItems } from '../hooks/useLostItems';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Panel.css';

const COLORS = ['#FFBB28', '#00C49F', '#0088FE'];

export default function Panel() {
  const { state: items, spinner } = useLostItems();

  const dataPorEstado = useMemo(() => {
    const counts = { pendiente: 0, reclamado: 0, entregado: 0 };
    items.forEach(item => {
      if (counts[item.estado] !== undefined) {
        counts[item.estado]++;
      }
    });
    return [
      { name: 'Pendiente', value: counts.pendiente },
      { name: 'Reclamado', value: counts.reclamado },
      { name: 'Entregado', value: counts.entregado }
    ];
  }, [items]);

  const dataPorHabitacion = useMemo(() => {
    const counts = {};
    items.forEach(item => {
      const room = item.habitacion || 'Desconocida';
      counts[room] = (counts[room] || 0) + 1;
    });
    return Object.keys(counts).map(room => ({
      name: room,
      cantidad: counts[room]
    })).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5); // top 5
  }, [items]);

  const porcentajeEntregado = useMemo(() => {
    if (items.length === 0) return 0;
    const entregados = items.filter(i => i.estado === 'entregado').length;
    return Math.round((entregados / items.length) * 100);
  }, [items]);

  if (spinner) {
    return <div style={{ padding: '20px' }}>Cargando datos del dashboard...</div>;
  }

  return (
    <div className="dashboard-panel">
      <h1>Dashboard de Management</h1>
      
      <div className="kpi-container">
        <div className="kpi-card">
          <h3>Total de Objetos Registrados</h3>
          <p className="kpi-value">{items.length}</p>
        </div>
        <div className="kpi-card">
          <h3>Tasa de Devolución</h3>
          <p className="kpi-value">{porcentajeEntregado}%</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>Objetos por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPorEstado}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {dataPorEstado.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h3>Top 5 Habitaciones con más objetos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dataPorHabitacion}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
