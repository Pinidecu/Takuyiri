import { GET_RECETAS, CLEAR_RECETAS, CLEAR_ALL_RECETAS, CLEAR_DETALLE, GET_API_DETALLE, GET_DB_DETALLE, GET_BUSQUEDA, GET_DIETS, FILTER, ORDENAR_RECETAS, SET_PAGE, GET_PAGES, RESET_PAGINACION } from '../Actions/Actions'

const initialState = {
  allrecetas: [],
  recetas: [],
  detalle:{},
  dietas: [],
  pagina: 1,
  recetasPorPagina: 10,
  paginasTotales: 0
};

//En nuestro estado guardamos todas las recetas.
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_RECETAS:
        return {
          ...state,
          recetas: action.payload,
          allrecetas: action.payload
        }
    case CLEAR_RECETAS:
      return {
          ...state,
          recetas: []
      }
    case CLEAR_ALL_RECETAS:
    return {
        ...state,
        allrecetas: []
    }
    case CLEAR_DETALLE:
    return {
        ...state,
        detalle: {}
    }
    case GET_API_DETALLE:
      return {
        ...state,
        detalle: action.payload
      }
    case GET_DB_DETALLE:
      return {
        ...state,
        detalle: action.payload
      }
    case GET_BUSQUEDA:
      return {
        ...state,
        allrecetas: action.payload,
        recetas: action.payload
      }
    case GET_DIETS:
      return {
        ...state,
        dietas: action.payload
      }
    case ORDENAR_RECETAS:
      return {
        ...state,
        recetas: action.payload
    }
    case FILTER:
      return {
        ...state,
        recetas: action.payload
    }
    case SET_PAGE:
      return {
        ...state,
        pagina: action.payload
    }
    case GET_PAGES:
      return {
        ...state,
        paginasTotales: action.payload
    }
    case RESET_PAGINACION:
      return {
        ...state,
        pagina: 1,
        paginasTotales: 0
    }
    default: return state      
  }
}

export default reducer;