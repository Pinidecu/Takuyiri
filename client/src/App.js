import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import Receta from './Components/Receta/Receta';

import Home from './Components/Home/Home'
import Nav from './Components/Nav/Nav'
import Recetas from './Components/Recetas/Recetas'
import Detalle from './Components/Detalle/Detalle'
import Nuevareceta from './Components/Nuevareceta/Nuevareceta'

/* const recetas = [{titulo: 'papas', img:'https://www.comedera.com/wp-content/uploads/2021/03/papas-fritas.jpg', dieta: 'vegan'},
{titulo: 'papas', img:'https://www.comedera.com/wp-content/uploads/2021/03/papas-fritas.jpg', dieta: 'vegan'},
{titulo: 'papas', img:'https://www.comedera.com/wp-content/uploads/2021/03/papas-fritas.jpg', dieta: 'vegan'}] */



function App() {
  return (
    <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Nav} />
          <Route exact path="/home" component={Recetas}/>
          <Route path='/home/receta/:db/:id' render={({match}) => <Detalle match={match}/>} />
          <Route exact path="/home/nuevareceta" component={Nuevareceta} />
    </React.Fragment>
  );
}

export default App;
