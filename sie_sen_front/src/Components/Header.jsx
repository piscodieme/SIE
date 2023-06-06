import React, { Component, useEffect, useState } from 'react';
import logoUemoa from './../images/uemoa.png'
import { useNavigate } from 'react-router-dom';

function Header () {

    const [log, setLog] = useState(false);
    const Navigate = useNavigate(); 

    useEffect(()=>{
        setLog(localStorage.getItem("isLogged"));
    })

    const SignOut = () =>{
        localStorage.clear();
        Navigate('/');
        window.location.reload();
    }
        return (
            <div>
                <header class="header">
                    <a href="/" class="logo"><img src={logoUemoa} alt="LOGO UEMOA" id="logo"/></a>
                    <nav class="navbar">
                        <a href="/" class="active">Accueil</a>
                        <a href="#">Présentation</a>
                        <a href="#">Statistiques</a>
                        <a href="#">Bilans</a>
                        <a href="#">Rapports</a>
                        {
                            log && <button className='myButton' onClick={SignOut} Style="font-size:20px; font-weight:100">
                                <a href="#">Déconnexion</a>
                            </button>
                        }
                    </nav>
                </header>
                
            </div>
        );
    }

export default Header;