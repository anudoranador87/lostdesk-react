import { useEffect, useReducer, useState, useContext } from "react"
import { supabase } from '../lib/supabase'
import { ToastContext } from '../context/ToastContext'

function reducer(state, action) {
  switch(action.type) {
    case "ADD_ITEM":
      return [...state, action.payload] 
    case "DELETE_ITEM":
      return state.filter(item => item.id !== action.payload) 
    case "UPDATE_STATUS":
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload } 
          : item
      )
    case "LOAD_ITEMS": 
      return action.payload
    default:
      return state
  }
}

export function useLostItems(){
  const [state, dispatch] = useReducer(reducer, [])
  const [spinner, setSpinner] = useState(true)
  const { addToast } = useContext(ToastContext)

  useEffect(() => {
    async function cargarItems() {
      try {
        const { data, error } = await supabase.from('objetos').select('*');
        if (error) {
          console.error(error);
          addToast("Error al cargar los objetos", "error");
        } else {
          dispatch({ type: "LOAD_ITEMS", payload: data });
        }
      } catch (err) {
        console.error(err);
        addToast("Error de conexión al cargar", "error");
      } finally {
        setSpinner(false)
      }
    } 
    cargarItems();
  }, []); 
     
  async function handleAddItem(nuevoItem){
    try {
      const { data, error } = await supabase.from('objetos').insert(nuevoItem).select()
      if (error) {
        console.error(error);
        addToast("Error al registrar el objeto", "error");
      } else {
        dispatch({ type: "ADD_ITEM", payload: data[0] })
        const history = { 
          nombre_objeto: data[0].nombre,
          habitacion: data[0].habitacion,
          rol: data[0].registrado_por,
          accion: "registrado",
          estado_nuevo: data[0].estado,
        }
        await supabase.from('historial').insert(history)
        addToast("Objeto registrado correctamente", "success");
      }
    } catch (err) {
      console.error(err);
      addToast("Error de conexión al registrar", "error");
    }
  } 

  async function handleDeleteItem(id, item){  
    try {
      const { data, error } = await supabase.from('objetos').delete().eq('id', id)  
      if (error) {
        console.error(error);
        addToast("Error al eliminar el objeto", "error");
      } else {
        dispatch({ type: "DELETE_ITEM", payload: id }); 
        const history = { 
          nombre_objeto: item.nombre,
          habitacion: item.habitacion,
          rol: item.registrado_por,
          accion: "eliminado",
          estado_nuevo: item.estado,
        }
        await supabase.from('historial').insert(history)
        addToast("Objeto eliminado", "success");
      }
    } catch (err) {
      console.error(err);
      addToast("Error de conexión al eliminar", "error");
    }
  } 

  async function handleNuevoEstado(id, nuevoEstado, item, datosReclamacion = null) {
    try {
      const updateData = { estado: nuevoEstado };
  
      if (nuevoEstado === "reclamado" && datosReclamacion) {
        updateData.reclamado_por = datosReclamacion.reclamado_por;
        updateData.email_cliente = datosReclamacion.email_cliente;
        updateData.booking_cliente = datosReclamacion.booking_cliente;
      } 
      else if (nuevoEstado === "pendiente") {
        updateData.reclamado_por = null;
        updateData.email_cliente = null;
        updateData.booking_cliente = null;
      }
  
      const { data, error } = await supabase
        .from('objetos')
        .update(updateData)
        .eq('id', id);
  
      if (error) {
        console.error(error);
        addToast("Error al actualizar el estado", "error");
        return; 
      }
  
      dispatch({ 
        type: "UPDATE_STATUS", 
        payload: { 
          id, 
          estado: nuevoEstado,
          ...(nuevoEstado === "reclamado" && datosReclamacion ? datosReclamacion : {
            reclamado_por: null,
            email_cliente: null,
            booking_cliente: null
          })
        } 
      });
  
      const history = { 
        nombre_objeto: item.nombre,
        habitacion: item.habitacion,
        rol: item.registradoPor || "management", 
        accion: "estado cambiado",
        estado_nuevo: nuevoEstado
      };
  
      await supabase.from('historial').insert(history);
      addToast("Estado actualizado", "success");
  
    } catch (err) {
      console.error("Error en handleNuevoEstado:", err);
      addToast("Error de conexión al actualizar", "error");
    }
  }

  return { state, dispatch, handleAddItem, handleDeleteItem, handleNuevoEstado, spinner }
}