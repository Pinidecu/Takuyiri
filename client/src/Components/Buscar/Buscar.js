import { Link } from 'react-router-dom';
import s from './Buscar.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {buscarRecetas, getBusqueda, clearRecetas,clearAllRecetas, resetPaginacion} from '../../Actions/Actions'

export default function Buscar() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  
  const onSubmit = function (e){
    e.preventDefault(); 
    dispatch(clearRecetas());
    dispatch(clearAllRecetas());
    dispatch(resetPaginacion());
    dispatch(getBusqueda(input))
    setInput('')
  }
  

  return (
    <form onSubmit={onSubmit} className={s.buscador}>
        <input 
          type="text" 
          placeholder="Receta..." 
          value= {input}
          onChange={(e) => setInput(e.target.value)} 
          className={s.input}
        />
        <input type='submit' value='Buscar' className={s.buscar}/>
    </form>
  )
};

