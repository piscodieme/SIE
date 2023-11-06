import React from 'react'

export default function Rapports() {
  return (
    <div className="container marTop">
        <h1 className='title-prez'>Liste des rapports disponible</h1>
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center title-prez">
                Rapport secteur de l'énergie 2017
                <a href="#" className="btn btn-download" Style="color:#FF6B6B; border:solid #5DA399 3px" download="texte1.txt">Télécharger</a>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center title-prez">
                Rapport secteur de l'énergie 2018
                <a href="#" className="btn btn-download" Style="color:#FF6B6B; border:solid #5DA399 3px" download="texte2.txt">Télécharger</a>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center title-prez">
                Rapport secteur de l'énergie 2019
                <a href="#" className="btn btn-download" Style="color:#FF6B6B; border:solid #5DA399 3px" download="texte3.txt">Télécharger</a>
            </li>
        </ul>
    </div>
    
  )
}
