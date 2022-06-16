import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar } from "@material-ui/core";
import Logout from './Logout';
import ('./scss/style.scss');

const Header= ()=> {
    const [name, setName] = useState();
  
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
    }, [token]);


  const displayDesktop = () => {
    return (
    <div className='header'>
        <Toolbar className='logo'>{`Bienvenido ${name}`}</Toolbar>
        <Logout/> 
    </div>
  )};
  
  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}

export default Header;