import React, { Component } from 'react';

class HeaderComponent extends Component {

    render() {
        return (
            <div>
                <header className='App-header'>
                        <h2 className='text-center '>Module Electricité</h2>
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                        <div>
                            <a href="/acteurs" className='navbar-brand module '>Acteurs</a>
                            <a href="/nivten" className='navbar-brand module'>Niveau de Tension</a>
                            <a href="/usage" className='navbar-brand module'>Usage</a>
                            <a href="/nbMenage" className='navbar-brand module'>Menages Electrifiés</a>
                            <a href="/achatsenelec" className='navbar-brand module'>Achat Energie par SENELEC</a>
                            <a href="/venteparsecteur" className='navbar-brand module'>Achat Energie par SENELEC</a>
                            <a href="/consomoy" className='navbar-brand module'>Consommation Moyenne</a>

                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;