import { useState, useContext } from "react";
import { RoleContext } from "./RoleContext";
import { supabase } from "./supabase";
import "./ItemForm.css";

function ItemForm({ onAddItem, onClose }) {

  // ---------------- ESTADOS ----------------

  const [nombre, setNombre] = useState("");
  const [hab, setHab] = useState("");
  const [date, setDate] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [comentario, setComentario] = useState("");
  const [foto, setFoto] = useState(null);

  // ---------------- CONTEXT ----------------

  const { rol } = useContext(RoleContext);

  // ---------------- SUBMIT ----------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    let foto_url = null;

    try {

      // SI HAY FOTO → subirla
      if (foto) {

        const nombreArchivo = `${Date.now()}_${foto.name}`;

        const { error: uploadError } = await supabase.storage
          .from("fotos-objetos")
          .upload(nombreArchivo, foto);

        if (uploadError) {
          console.error(uploadError);
          alert("Error subiendo la imagen");
          return;
        }

        const { data: urlData } = supabase.storage
          .from("fotos-objetos")
          .getPublicUrl(nombreArchivo);

        foto_url = urlData.publicUrl;
      }

      // CREAR OBJETO
      const nuevoItem = {
        registrado_por: rol,
        nombre,
        habitacion: hab,
        estado,
        fecha: date,
        comentario,
        foto_url,
      };

      // INSERTAR EN SUPABASE
      await onAddItem(nuevoItem);

      // CERRAR MODAL
      onClose();

    } catch (error) {

      console.error(error);
      alert("Error al registrar el objeto");

    }
  };

  // ---------------- JSX ----------------

  return (
    <div className="form-overlay">

      <div className="form-card">

        {/* HEADER */}
        <div className="form-header">

          <h2>Nuevo Registro</h2>

          <button
            type="button"
            className="close-x-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* FORM */}
        <form
          className="form-content"
          onSubmit={handleSubmit}
        >

          {/* NOMBRE */}
          <div className="input-box">

            <label>Nombre del Objeto</label>

            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

          </div>

          {/* UBICACION */}
          <div className="input-box">

            <label>Ubicación</label>

            <input
              type="text"
              value={hab}
              onChange={(e) => setHab(e.target.value)}
              required
            />

          </div>

          {/* OBSERVACIONES */}
          <div className="input-box">

            <label>Observaciones</label>

            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows="2"
            />

          </div>

          {/* FECHA */}
          <div className="input-box">

            <label>Fecha</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

          </div>

          {/* ESTADO */}
          <div className="input-box">

            <label>Estado Inicial</label>

            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="pendiente">
                Pendiente
              </option>

              <option value="reclamado">
                Reclamado
              </option>

              <option value="entregado">
                Entregado
              </option>

            </select>

          </div>

          {/* FOTO */}
          <div className="input-box">

            <label>Foto del objeto (opcional)</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFoto(e.target.files[0])
              }
            />

          </div>

          {/* BOTON */}
          <button
            type="submit"
            className="submit-form-btn"
          >
            Confirmar Registro
          </button>

        </form>

      </div>
    </div>
  );
}

export default ItemForm;