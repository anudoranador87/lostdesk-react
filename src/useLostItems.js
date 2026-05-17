import{useEffect, useReducer} from "react"
import { supabase } from './supabase'
const estadoInicial = [
    {id: 1, nombre: "Paraguas azul", habitacion: "105", estado: "pendiente", fecha: "21/04/2026", registradoPor:"recepcion"},
    {id: 2, nombre: "Gafas de sol", habitacion: "202", estado: "reclamado", fecha: "20/01/2026", registradoPor:"recepcion"},
    {id: 3, nombre: "Manta termica", habitacion: "101", estado: "entregado", fecha: "29/04/2026", registradoPor:"recepcion"}
  ]

  


  function reducer(state, action) {
    switch(action.type) {
      case "ADD_ITEM":
        return [...state, action.payload] // devuelve array nuevo con el item añadido
      case "DELETE_ITEM":
        return state.filter(item => item.id !== action.payload) // ese item no está invitado a la fiesta
      case "UPDATE_STATUS":
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, estado: action.payload.estado }
            : item
        )
      case "LOAD_ITEMS": // para cargar desde localStorage al arrancar
        return action.payload
      default:
        return state
    }
  }

//1 vamos a crear un hook reutilizable con toda la logica
export function useLostItems(){
    const [state, dispatch] = useReducer(reducer, estadoInicial)

    useEffect(() => {
      async function cargarItems() {
        try {
          const { data, error } = await supabase.from('objetos').select('*');
          
          if (error) {
            console.error(error);
             
          } else {
            dispatch({ type: "LOAD_ITEMS", payload: data });
          }
        } catch (err) {
          console.error(err);
        }
      } 
      cargarItems();
    }, []); // El array vacío está perfecto para que solo se ejecute al montar el componente
       
    async  function handleAddItem(nuevoItem){
      try {
        const { data, error } = await supabase.from('objetos').insert(nuevoItem)
        
        if (error) {
          console.error(error);
          
        } else {
          dispatch({ type: "ADD_ITEM", payload: data });
          console.log(data)
          
        }
      } catch (err) {
        console.error(err);
      }
    } 
    async function  handleDeleteItem(id){  // recibira un id para borrar
    try {
      const { data, error } = await supabase.from('objetos').delete().eq('id', id)  //borrara el id si es igual y coinciden
      
      if (error) {
        console.error(error);
        
      } else {
        dispatch({ type: "DELETE_ITEM", payload: id }); // en el payload, devuelve el id
        console.log(data)
        
      }
    } catch (err) {
      console.error(err);
    }
  } 
  async function  handleNuevoEstado(id, nuevoEstado) {
    try {
      const { data, error } = await supabase.from('objetos').update({ estado: nuevoEstado }).eq('id', id)  //mira el id, y cambia a nuevo estado
      if (error) {
        console.error(error);

      } else {
        dispatch({ type: "UPDATE_STATUS", payload: { id, estado: nuevoEstado } }); // en el payload, devuelve el id y el nuevo estado
        console.log(data)

      }
    } catch (err) {
      console.error(err);
    }
  }

return { state, dispatch, handleAddItem, handleDeleteItem, handleNuevoEstado }

  }