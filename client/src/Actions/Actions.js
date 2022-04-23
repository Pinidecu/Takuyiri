import axios from 'axios';
/* import { useDispatch } from 'react-redux';
const dispatch = useDispatch(); */

export const GET_RECETAS = 'GetRecetas';
export const CLEAR_RECETAS = 'ClearRecetas';
export const CLEAR_ALL_RECETAS = 'ClearAllRecetas';
export const CLEAR_DETALLE = 'ClearDetalle';
export const GET_API_DETALLE = 'GetAPIDetalle';
export const GET_DB_DETALLE = 'GetDBDetalle';
export const GET_BUSQUEDA = 'GetBusqueda';
export const GET_DIETS = 'GetDiets';
export const FILTER = 'Filter';
export const ORDENAR_RECETAS = 'OrdenarRecetas';
export const SET_PAGE = 'SetPage';
export const GET_PAGES = 'GetPages';
export const RESET_PAGINACION = 'ResetPaginacion';



export function getRecetas (){
    return(dispatch) => {
        axios.get(`/allapirecipes`)
        .then(r =>{
            return r.data.map(d=>{
                if(d.diets.length>0 && d.origen){
                    return {...d, diets: d.diets.map(e=> e.nombre)}
                }else{
                    return d;
                }
            });
            }
        )
        .then(response => {
            dispatch({ type:GET_RECETAS, payload:response});
        })
        .catch (e =>{
            dispatch({ type:GET_RECETAS, payload:['No se encontraron recetas']});
        }
        )
    }
}

export function clearRecetas() {
    return function (dispatch) {
        return dispatch({ type: CLEAR_RECETAS })
    }
}
export function clearAllRecetas() {
    return function (dispatch) {
        return dispatch({ type: CLEAR_ALL_RECETAS })
    }
}

export function clearDetalle() {
    return function (dispatch) {
        return dispatch({ type: CLEAR_DETALLE })
    }
}

export function getAPIDetalle (id){
    console.log('entro')
    return(dispatch) => {
        axios.get(`/recipesapi/${id}`)
        .then(response => {
            dispatch({ type:GET_API_DETALLE, payload:response.data});
        });
    }
}

/* export function getDBDetalle (id){
    return(dispatch) => {
        axios.get(`/recipes/${id}`)
        .then(r =>{
            return {...r.data, diets: r.data.diets.map(e=> e.nombre)}
            })
        .then(response => {
            dispatch({ type:GET_DB_DETALLE, payload:response});
        });
    }
} */

export function getDBDetalle (id){
    return(dispatch) => {
        axios.get(`/recipes/${id}`)
        .then(response => {
            dispatch({ type:GET_DB_DETALLE, payload:response.data});
        });
    }
}


export function getBusqueda (input){
    return(dispatch) => {
        axios.get(`/recipesapi?name=${input}`)
        .then(response => {
            dispatch({ type:GET_BUSQUEDA, payload:response.data});
        })
        .catch (e =>{
            dispatch({ type:GET_RECETAS, payload:['No se encontraron recetas']})
        })
        
    }
}

export function getDiets (){
    return(dispatch) => {
        axios.get(`/types`)
        .then(response => {
            dispatch({ type:GET_DIETS, payload:response.data});
        });
    }
}

export function postRecipe (input){
    return(dispatch) => {
        axios.post(`/recipe`, input)
        .then(response => {
            dispatch({ type:GET_DIETS, payload:response.data});
        });
    }
}


export function filtrarRecetas (recetas) {
    return async function (dispatch) {
        return dispatch({ type: FILTER, payload: recetas })
    }
}

export function ordenar(recetas) {
    return async function (dispatch) {
        return dispatch({ type: ORDENAR_RECETAS, payload: recetas })
    }
}


export function setPage(num) {
    return function (dispatch) {
        return dispatch({ type: SET_PAGE, payload: num })
    }
}

export function getPages(total) {
    return function (dispatch) {
        return dispatch({ type: GET_PAGES, payload: total })
    }
}

export function resetPaginacion() {
    return function (dispatch) {
        return dispatch({ type: RESET_PAGINACION })
    }
}
