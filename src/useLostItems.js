import{useEffect, useReducer} from "react"
const estadoInicial = [
    {id: 1, nombre: "Paraguas azul", habitacion: "105", estado: "pendiente", fecha: "21/04/2026", registradoPor:"recepcion"},
    {id: 2, nombre: "Gafas de sol", habitacion: "202", estado: "reclamado", fecha: "20/01/2026", registradoPor:"recepcion"},
    {id: 3, nombre: "Manta termica", habitacion: "101", estado: "entregado", fecha: "29/04/2026", registradoPor:"recepcion"}
  ]
  function Init(){
    return localStorage.getItem('items')   ? JSON.parse( localStorage.getItem('items')) :  estadoInicial
    }
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
    const [state, dispatch] = useReducer(reducer, estadoInicial, Init)





    
      useEffect(() => {
        // 2. Guardamos en localStorage cuando cambia el array
        localStorage.setItem('items', JSON.stringify(state)) 
      }, [state])
    
      function handleAddItem(nuevoItem) {
        dispatch({ type: "ADD_ITEM", payload: nuevoItem }) 
      }

      return { state, dispatch, handleAddItem }

      //devuelve el estado, el dispatch, y la funcion handle
      // es lo que usara app

      

}