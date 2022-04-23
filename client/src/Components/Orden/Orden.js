import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ordenar, clearRecetas, setPage} from '../../Actions/Actions'
import s from './Orden.module.css'


export default function Orden() {
  var recetas = useSelector(state => state.recetas);
  const dispatch = useDispatch();
  
  const [orden, setOrden] = useState('');

  
  const filtrado = function (e){
    setOrden(e.target.value);
  }
  
  useEffect(() => {
    dispatch(clearRecetas());
    dispatch(setPage(1));
    
    if(orden==='az'){
        dispatch(ordenar(recetas.sort(function (a, b) {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        })));
    }else if(orden==='za'){
        dispatch(ordenar(recetas.sort(function (a, b) {
            if (a.title < b.title) {
                return 1;
            }
            if (a.title > b.title) {
                return -1;
            }
            return 0;
        })));
    }else if(orden==='p-'){
        dispatch(ordenar(recetas.sort(function (a, b) {
            if (a.spoonacularScore > b.spoonacularScore) {
                return 1;
            }
            if (a.spoonacularScore < b.spoonacularScore) {
                return -1;
            }
            return 0;
        })));
    }else if(orden==='p+'){
        dispatch(ordenar(recetas.sort(function (a, b) {
            if (a.spoonacularScore < b.spoonacularScore) {
                return 1;
            }
            if (a.spoonacularScore > b.spoonacularScore) {
                return -1;
            }
            return 0;
        })))}
        else if(orden==='hs+'){
            dispatch(ordenar(recetas.sort(function (a, b) {
                if (a.healthScore > b.healthScore) {
                    return 1;
                }
                if (a.healthScore < b.healthScore) {
                    return -1;
                }
                return 0;
            })));
    }else{
        dispatch(ordenar(recetas))
        }
    }, [dispatch, orden, recetas]);
  
  
  return (
    <form className={s.orden}>
        <p>Ordenar por:</p>
        <div className={s.opciones}>
            <input type="radio" name="orden" value="az" id="az" onChange={filtrado} /><label htmlFor='az'>AZ</label>
            <input type="radio" name="orden" value="za" id="za" onChange={filtrado}/><label htmlFor='za'>ZA</label>
            <input type="radio" name="orden" value="p-" id="p-" onChange={filtrado}/><label htmlFor='p-'>P-</label>
            <input type="radio" name="orden" value="p+" id="p+" onChange={filtrado}/><label htmlFor='p+'>P+</label>
            <input type="radio" name="orden" value="hs+" id="hs+" onChange={filtrado}/><label htmlFor='hs+'>Hs+</label>

        </div>
    </form>
  )
};