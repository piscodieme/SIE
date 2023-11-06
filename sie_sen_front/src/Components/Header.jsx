import React, { Component, useEffect, useState } from 'react';
import logo from './../images/MPE.png'
import { useNavigate } from 'react-router-dom';

function Header () {

    const [log, setLog] = useState(false);
    const [active, setActive] = useState(1);
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
                    <a href="/" className="logo"><img src={logo} alt="LOGO MINISTERE" id="logo"/></a>
                    <nav class="navbar">
                        <a href="/" class={active===1 ? "active":""}>Accueil</a>
                        <a href="/presentation" class={active===2 ? "active":""} onClick={()=>setActive(2)}>Présentation</a>
                        <a href="#" class={active===3 ? "active":""}>Statistiques</a>
                        <a href="#" class={active===4 ? "active":""}>Bilans</a>
                        <a href="/rapports" class={active===5 ? "active":""} onClick={()=>setActive(5)}>Rapports</a>
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