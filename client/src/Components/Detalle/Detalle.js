import React, { useEffect } from 'react';
import s from './Detalle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {getAPIDetalle, getDBDetalle, clearDetalle} from '../../Actions/Actions'
import { Markup } from 'interweave'; //Para pasar string a html
import noimg from '../Receta/img/noimg.jpg';



function Receta(props) {

    const {id, db} = props.match.params;
    console.log(props.match.params);
    const detalle = useSelector(state => state.detalle);
    const dispatch = useDispatch();

    console.log('detalle' ,detalle);

    useEffect(() => {
        
        if(db==='true'){
            dispatch(getDBDetalle(id))
        }
        else{
            dispatch(getAPIDetalle(id))
        }
        return () => {
            dispatch(clearDetalle());
        };

    }, [dispatch]);
    

    var validdiets=false;
    var validdish=false;
    try{
        if(detalle.diets && detalle.diets.length>0){
            var diets = detalle.diets.map(d =>(
                <li>{d}</li>
            ));
            validdiets = true;
        }
        if(detalle.dishTypes && detalle.dishTypes.length>0){
            var dishTypes= detalle.dishTypes.map(d =>(
                <li>{d}</li>
            ));
            validdish = true;    
        }
    }catch(e){
        console.log(e)
    }
    

    return (
        <div className={s.fondo}>
            <div className={s.container}>
                <h1>{detalle.title}</h1>
                <div className={s.caja}>
                    <div className={s.imgcon}>
                        {detalle.image !== undefined && detalle.image !== ''? 
                            <img className={s.img} src={detalle.image} alt='img'></img>
                        :
                            <img className={s.img} src={noimg} alt='img'></img>
                        }
                    </div>    
                    <div className={s.puntuaciones}>
                        <div className={s.score}>
                            <h2>Puntuación:</h2>
                            <div className={s.scoreimg}><p>{detalle.spoonacularScore}</p></div>
                        </div>
                        <div className={s.salud}>
                            <h2>Nivel de "comida saludable":</h2>                        
                            <div className={s.saludimg}><p>{detalle.healthScore}</p></div>

                        </div>
                    </div>
                </div>
                {validdiets || validdish ?
                    <div className={s.listas}>
                        {validdiets ? 
                            <div className={s.lista}>
                                <p>Dietas:</p>
                                <ul className={s.puntos}>{diets}</ul>
                            </div> 
                        : null}
                        {validdish ? 
                            <div className={s.lista}>
                                <p>Tipo de plato:</p>
                                <ul className={s.puntos}>{dishTypes}</ul>
                            </div> 
                        : null}
                    </div>
                    :
                    null}
                <div className={s.explicacion}>
                    <h2>Resumen</h2>
                    <div className={s.texto}>
                        <Markup content={detalle.summary} />
                    </div>
                    <h2>Instrucciones</h2>
                    <div className={s.texto}>                    
                        <Markup content={detalle.summary} />
                        <Markup content={detalle.instructions} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Receta;