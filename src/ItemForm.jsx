import { useState, useContext } from "react";
import { RoleContext } from "./RoleContext";
import { ToastContext } from "./ToastContext";
import { supabase } from "./supabase";
import "./ItemForm.css";

function ItemForm({ onAddItem, onClose }) {

  const [nombre, setNombre] = useState("");
  const [hab, setHab] = useState("");
  const [date, setDate] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [comentario, setComentario] = useState("");
  const [foto, setFoto] = useState(null);
  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { rol } = useContext(RoleContext);
  const { addToast } = useContext(ToastContext);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido";
    }
    if (!hab.trim()) {
      nuevosErrores.hab = "La ubicación es requerida";
    }
    if (!date) {
      nuevosErrores.date = "La fecha es requerida";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setIsSubmitting(true);
    let foto_url = null;

    try {
      if (foto) {
        const nombreArchivo = `${Date.now()}_${foto.name}`;

        const { error: uploadError } = await supabase.storage
          .from("fotos-objetos")
          .upload(nombreArchivo, foto);

        if (uploadError) {
          console.error(uploadError);
          setErrores({ general: "Error subiendo la imagen" });
          setIsSubmitting(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from("fotos-objetos")
          .getPublicUrl(nombreArchivo);

        foto_url = urlData.publicUrl;
      }

      const nuevoItem = {
        registrado_por: rol,
        nombre: nombre.trim(),
        habitacion: hab.trim(),
        estado,
        fecha: date,
        comentario: comentario.trim(),
        foto_url,
      };

      await onAddItem(nuevoItem);
      addToast("Objeto registrado exitosamente", "success", 3000);
      onClose();

    } catch (error) {
      console.error(error);
      addToast("Error al registrar el objeto", "error", 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-overlay" role="dialog" aria-modal="true" aria-labelledby="form-title">

      <div className="form-card">

        <div className="form-header">
          <h2 id="form-title">Nuevo Registro</h2>
          <button
            type="button"
            className="close-x-btn"
            onClick={onClose}
            aria-label="Cerrar formulario"
          >
            ✕
          </button>
        </div>

        {errores.general && (
          <div className="form-error-general" role="alert">
            {errores.general}
          </div>
        )}

        <form className="form-content" onSubmit={handleSubmit}>

          <div className="input-box">
            <label htmlFor="nombre">Nombre del Objeto *</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              aria-label="Nombre del objeto"
              aria-invalid={!!errores.nombre}
              aria-describedby={errores.nombre ? "error-nombre" : undefined}
            />
            {errores.nombre && (
              <span id="error-nombre" className="input-error">{errores.nombre}</span>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="ubicacion">Ubicación *</label>
            <input
              id="ubicacion"
              type="text"
              value={hab}
              onChange={(e) => setHab(e.target.value)}
              aria-label="Ubicación del objeto"
              aria-invalid={!!errores.hab}
              aria-describedby={errores.hab ? "error-hab" : undefined}
            />
            {errores.hab && (
              <span id="error-hab" className="input-error">{errores.hab}</span>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows="2"
              aria-label="Observaciones"
            />
          </div>

          <div className="input-box">
            <label htmlFor="fecha">Fecha *</label>
            <input
              id="fecha"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Fecha del registro"
              aria-invalid={!!errores.date}
              aria-describedby={errores.date ? "error-date" : undefined}
            />
            {errores.date && (
              <span id="error-date" className="input-error">{errores.date}</span>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="estado">Estado Inicial</label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              aria-label="Estado inicial del objeto"
            >
              <option value="pendiente">Pendiente</option>
              <option value="reclamado">Reclamado</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="foto">Foto del objeto (opcional)</label>
            <input
              id="foto"
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              aria-label="Foto del objeto"
            />
          </div>

          <button
            type="submit"
            className="submit-form-btn"
            disabled={isSubmitting}
            aria-label="Confirmar registro del objeto"
          >
            {isSubmitting ? "Registrando..." : "Confirmar Registro"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ItemForm;