import React from 'react';
import s from './Home.module.css';
import logo from './Logo3.png';

export default function Home() {
    return (
      <div className={s.fullscreen}>
        <div className={s.centro}>
            <img className={s.logo} src={logo} alt="img" />
            <a className={s.button} href='/home'>Entrar!</a>
        </div>
      </div>
    )
  };
