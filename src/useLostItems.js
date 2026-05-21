import{useEffect, useReducer, useState} from "react"
import { supabase } from './supabase'

  


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
    const [state, dispatch] = useReducer(reducer, [])
    const[spinner, setSpinner] = useState(true)
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
        finally{
          setSpinner(false)
        }
      } 
      cargarItems();
    }, []); // El array vacío está perfecto para que solo se ejecute al montar el componente
       
    async  function handleAddItem(nuevoItem){
      console.log(nuevoItem)
      try {
        const { data, error } = await supabase.from('objetos').insert(nuevoItem).select()
        
        if (error) {
          console.error(error);
          
        } else {
          dispatch({ type: "ADD_ITEM", payload: data[0] })
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

return { state, dispatch, handleAddItem, handleDeleteItem, handleNuevoEstado, spinner }

  }