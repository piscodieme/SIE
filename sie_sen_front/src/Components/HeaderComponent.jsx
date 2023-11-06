import React, { Component } from 'react';

class HeaderComponent extends Component {

    render() {
        return (
            <div className ="marTop">
               {/*  <header className='App-header'>
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
                </header> */}
        <div class="container">
        <h1 className='myFont'>Tableau de bord</h1>
        <h2 className='myFont text-dark'>Module Electricité</h2>

        <div class="dashboard">
            <a href="/acteurs">
            <div class="dashboard-card">
                <h3>Acteurs</h3>
                <p>Nombre total d'utilisateurs : 500</p>
                <p>Nouveaux utilisateurs aujourd'hui : 10</p>
            </div>
            </a>
            <a href="/nivten">
            <div class="dashboard-card">
                <h3>Niveau de Tension</h3>
                <p>Chiffre d'affaires mensuel : $10,000</p>
                <p>Ventes aujourd'hui : 20</p>
            </div>
            </a>
            <a href="/usage">
            <div class="dashboard-card">
                <h3>Usages</h3>
                <p>Nombre total de messages : 100</p>
                <p>Messages non lus : 5</p>
            </div>
            </a>
        </div>
        <div class="dashboard">
            <a href="/nbMenage">
            <div class="dashboard-card">
                <h3>Electrification</h3>
                <p> ménage Electrifiés zone urbaine : 500</p>
                <p> ménage Electrifiés zone rurale : 10</p>
            </div>
            </a>
            <a href="/achatsenelec">
            <div class="dashboard-card">
                <h3>Achats de la Senelec</h3>
                <p>Chiffre d'affaires mensuel : $10,000</p>
                <p>Ventes aujourd'hui : 20</p>
            </div>
            </a>
            <a href="/venteparsecteur">
            <div class="dashboard-card">
                <h3>Secteur d'activités</h3>
                <p>Nombre total de messages : 100</p>
                <p>Messages non lus : 5</p>
            </div>
            </a>
        </div>
        <div class="dashboard"> 
            <a href="/consomoy">
            <div class="dashboard-card">
                <h3>Consommation Moyenne</h3>
                <p>Nombre total d'utilisateurs : 500</p>
                
            </div>
            </a>
            <a href="/ventenf">
            <div class="dashboard-card">
                <h3>Energie Non Fournie</h3>
                <p>Chiffre d'affaires mensuel : $10,000</p>
                <p>Ventes aujourd'hui : 20</p>
            </div>
            </a>
            
        </div>
    </div>
            </div>
        );
    }
}

export default HeaderComponent;