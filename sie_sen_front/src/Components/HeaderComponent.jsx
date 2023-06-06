import React, { Component } from 'react';

class HeaderComponent extends Component {

    render() {
        return (
            <div>
                <header className='App-header'>
                    <h2 className='text-center myFont text-dark mb-5'>Module Electricité</h2>
                    <nav className='navbar navbar-expand-md'>
                        <div className='listLink'>
                            <a href="/acteurs" className='navbar-brand module '>Acteurs</a>
                            <a href="/nivten" className='navbar-brand module'>Niveau de Tension</a>
                            <a href="/usage" className='navbar-brand module'>Usage</a>
                            <a href="/nbMenage" className='navbar-brand module'>Menages Electrifiés</a>
                            <a href="/achatsenelec" className='navbar-brand module'>Achat Energie par SENELEC</a>
                            <a href="/venteparsecteur" className='navbar-brand module'>Vente Par Secteur</a>
                            <a href="/consomoy" className='navbar-brand module'>Consommation Moyenne</a>
                            <a href="/ventenf" className='navbar-brand module'>Vente Energie Non Fournie</a>

                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;