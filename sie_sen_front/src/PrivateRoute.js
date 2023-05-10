import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'

export default function PrivateRoute({isLogged}) {
    const Navigate = useNavigate();
    const redirect = () =>{
      Navigate('/');
    }
    
    if(isLogged)
      return <Outlet />
    else
      return redirect;
  
}
