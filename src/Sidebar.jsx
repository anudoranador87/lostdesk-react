import { useContext } from "react";
import { RoleContext } from "./RoleContext";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const { rol, logOut } = useContext(RoleContext);

  const menu = [
    {
      label: "Dashboard",
      path: "/",
      roles: ["recepcion", "housekeeping", "management"]
    },
    {
      label: "Panel",
      path: "//Panel",
      roles: ["management"]
    },
    {
      label: "Inventario",
      path: "/inventario",
      roles: ["recepcion", "housekeeping", "management"]
    },
    {
      label: "Historial",
      path: "/historial",
      roles: ["management"]
    },
    {
      label: "Usuarios",
      path: "/usuarios",
      roles: ["management"]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h2>Hotel Panel</h2>

        <nav>
          {menu
            .filter(item => item.roles.includes(rol))
            .map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className="sidebar-link"
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <span className="sidebar-role">{rol}</span>

        <button className="logout-btn" onClick={logOut}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;