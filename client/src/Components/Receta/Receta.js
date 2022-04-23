import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Receta.module.css';
import noimg from './img/noimg.jpg';


export default function Receta(props) {

  /* let valid = false;
  try{
    
    var diets = props.dietas.map(d =>(
      <li className={s.dieta}>{d}</li>
      ));


    valid = true
  }catch(e){
    console.log(e)
  } */

  //const [dietas, setDietas] = useState([]);

  /* useEffect(() => {
    if (props.receta.origen) {
        let dbDietas = [];
        dbDietas = props.dietas.map(d => d.nombre);
        setDietas(dbDietas)
    } else {
        setDietas(props.dietas)
    }
}, []); */
  var diets = props.dietas.map(d =>(
    <li className={s.dieta} key={d.id}>{d}</li>
  ));

  var urldetail = '';
  if(props.receta.origen){
    urldetail = `/home/receta/true/${props.id}`
  }else{
    urldetail = `/home/receta/false/${props.id}`
  }
      
  return (
    <div className={s.receta}>
      {props.img !== undefined && props.img !== ''? 
        <img className={s.img} src={props.img} alt='img'></img>
      :
        <img className={s.img} src={noimg} alt='img'></img>
      }
      <div className={s.container}>
          <div className={s.texto}>
            <Link className={s.titulo} to={urldetail}>
              <h1>{props.titulo}</h1>
            </Link>
            <div className={s.dyp}>
              {diets ? <ul className={s.lista}>{diets}</ul> : null}
              <div className={s.puntuacion}><p>{props.puntuacion}</p></div>
            </div>
            <Link className={s.button} to={urldetail}>Detalles</Link>
          </div>
        </div>
    </div>
  )
};