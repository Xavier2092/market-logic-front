import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import './scss/style.scss';


const Welcome = () => {
  const [name, setName] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(()=> {
    if(token){
      axios
      .get(`https://marketlogic-back.herokuapp.com/user`, {
        headers: {
          token
        }
      })
      .then(({ data })=> setName(data.nombre))
      .catch((err)=> console.error(err));
    }
  }, [token]);//[id]=> quiere decir que solo se ejecuta cuando el id cambie
  
  return (
    <div className='welcome'>      
      <h3>{name ? '' : '¿Qué haces? 🕵️'}</h3>
      <h2>{name ? <Dashboard /> : 'Te estamos observando! 🧐'}</h2>
      <div>
          {name ? 
            ''
                :
            <button onClick={()=> navigate('/')} className='buttons'>Inicio</button>}
      </div>
    </div>
  )
}

export default Welcome;