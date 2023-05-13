import React, { useEffect, useState } from 'react'
import AchatEnergieParSenelecService from '../Services/AchatEnergieParSenelecService';
import AnneeService from '../Services/AnneeService';

import SiteService from '../Services/SiteService';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


export default function AchatEnergieParSenelec (){
    const Navigate = useNavigate();

    const {register, handleSubmit,errors} = useForm();

    const [achat, setAchat] = useState([]);
    const [site, setSite] = useState([]);
    const [annee, setAnnee] = useState([]);
    const [showAddAchat, setShowAddAchat] = useState(false);
    const [showAddSite, setShowAddSite] = useState(false);
    const [showEditAchat, setShowEditAchat] = useState(false);
    const [msg, setMsg] = useState({});
    const [showNotif,setShowNotif] = useState(false);
    useEffect(()=>{
        AchatEnergieParSenelecService.getAll().then((res)=>{
            let data = res.data;
            setAchat(data);
        }).catch((err)=>{
            console.log("error : ",err);
        });

        AnneeService.getAll().then((res)=>{
            let data = res.data;
            setAnnee(data);
        }).catch((err)=>{
            console.log("error get annee : ",err);
        });

        SiteService.GetAll().then((res)=>{
            setSite(res.data);
        }).catch((err)=>{
            console.log("error : ",err);
        })
    },[])

    const onSubmit = (data) =>{
        const site={site:data.site, type:data.type};
         SiteService.Add(site).then((res)=>{
            let data = res.data;
            setMsg("Site Ajouté avec Succes");
            setShowAddSite(false);
            setShowNotif(true);
        }).catch((err)=>{
            console.log("error : ",err);
        }) 
        console.log("data form Add Site  === ",data);
    }
    console.log("les aCHAT disponible === ",achat);
        return (
          <div className="container mt-3">
              {
                  showAddSite && 
                  <div class="card">
                  <div class="card-header">
                    Ajouter un site
                    <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAddSite(false)}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="form-group">
                        <label for="nom_site">Nom du site :</label>
                        <input type="text"
                            class="form-control" 
                            name='site' id="nom_site" 
                            placeholder="Entrez le nom du site" 
                            {...register("site")}
                            required
                            />
                      </div>
                      <div class="form-group">
                        <label for="type_site">Type :</label>
                        <input type="text" 
                            class="form-control" 
                            name='type' id="type_site" 
                            placeholder="Entrez le type de site" 
                            {...register("type")} 
                            required
                            />
                      </div>
                      <button type="submit" class="myButton">Ajouter</button>
                      <button type="button" class="otherButton">Annuler</button>
                    </form>
                  </div>
                </div>
                
              }
              {
                showNotif && <div className='card bg-light' data-delay="5000">
                <div class="card-header">
                    {msg}
                  <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setShowNotif(false)}}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              
              }
              <h1 className='myFont text-center mt-3 mb-3'>Achat d'énergie par SENELEC</h1>
              <div>
                  <button className='myButton mt-3 mb-1'onClick={()=>{Navigate("/addachat")}}>Ajouter Achat</button>
                  <button className='myButton mt-3 mb-1' Style='float:right' onClick={()=>setShowAddSite(true)}>Ajouter Site</button>
      
              </div>
              <table className='table table-stripped table-bordered'>
                  <thead className='primary'>
                      <tr>
                          <th>ID</th>
                          <th>Unité</th>
                          <th>Site de Production</th>
                          <th>Année</th>
                          <th>Achat</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                          {
                              achat.map((ach,i)=>
                              <tr key={ach.id}>
                                  <td>
                                      {i}
                                  </td>
                                  <td>
                                      {ach.unite}
                                  </td>
                                  <td>
                                      {ach.site}
                                  </td>
                                  <td>
                                      {ach.annee}                            
                                  </td>
                                  <td>
                                      {ach.quantite}
                                  </td>
                              </tr>
                              )
                          }
                          
                      
                  </tbody>
              </table>
          </div>
        )
}
