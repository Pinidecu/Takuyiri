import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {clearRecetas, filtrarRecetas, getDiets, getRecetas, resetPaginacion} from '../../Actions/Actions'
import s from './Filter.module.css'

export default function Filtro() {
  var allrecetas = useSelector(state => state.allrecetas);
  var dietas = useSelector(state => state.dietas);

  const dispatch = useDispatch();

  
  
  const [filtro, setFiltro] = useState('');

  const filtrar = function (nombreDieta){
    dispatch(filtrarRecetas(allrecetas.filter(r => r.diets.includes(nombreDieta))))
  }

  
  
  useEffect(() => {
    dispatch(clearRecetas());
    dispatch(resetPaginacion());

    if(filtro==='Todas'){dispatch(filtrarRecetas(allrecetas))}
    else {filtrar(filtro)}
  }, [dispatch, filtro]);




  const filtrado = function (e){
    setFiltro(e.target.value);
  }

  var ld = [];
  //dietas.forEach(d=> ld.push(d.nombre.toLowerCase().replace('-', ' ')))
  console.log('aaaaaaaaaa', allrecetas)
  if(typeof(allrecetas[0]) !== "string"){
    allrecetas.forEach(r=>{
      r.diets.forEach(d =>{
        if(!ld.includes(d)){
          ld.push(d)
        }
      })
    })
  }
    

  
  return (
    <form className={s.filter}>
        <p>Filtrar por dieta:</p> 
        <select className={s.opciones} name="dieta" onChange={filtrado}>
          <option value='Todas'>Todas</option>
          {ld.map(function (d){
            return(
              <option value={d}>{d}</option>
            )
          })}
        </select>
    </form>
  )
};