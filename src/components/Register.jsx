import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './scss/style.scss';

const Register = () => {
  //Estados del formulario
  const [inputs, setInputs] = useState({//propiedades del input
    correo: "",
    nombre: "",
    contraseña: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //destructuring de las propiedades del estado inputs
  const { correo, nombre, contraseña } = inputs;

  //funcion onchange que va a recibir un evento(e) 
  //que va a setear los inputs
  const onChange = (e)=> {
    setInputs({...inputs, [e.target.name]: e.target.value});//los inputs q no se estan modificando los va a dejar como estan(...inputs)
    //y los inputs q se estan modificando los va a setear como el valor del input
  }

  const onSubmit = async (e)=> {
    e.preventDefault();
    if( nombre !== '' && correo !== '' && contraseña !== '' ){
      const Usuario = {
        nombre,
        correo,
        contraseña
      };
      setLoading(true);
      await axios
        .post('http://localhost:4000/register', Usuario)
        .then(({data})=> {
          setMensaje(data.mensaje);
          setInputs({ nombre: '', correo: '', contraseña: '' });
          setTimeout(()=> {
           setMensaje('');
           setLoading(false); 
           navigate('/login');
          }, 2300);
        }).catch((err)=> {
          console.log(err);
          setMensaje("Hubo un error " + err.response.data.message);
          setTimeout(()=> {
            setMensaje('');
            setLoading(false);
          }, 2300);
        });
    }
  };

  return (
    <>
      <div className='formContainer'>
      <h2>Registro</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='inputContainer'>
          <div className='left'>
            <label htmlFor='nombre'>Nombre</label>
            <input 
              value={nombre}
              onChange={(e)=> onChange(e)}
              type='nombre'
              id='nombre'
              name='nombre'
              placeholder='Nombre'
              autoComplete='off'
            />
          </div>
        </div>


        <div className='inputContainer'>
          <div className='left'>
            <label htmlFor='correo'>Correo</label>
            <input 
              value={correo}
              onChange={(e)=> onChange(e)}
              type='email'
              id='correo'
              name='correo'
              placeholder='Correo'
              autoComplete='off'
            />
          </div>
        </div>


        <div className='inputContainer'>
          <div className='left'>
            <label htmlFor='contraseña'>Contraseña</label>
            <input 
              value={contraseña}
              onChange={(e)=> onChange(e)}
              type='password'
              id='password'
              name='contraseña'
              placeholder='Contraseña'
              autoComplete='off'
            />
          </div>
        </div>
        
        <button type="submit">{loading ? 'Cargando...' : 'Registrarme'}</button>
        <p>Ya tienes una cuenta?
          <b onClick={()=> navigate('/login')}> Inicia Sesión</b>
        </p>
      </form>
    </div>
    {mensaje && <div className='toast'>{mensaje}</div>}
    </>
  )
}

export default Register;