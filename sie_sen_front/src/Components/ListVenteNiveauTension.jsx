import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HistoryRouterProps } from 'react-router-dom';
import nivtenService from '../Services/NiveauTensionService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AnneeService from '../Services/AnneeService';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import { FirstPage } from '@mui/icons-material';


function ListVenteNiveauTension () {
    const [venteNiveauTension, setVenteNiveauTension] = React.useState([]);
    const [showNiveauTension, setShowNiveauTension] = React.useState(false);
    const [niveau, setNiveau] = React.useState([]);
    const [msg, setMsg] = React.useState('');
    const [notif, setNotif] = React.useState(false);
    const [notifErreur, setNotifErreur] = React.useState(false);

    const {register, handleSubmit} = useForm();
    const [annee, setAnnee] = React.useState([]);

    /* pagination */
    const [currentPage , setCurrentPage] = useState(1);
    const lineParPage = 5;
    const dernierIndex = currentPage * lineParPage;
    const premierIndex = dernierIndex - lineParPage;
    const line = venteNiveauTension.slice(premierIndex, dernierIndex);
    const npage = Math.ceil(venteNiveauTension.length / lineParPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);



    const onSubmit = (data)=>{
        console.log(data);
        nivtenService.create(data).then((res)=>{
            if(res.data === "ok"){
                setShowNiveauTension(false);
                setNotif(true);
                setMsg("Niveau tension ajouté avec succès");
                window.location.reload();
            }else{
                setNotifErreur(true);
                setMsg("Erreur lors de l'ajout du niveau tension");
            }
        }).catch((err)=>{
            setNotifErreur(true);
            setMsg("Erreur lors de l'ajout du niveau tension === ",err);
        })
    }

    useEffect(()=>{
        nivtenService.getAll().then((res)=>{
            console.log("données vente niv ten",res.data);
            setVenteNiveauTension(res.data);
        }).catch((err)=>{
            console.log("error get vente par niveau de tension == ", err);
        })

        nivtenService.getAllNiveau().then((res)=>{
            setNiveau(res.data);
        }).catch((err)=>{
            console.log("error get niveau de tension == ", err);
        })

        AnneeService.getAll().then((res)=>{
            setAnnee(res.data);
        }).catch((err)=>{
            console.log("error get annee == ", err);
        })

    },[])
    console.log("données vente niv ten",venteNiveauTension);
    return (
        <div className='marTop'>
                <a href="/electricite"><button className='myButton'> &#8592; Menu principal</button></a>
                <div className='col-sm-12'>

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

                    {
                        showNiveauTension && 
                        <div className="container mt-3 card">
   
                        <h4 className='myFont text-center'>
                            Vente Energie Par Niveau de Tension
                        </h4> 
                        
                     <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                          <div className="col-md-6">
                          <div class="form-group">
                              <label for="niveauTension">Niveau de Tension :</label>
                              <select id="selectField" name="selectField" className="form-select" {...register("idNiveau")} required >
                             <option>Choisir un Niveau</option>
                               {niveau.map((option) => (
                                 <option key={option.id} value={option.id}>{option.nomNiveau}</option>
                               ))}
                             </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div class="form-group">
                              <label for="casNonFournie">Année</label>
                              <select id="selectField" name="selectField" className="form-select" {...register("idAnnee")} required >
                             <option>Choisir une Année</option>
                               {annee.map((option) => (
                                 <option key={option.id} value={option.id}>{option.annee}</option>
                               ))}
                             </select>
                            </div>
                         </div>
                         <div class="form-group">
                         <label for="UNITE">Nombre de Client :</label>
                         <input type="number"
                            class="form-control" 
                            name='nbClient' id="nbClient" 
                            placeholder="Entrez le nombre de client pour ce niveau de tension" 
                            {...register("nbClient")}
                            required
                            />
                        </div>
                        <div class="form-group">
                         <label for="VENTE">Vente (GWH) :</label>
                         <input type="text"
                            class="form-control" 
                            name='vente' id="vente" 
                            placeholder="Entrez la Quantité " 
                            {...register("vente")}
                            required
                            />
                        </div>
                       </div>
                       <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                       <button type="reset" className="otherButton" onClick={()=>{setShowNiveauTension(false)} }>Annuler</button>
                 
                     </form>
                   </div>
                    }
                    <h2 className='text-center myFont'>Ventes par niveau de tension</h2>
                    {!showNiveauTension &&
                    <div>
                        <button className='myButton mt-3 mb-1'onClick={()=>setShowNiveauTension(true)}>Ajouter</button>
                    </div>
                    }
                        <table className='table table-striped table-bordered mt-1'>
                            <thead>
                                <th className='text-center'>N°</th>
                                <th className='text-center'>Niveau de Tension</th>
                                <th className='text-center'>Année</th>
                                <th className='text-center'> Nombre Clients</th>
                                <th className='text-center'>Vente(GWH)</th>
                                <th className='text-center'>Actions</th>
                            </thead>
                            <tbody className=''>
                                {
                                   line && line.map(
                                        (vente,i) => <tr key={vente.id} className='text-center paddCell'>
                                            <td >{i+1}</td>
                                            <td className='text-center'>{vente.nomNiveau}</td>
                                            <td>{vente.annee}</td>
                                            <td>{vente.nbClient}</td>
                                            <td>{vente.vente}</td>
                                            <td>
                                                <button className='action'>
                                                    <span class="material-icons">
                                                        edit
                                                    </span>
                                                </button>
                                                <button className='action'>
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


export default ListVenteNiveauTension;