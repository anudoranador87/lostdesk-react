import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./PublicObjeto.css";

interface Objeto {
  id: string;
  nombre: string;
  habitacion: string;
  fecha: string;
  estado: "pendiente" | "reclamado" | "entregado";
  comentario?: string;
  foto_url?: string;
}

export default function PublicObjeto() {
  const { id } = useParams<{ id: string }>();
  const [objeto, setObjeto] = useState<Objeto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchObjeto() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from("objetos")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setError("No se pudo encontrar el objeto o el identificador no es válido.");
          console.error(error);
        } else {
          setObjeto(data);
        }
      } catch (err) {
        setError("Error de conexión al cargar la información.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    }

    fetchObjeto();
  }, [id]);

  if (cargando) {
    return (
      <div className="public-wrapper">
        <div className="public-loading">
          <div className="loading-spinner"></div>
          <p>Cargando información del objeto...</p>
        </div>
      </div>
    );
  }

  if (error || !objeto) {
    return (
      <div className="public-wrapper">
        <div className="public-card error-card">
          <h2>⚠️ Objeto no encontrado</h2>
          <p>{error || "El objeto solicitado no existe en nuestro sistema."}</p>
          <div className="public-help">
            <p>Si cree que esto es un error, por favor póngase en contacto con el hotel directamente proporcionando los detalles de su estancia.</p>
          </div>
        </div>
      </div>
    );
  }

  // Textos y badges personalizados según el estado
  const estadoConfig = {
    pendiente: {
      titulo: "Custodiado en Hotel",
      desc: "Tu objeto ha sido localizado y está guardado de forma segura en nuestra oficina de objetos perdidos. Ponte en contacto con recepción para gestionar su reclamación y devolución.",
      color: "#f59e0b",
      badgeClass: "badge-pendiente"
    },
    reclamado: {
      titulo: "Reclamado y en Proceso",
      desc: "Hemos registrado tu reclamación para este objeto. Nuestro equipo está validando los datos de reserva o coordinando la entrega/envío.",
      color: "#3b82f6",
      badgeClass: "badge-reclamado"
    },
    entregado: {
      titulo: "Entregado con Éxito",
      desc: "Este objeto ya ha sido entregado a su propietario. Agradecemos su confianza en nuestro servicio.",
      color: "#10b981",
      badgeClass: "badge-entregado"
    }
  };

  const config = estadoConfig[objeto.estado] || estadoConfig.pendiente;

  return (
    <div className="public-wrapper">
      <div className="public-card">
        <div className="public-card-header">
          <span className="hotel-tag">LOSTDESK • SERVICIO AL HUÉSPED</span>
          <h1>Seguimiento de Objeto Perdido</h1>
          <p className="item-id-tag">ID de Seguimiento: <code>{objeto.id}</code></p>
        </div>

        <div className="public-card-body">
          {objeto.foto_url && (
            <div className="public-image-container">
              <img src={objeto.foto_url} alt={objeto.nombre} className="public-item-image" />
            </div>
          )}

          <div className="status-banner" style={{ borderColor: config.color }}>
            <div className={`status-badge ${config.badgeClass}`}>
              {objeto.estado.toUpperCase()}
            </div>
            <h3>{config.titulo}</h3>
            <p>{config.desc}</p>
          </div>

          <div className="public-details-grid">
            <div className="detail-item">
              <span className="detail-label">Artículo</span>
              <span className="detail-value">{objeto.nombre}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Fecha de Hallazgo</span>
              <span className="detail-value">{new Date(objeto.fecha).toLocaleDateString()}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Ubicación del Registro</span>
              <span className="detail-value">Habitación / Zona {objeto.habitacion}</span>
            </div>

            {objeto.comentario && (
              <div className="detail-item full-width">
                <span className="detail-label">Detalles / Notas del Personal</span>
                <span className="detail-value note-value">{objeto.comentario}</span>
              </div>
            )}
          </div>
        </div>

        <div className="public-card-footer">
          <p>¿Necesitas ayuda con esta devolución?</p>
          <div className="footer-actions">
            <a href="mailto:soporte@hotel.com" className="btn-contact">✉️ Contactar Recepción</a>
          </div>
        </div>
      </div>
    </div>
  );
}
