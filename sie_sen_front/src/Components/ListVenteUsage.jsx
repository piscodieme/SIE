import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UsageService from '../Services/UsageService';
import AnneeService from '../Services/AnneeService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from 'react-hook-form';


function ListVenteUsage() {
    const [usages, setUsages] = useState([]);
    const [venteUsage,setVenteUsage]=useState([]);
    const [showAddVente , setShowAddVente] = useState(false);
    const [annee, setAnnee] = useState([]);
    const [showUsage, setShowusage] = useState(false);
    const [notif, setnotif] = useState(false);
    const [notifError, setNotifError] = useState(false);
    const [msg, setMsg] = useState("");
    /* to be continued */

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        mode: "onBlur",
      });
    
      const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
      } = useForm({
        mode: "onBlur",
      });

    useEffect(()=>{
        UsageService.getAll().then((res)=>{
            setVenteUsage(res.data);
        }).catch((err)=>{
            console.log("error get vente == ", err);
        })
        UsageService.getAllUsage().then((res)=>{
            setUsages(res.data);
        }).catch((err)=>{
            console.log("error get usages == ", err);
        })
        AnneeService.getAll().then((res)=>{
            setAnnee(res.data);
          }).catch((err)=>{
              console.log("error get annee == ", err);
          })

    },[])

    const onSubmit=(data)=>{
       console.log(data);
       UsageService.create(data).then((res)=>{
        if(res.data === "ok"){
            setnotif(true);
            setMsg("ajout vente réussi");
            setShowAddVente(false);
            window.location.reload();
        }else{
            setNotifError(true);
            setMsg("erreur Ajout Vente Réessayez SVP");
        }
       }).catch((err)=>{
        console.log("error add vente == ", err);
        setNotifError(true);
        setMsg("erreur Ajout Vente Réessayez SVP");
       })

     }
console.log("les usages === ",usages);
        return (
            <div className='marTop'>
                { showAddVente && 
                <div className="container mt-3 card">
   
                <h4 className='myFont text-center'>
                     Formulaire : Vente par Usage
                </h4> 
                
             <form onSubmit={handleSubmit(onSubmit)}>
               <div className="row">
                  <div className="col-md-6">
                  <div class="form-group">
                      <label for="Usage">Usage :</label>
                      <select id="selectField" name="selectField" className="form-select" {...register("idUsage")} required >
                     <option>Choisir un Usage</option>
                       {usages.map((option) => (
                         <option key={option.id} value={option.id}>{option.nomUsage}</option>
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
                 <div class="form-group col-md-6">
                 <label for="QUANTITE">Vente (KWH) :</label>
                 <input type="text"
                    class="form-control" 
                    name='quantite' id="quantite" 
                    placeholder="Entrez la quantité" 
                    {...register("quantite")}
                    required
                    />
                </div>
                <div class="form-group col-md-6">
                 <label for="NbClient">Clientèle :</label>
                 <input type="number"
                    class="form-control" 
                    name='nbClient' id="NbClient" 
                    placeholder="Entrez le nombre de client" 
                    {...register("nbClient")}
                    required
                    />
                </div>
               </div>
               <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
               <button type="reset" className="otherButton" onClick={()=>{setShowAddVente(false)} }>Annuler</button>
         
             </form>
           </div>

                }
                <div className='col-sm-12'>
                    <h2 className='text-center myFont'>Ventes Et Clientèle Par Usage</h2>
                    <div>
                    <button className='myButton mt-3 mb-1'onClick={()=>{setShowAddVente(true)}}><AddCircleOutlineIcon/> Vente </button>
                    <button className='myButton mt-3 mb-1' Style='float:right' onClick={()=>setShowusage(true)}><AddCircleOutlineIcon/> Usage </button>
                  
                    </div>
                        <table className='table table-striped table-bordered mt-1'>
                            <thead>
                                <th className='text-center'>N°</th>
                                <th className='text-center'>Année</th>
                                <th className='text-center'>Usage</th>
                                <th className='text-center'>Vente</th>
                                <th className='text-center'>Clientèle</th>
                                <th className='text-center'>Action</th>
                            </thead>
                            <tbody className=''>
                                {
                                   venteUsage && venteUsage.map(
                                        (vente,i) => <tr key={i+1} className='text-center'>
                                            <td>{i+1}</td>
                                            <td className='text-center'>{vente.annee}</td>
                                            <td className='text-center'>{vente.nomUsage}</td>
                                            <td className='text-center'>{vente.quantite}</td>
                                            <td className='text-center'>{vente.nbClient}</td>
                                            <td>
                                                <button className='btn btn-primary UpdateDeleteBtn'>
                                                    <span class="material-icons-outlined">
                                                        update
                                                    </span>
                                                </button>
                                                <button className='btn btn-danger UpdateDeleteBtn'>
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
                </div>
            </div>
        );
    }
export default ListVenteUsage;