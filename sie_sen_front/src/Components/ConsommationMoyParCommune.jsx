import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ConsommationMoyParCommuneService from '../Services/ConsommationMoyParCommuneService';
import CommuneService from '../Services/CommuneService';
import regionService from '../Services/regionService';

export default function ConsommationMoyParCommune() {
    const Navigate = useNavigate();

    const {register, handleSubmit} = useForm();
    const [conso, setConso] = useState([]);
    const [commune, setCommune] = useState([]);
    const [region, setRegion] = useState([]);
    const [departement, setDepartement] = useState([]);
    const [annee, setAnnee] = useState([]);
    const [msg, setMsg] = useState('');
    const [showAddCommune, setShowAddCommune] = useState(false);
    const [showAddDepartement, setShowAddDepartement] = useState(false);
    const [showAddRegion, setShowAddRegion] = useState(false);

    const [notifMsg, setNotifMsg] = useState(false);
    const [notifMsgError, setNotifMsgError] = useState(false);

        useEffect(()=>{

           /*  ConsommationMoyParCommuneService.getAll().then((res)=>{
                setConso(res.data);
                console.log("hellooooooooooo");
            }).catch((err)=>{
                console.log("error get all consoo  ",err);
            }) */

            CommuneService.getAll().then((res)=>{
                setCommune(res.data);
                console.log("hellooooooooooo");
            }).catch((err)=>{
                console.log("error get all commune  ",err);
            })

            regionService.getRegions().then((res)=>{
                setRegion(res.data);
                console.log("hellooooooooooo");
            }).catch((err)=>{
                console.log("error get all region  ",err);
            })
        })
    
    const onSubmit=()=>{

    }

  return (
    <div className="container mt-3">
              {
                  showAddCommune && 
                  <div class="card">
                  <div class="card-header">
                    Ajouter une Commune
                    <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAddCommune(false)}}>
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
                      <button type="button" class="otherButton" onClick={()=>{setShowAddCommune(false)}}>Annuler</button>
                    </form>
                  </div>
                </div>
                
              }
              {
                  showAddDepartement && 
                  <div class="card">
                  <div class="card-header">
                    Ajouter un Departement
                    <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAddCommune(false)}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="form-group">
                        <label for="nom_site">Nom du Département :</label>
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
                      <button type="button" class="otherButton" onClick={()=>{setShowAddCommune(false)}}>Annuler</button>
                    </form>
                  </div>
                </div>
                
              }
              {
                  showAddRegion && 
                  <div class="card">
                  <div class="card-header">
                    Ajouter une Région
                    <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAddCommune(false)}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="form-group">
                        <label for="nom_site">Nom de la Région :</label>
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
                      <button type="button" class="otherButton" onClick={()=>{setShowAddCommune(false)}}>Annuler</button>
                    </form>
                  </div>
                </div>
                
              }
              {
                notifMsg && 
                <div className="alert alert-success">
                {msg}
                <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setNotifMsg(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
              
              }
              {
                notifMsgError && 
                <div className="alert alert-danger">
                {msg}
                <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setNotifMsgError(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>              
              }
              <h1 className='myFont text-center mt-3 mb-3'>Consommation Moyenne par Commune</h1>
              <div>
                  <button className='myButton mt-3 mb-1'onClick={()=>{Navigate("/addconso")}}><AddCircleOutlineIcon/> Conso</button>
                  <button className='myButton mt-3 mb-1' Style='float:right' onClick={()=>setShowAddCommune(true)}><AddCircleOutlineIcon/> Commune</button>
                  <button className='myButton mt-3 mb-1' Style='float:right' onClick={()=>setShowAddDepartement(true)}><AddCircleOutlineIcon/> Département</button>
                  <button className='myButton mt-3 mb-1' Style='float:right' onClick={()=>setShowAddRegion(true)}><AddCircleOutlineIcon/> Région</button>

              </div>
              <table className='table table-stripped table-bordered'>
                  <thead className='primary'>
                      <tr>
                          <th>N°</th>
                          <th>Commune</th>
                          <th>Année</th>
                          <th>Consommation</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                          {
                              conso.map((conso,i)=>
                              <tr key={conso.id}>
                                  <td>
                                      {i}
                                  </td>
                                  <td>
                                      {conso.nomCommune}
                                  </td>
                                  <td>
                                      {conso.annee}                            
                                  </td>
                                  <td>
                                      {conso.quantite}
                                  </td>
                              </tr>
                              )
                          }
                          
                      
                  </tbody>
              </table>
          </div>
  )
}
