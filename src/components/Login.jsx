import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './scss/style.scss';

const Login = () => {
  //Estados del formulario
  const [inputs, setInputs] = useState({//propiedades del input
    correo: "",
    contraseña: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //destructuring de las propiedades del estado inputs
  const { correo, contraseña } = inputs;

  //funcion onchange que va a recibir un evento(e) 
  //que va a setear los inputs
  const onChange = (e)=> {
    setInputs({...inputs, [e.target.name]: e.target.value});//los inputs q no se estan modificando los va a dejar como estan(...inputs)
    //y los inputs q se estan modificando los va a setear como el valor del input
  }

  const onSubmit = async (e)=> {
    e.preventDefault();
    if( correo !== '' && contraseña !== '' ){
      const Usuario = {
        correo,
        contraseña
      };
      setLoading(true);
      await axios
        .post('http://localhost:4000/login', Usuario)
        .then((res)=> {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({ correo: '', contraseña: '' });
          setTimeout(()=> {
            setMensaje('');
            localStorage.setItem('token', data?.usuario.token);
            navigate(`/welcome/`);
          }, 1800);
        }).catch((err)=> {
          console.log(err);
          setMensaje("Hubo un error.");
          setTimeout(()=> {
            setMensaje('');
            setLoading(false);
          }, 1800);
        });
        setInputs({ 
          correo: '',
        contraseña: ''
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className='formContainer'>
      <h2>Login</h2>
      <form onSubmit={(e) => onSubmit(e)}>


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
        
        <button type="submit">{loading ? 'Cargando...' : 'Iniciar Sesión'}</button>
        <p>Aún no tienes una cuenta?
          <b onClick={()=> navigate('/')}> Registrate</b>
        </p>
      </form>
    </div>
    {mensaje && <div className='toast'>{mensaje}</div>}
    </>
  )
}

export default Login;