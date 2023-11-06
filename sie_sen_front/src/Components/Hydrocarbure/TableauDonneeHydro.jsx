import React, { useState } from 'react'
import industrieService from '../../Services/industrieService';
import HydrocarbureService from '../../Services/HydrocarbureService';

export default function TableauDonneeHydro(props) {

    const [msg, setMsg] = useState(false);
    const [notif, setNotif] = useState(false)
    const [notifErreur , setNotifErreur] = useState(false)
    const [confirm , setConfirm] = useState(false)
    const [idProd, setIdProd] = useState(0);
    /* pagination */
    const [currentPage , setCurrentPage] = useState(1);
    const lineParPage = 5;
    const dernierIndex = currentPage * lineParPage;
    const premierIndex = dernierIndex - lineParPage;
    const line = props.data.slice(premierIndex, dernierIndex);
    const npage = Math.ceil(props.data.length / lineParPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const confirmation = (id)=>{
        setIdProd(id);
        setConfirm(true);
    }

    const deleteDonneeHydro =(id)=>{
        HydrocarbureService.deleteDonneeHydrocarbure(id).then((res) =>{
            console.log(res.data);
            setNotif(true)
            setMsg("Suppression réussie ")
            window.location.reload();
        }).catch((err)=>{
            console.log("erreur suppression ",err)
            setNotifErreur(true)
            setMsg("Erreur suppression")
        })
    }

  return (
    <div>
         {
                                            confirm && 
                                            <div className=''>

                                            <div>
                                                <h5 class="card-title">Confirmation de suppression</h5>
                                                <p class="card-text">Voulez-vous vraiment supprimer cette information</p>
                                                    
                                            </div>             
                                            <button type="button" className='myButton' onClick={()=>deleteDonneeHydro(idProd)}>
                                            Supprimer
                                            </button>
                                            <button type="button" className='otherButton' onClick={()=>{setConfirm(false)}}>
                                            Annuler
                                            </button>
                                            </div>
                                            }
    {
                    notif && 
                    <div className="alert alert-success"  data-delay="5000">
                    {msg}
                    <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setNotif(false)}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    
                    }
                    {
                    notifErreur && 
                    <div className="alert alert-danger"  data-delay="5000">
                    {msg}
                    <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setNotifErreur(false)}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>              
                    }
        <table className='table table-striped table-bordered mt-1'>
                            <thead>
                                <th className='text-center'>N°</th>
                                <th className='text-center'>Rubrique 1</th>
                                <th className='text-center'>Rubrique 2</th>
                                <th className='text-center'>Produits(detail)</th>
                                <th className='text-center'>Année</th>
                                <th className='text-center'>Quantité</th>
                                <th className='text-center'>Unité</th>
                                <th className='text-center'>Actions</th>
                            </thead>
                            <tbody className=''>
                                {
                                   line && line.map(
                                        (prod,i) => <tr key={prod.id} className='text-center paddCell'>
                                            <td >{i+1}</td>
                                            <td className='text-center'>{prod.rubrique1}</td>
                                            <td className='text-center'>{prod.rubrique2}</td>
                                            <td className='text-center'>{prod.produitsDetail}</td>
                                            <td>{prod.annee}</td>
                                            <td>{prod.quantite}</td>
                                            <td>{prod.unite}</td>
                                            <td>
                                                <button className='action'>
                                                    <span class="material-icons">
                                                        edit
                                                    </span>
                                                </button>
                                                <button className='action' onClick={()=>confirmation(prod.id)}>
                                                    <span class="material-icons">
                                                        delete
                                                    </span>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <nav className='pagi'>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <a href="#" className='page-link' onClick={prevPage}>Précédent</a>
                                </li>
                                {
                                    numbers.map((n,i)=>(
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a href="#" className='page-link pagi'
                                            onClick={()=>changePage(n)}>{n}</a>
                                        </li>
                                    ))
                                }
                                 <li className='page-item'>
                                    <a href="#" className='page-link' onClick={nextPage}>Suivant</a>
                                </li>
                            </ul>    
                        </nav> 
    </div>
  );
 
function nextPage(){
    if(currentPage < dernierIndex /* && currentPage !== numbers[numbers.length -1] */){
        setCurrentPage(currentPage + 1);
    }
}
function prevPage(){
    if(currentPage !== premierIndex /* && currentPage !== 1 */){
        setCurrentPage(currentPage - 1);
    }
}
function changePage(n){
    setCurrentPage(n);
}
}
