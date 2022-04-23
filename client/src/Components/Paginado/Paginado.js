import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {clearRecetas, getPages, setPage} from '../../Actions/Actions'
import s from './Paginado.module.css'
import { Link } from 'react-router-dom';



export default function Paginado(props) {
  var recetas = useSelector(state => state.recetas);
  var pagina = useSelector(state => state.pagina);
  var recetasPorPagina = useSelector(state => state.recetasPorPagina);
  var paginasTotales = useSelector(state => state.paginasTotales);

  const dispatch = useDispatch();

  useEffect(() => {
    if(typeof(recetas[0]) !== "string"){
      dispatch(getPages(Math.ceil(recetas.length/recetasPorPagina)))
    }
  }, [dispatch, recetas]);

  var pagestags = [];
  for(let i=1; i<=paginasTotales; i++){
    pagestags.push(<input type='button' className={`${pagina===i ? s.paginaactual : s.pagina}`} value={i} onClick={() => { dispatch(setPage(i))}}/>
    )
  }
 
 
  return (
    <div className={s.paginas}>
      {pagina!==1 ? <input type='button' className={s.pagina} value='<< Prev' onClick={() => { dispatch(setPage(pagina-1))}}/> : null }
      {pagestags}
      {pagina!==paginasTotales && paginasTotales!== 0 ? <input type='button' className={s.pagina} value='Next >>' onClick={() => { dispatch(setPage(pagina+1))}}/> : null }
    </div>
  )
};