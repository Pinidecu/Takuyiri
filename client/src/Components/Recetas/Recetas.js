import React, { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {getRecetas, getDiets, clearRecetas, resetPaginacion} from '../../Actions/Actions'
import Receta from '../Receta/Receta';
import s from './Recetas.module.css'
import { Link, Redirect } from 'react-router-dom';
import Filtro from '../Filter/Filter'
import Orden from '../Orden/Orden'
import Paginado from '../Paginado/Paginado'
import Buscar from '../Buscar/Buscar'


export default function Recetas() {
  var recetas = useSelector(state => state.recetas);
  var allrecetas = useSelector(state => state.allrecetas);

  var pagina = useSelector(state => state.pagina);
  var recetasPorPagina = useSelector(state => state.recetasPorPagina);

  const dispatch = useDispatch();
 
  const [mensaje, setMensaje] = useState("");

  
  useEffect(() => {
    dispatch(getRecetas());
    dispatch(getDiets());

    return () => {
      dispatch(clearRecetas());
      dispatch(resetPaginacion());
  };
  }, [dispatch]);

  useEffect(() => {
    if (typeof(allrecetas[0]) === "string") {
      setMensaje(allrecetas[0])
    } else {
      setMensaje("Cargando...")
    }
}, [allrecetas]);

console.log(mensaje)
  var y;
  var z;

  y = pagina*recetasPorPagina-recetasPorPagina;
  z = pagina*recetasPorPagina;
  
  var pagerender = recetas.slice(y,z);
  console.log(recetas)

  
  return (
    <div className={s.container}>
      <Route exact path="/home/" component={Buscar} />
      <div className={s.filtros}>
        <Route exact path="/home/" component={Filtro} />
        <Route exact path="/home/" component={Orden} />
      </div>
      <Route exact path="/home/" className={s.paginas} component={Paginado} />
      <div className={s.recetas}>
        
        {pagerender.length>0 && typeof(pagerender[0]) !== 'string' ? 
        pagerender.map(function (r) {
          return(
            <Receta 
            titulo= {r.title}
            img={r.image}
            dietas={r.diets}
            puntuacion={r.spoonacularScore}
            id = {r.id}
            key = {r.id}
            receta = {r}
            />
            )  
          })
          :
          <p>{mensaje}</p>
        }
      </div>
      <Route exact path="/home/" component={Paginado} />
    </div>
  )
};