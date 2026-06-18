import React from 'react';
import './Usuarios.css';

const usuariosData = [
  {
    email: 'recepcion@lostdesk.com',
    rol: 'Recepción',
    permisos: ['Ver objetos', 'Registrar objetos', 'Cambiar estado'],
    color: '#f59e0b',
  },
  {
    email: 'housekeeping@lostdesk.com',
    rol: 'Housekeeping',
    permisos: ['Ver objetos', 'Cambiar estado'],
    color: '#3b82f6',
  },
  {
    email: 'management@lostdesk.com',
    rol: 'Management',
    permisos: ['Ver objetos', 'Registrar objetos', 'Cambiar estado', 'Eliminar objetos', 'Ver historial', 'Ver panel de estadísticas', 'Gestionar usuarios'],
    color: '#10b981',
  },
  {
    email: '—',
    rol: 'Invitado',
    permisos: ['Ver objetos (solo lectura)'],
    color: '#94a3b8',
  },
];

export default function Usuarios() {
  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h2>Gestión de Usuarios y Roles</h2>
        <p className="usuarios-subtitle">Roles configurados en el sistema LostDesk</p>
      </div>

      <div className="usuarios-grid">
        {usuariosData.map((user) => (
          <div key={user.rol} className="usuario-card">
            <div className="usuario-card-top" style={{ borderColor: user.color }}>
              <div className="usuario-avatar" style={{ backgroundColor: user.color }}>
                {user.rol.charAt(0).toUpperCase()}
              </div>
              <div className="usuario-info">
                <h3>{user.rol}</h3>
                <span className="usuario-email">{user.email}</span>
              </div>
            </div>

            <div className="usuario-permisos">
              <span className="permisos-title">Permisos</span>
              <ul>
                {user.permisos.map((permiso) => (
                  <li key={permiso}>
                    <span className="permiso-check" style={{ color: user.color }}>✓</span>
                    {permiso}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
