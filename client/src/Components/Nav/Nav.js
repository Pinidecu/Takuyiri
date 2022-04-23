import { Link } from 'react-router-dom';
import s from './Nav.module.css';
import React from 'react';


export function Nav() {
  
  return (
    <nav className={s.nav}>
      <Link to='/' className={s.links}>Reciply</Link>
      <a href='/home' className={s.links}>Recetas</a>
      <Link className={s.links} to={`/home/nuevareceta`}>Crea tu receta</Link>
    </nav>
  )
};

export default Nav;