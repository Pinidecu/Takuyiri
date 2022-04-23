import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDiets} from '../../Actions/Actions'
import s from './Nuevareceta.module.css'
import axios from 'axios';
import {getRecetas} from '../../Actions/Actions'
import { useHistory } from 'react-router-dom';



export function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = 'El nombre del plato es requerido';
  }
  if (!input.summary) {
    errors.summary = 'El resumen del plato es requerido';
  } 
  if (!input.spoonacularScore) {
    errors.spoonacularScore = 'La puntuacion es requerida';
  }
  if(input.spoonacularScore>100 || input.puntuacion<0){
    errors.spoonacularScore = 'La puntuacion debe tener un valor de entre 0 y 100';
  }
  if (!input.healthScore) {
    errors.healthScore = 'El nivel de comida saludable es requerido';
  }
  if(input.healthScore>100 || input.ncs<0){
    errors.healthScore = 'El nivel de comida saludable debe tener un valor de entre 0 y 100';
  }
  if (!input.instructions) {
    errors.instructions = 'El paso a paso de la receta es requerido';
  } 
  return errors;
};



export default function Form() {
  const {push} = useHistory()

    const dietas = useSelector(state => state.dietas);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);
  
    const dietstags= dietas.map(d =>(
        <div>
            <input type='checkbox' name={d.nombre} id={d.id} value={d.id} key={d.id}/>
            <label htmlFor={d.nombre}>{d.nombre}</label>
        </div>      
    ));

    var dietasnombres = dietas.map(d=> d.nombre)

    const [input, setInput] = useState({
      title: '',
      summary: '',
      spoonacularScore: '',
      healthScore: '',
      instructions:'',
      dietas:[],
      image: '',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = function (e){

        
        if(dietasnombres.includes(e.target.name)){
            var array = input.dietas;
            if(e.target.checked){
                array.push(parseInt(e.target.value))
            }else{
                array= array.filter(d =>(d!==parseInt(e.target.value)))
            }
            setInput({
                ...input,
                dietas: array
                });
        }
        else{
            setInput({
                ...input,
                [e.target.name]: e.target.value
        });
        }       

        setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e){
      if(Object.keys(errors).length === 0){
        e.preventDefault();
        axios.post(`/recipe`, input)
        .then(response => {
          alert('Receta cargada exitosamente')
          dispatch(getRecetas())
          push('/home')
        })
      }
      else{
        e.preventDefault();
        alert('No se creo la receta, complete todos los campos obligatorios.')
      }
    }


  return (
    <div className={s.fullscreen}>
      <div className={s.container}>
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.div}>
            <label htmlFor='title'>Nombre: </label>
            <input 
            type="text" 
            name="title"
            id="title" 
            placeholder='Nombre del plato' 
            onChange={handleInputChange} 
            value={input.title}
            className = {s.input}
            
            />
            {errors.title && (<p className={s.danger}>{errors.title}</p>)}
          </div>
          <div className={s.div}>
            <label htmlFor='summary'>Resumen del plato: </label>
            <textarea 
            name="summary"
            id="summary" 
            placeholder='Resumen del plato' 
            onChange={handleInputChange} 
            value={input.summary}
            className = {s.textarea}
            />
            {errors.summary && (<p className={s.danger}>{errors.summary}</p>)}
          </div>
          <div className={s.div}>
            <label htmlFor='spoonacularScore'>Puntuación: </label>
            <input 
            type="number" 
            name="spoonacularScore" 
            id="spoonacularScore"
            placeholder='Puntuación' 
            min="0"
            max="100"
            onChange={handleInputChange} 
            value={input.spoonacularScore}
            className = {s.input}
            
            />
            {errors.spoonacularScore && (<p className={s.danger}>{errors.spoonacularScore}</p>)}
          </div>
          <div className={s.div}>
            <label htmlFor='healthScore'>Nivel de "comida saludable": </label>
            <input 
            type="number" 
            name="healthScore" 
            id="healthScore"
            placeholder='Nivel de "comida saludable"'
            min="0"
            max="100" 
            onChange={handleInputChange} 
            value={input.healthScore}
            className = {s.input}
            />
            {errors.healthScore && (<p className={s.danger}>{errors.healthScore}</p>)}
          </div>
          <div className={s.div}>
            <label htmlFor='instructions'>Paso a paso: </label>
            <textarea 
            type="text" 
            name="instructions"
            id="instructions" 
            placeholder='"Paso a paso"' 
            onChange={handleInputChange} 
            value={input.instructions}
            className = {s.textarea}
            
            />
            {errors.instructions && (<p className={s.danger}>{errors.instructions}</p>)}
          </div>
          <fieldset className={s.div} name="dietas" onChange={handleInputChange}>
            <legend>Tipo de dieta</legend>
            <div>
              <ul className={s.list}>{dietstags}</ul>
            </div>
            {/* <input 
            type="text" 
            name="otraDieta" 
            id="od"
            placeholder='Agrega otra dieta'
            onChange={handleInputChange} 
            value={input.od}
            className={s.od}
            /> */}
          </fieldset>
          <div className={s.div}>
            <label htmlFor='image'>Imagen: </label>
            <input 
            type="text" 
            name="image"
            id="image" 
            placeholder='URL de la imagen' 
            onChange={handleInputChange} 
            value={input.image}
            className = {s.input}
            />
          </div>
          <input className={s.button} type='submit' value='Crear receta'></input>
        </form>
{/*         <span>{JSON.stringify(input)}</span>
 */}      </div>
      </div>
  )
}
