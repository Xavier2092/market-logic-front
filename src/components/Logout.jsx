import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './scss/style.scss';

const Logout = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState();

  const onSubmit = async () => {
    const baseUrl = 'https://market-logic-front.vercel.app/login';
    setLoading(true)
    await axios
      .get('https://marketlogic-back.herokuapp.com/logout')
      .then(({data}) => {
        setMensaje('Cerrando sesión...');
        localStorage.removeItem('token');
        setTimeout(() => {
          setMensaje('');
          window.location.href = baseUrl;
        }, 1800);
        
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      });
  }


  return (
    <>
      <div className='logout'>
        <h5 onClick={onSubmit}>Cerrar sesión</h5>
      </div>
      {mensaje && <div className='toastLogout'>{mensaje}</div>}
    </>
  )
}

export default Logout;