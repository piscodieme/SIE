import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VenteParSecteurService from '../Services/VenteParSecteurService';
import SecteurService from '../Services/SecteurService';
import AnneeService from '../Services/AnneeService';
import { useForm } from 'react-hook-form';


const addResp ='';
export default function VenteParSecteurComponent() {

    const Navigate = useNavigate();
    const [vente,setVente] = useState([]);
    const [showAddSecteur, setShowAddSecteur] = useState();
    const [msg, setMsg] = useState({});
    const [showNotif,setShowNotif] = useState(false);
    const [showNotifError,setShowNotifError] = useState(false);
    const [secteur,setSecteur] = useState([]);
    const [annee,setAnnee] = useState([]);

    const {register, handleSubmit} = useForm();

    useEffect(()=>{
        
        VenteParSecteurService.getAll().then((res)=>{
            setVente(res.data);
        }).catch((err)=>{
            console.log("error get vente par service  == ",err);
        });

        SecteurService.getAll().then((res)=>{
            setSecteur(res.data);
        }).catch((err)=>{
            console.log('error get secteur = ',err);
        })

        AnneeService.getAll().then((res)=>{
            setAnnee(res.data);
        }).catch((err)=>{
            console.log("error get annee == ", annee);
        })

    },[])

    const onSubmit = (data)=>{
        const secteur = {secteur:data.secteur};
        SecteurService.add(secteur).then((res)=>{          
                setMsg("Secteur Ajouté avec Succès");
                setShowAddSecteur(false);
                setShowNotif(true);
            
        }).catch((err)=>{
            setMsg("Ajout Secteur Error");
            setShowNotifError(true);
        })
    }

    console.log("les ventes par secteur dispo  == ",vente);
    console.log("les secteurs dispo  == ",secteur);
    console.log("les annee dispo  == ",annee);
  return (
    <div className="container mt-3">
              {
                  showAddSecteur && 
                  <div class="card">
                  <div class="card-header">
                    Ajouter un secteur
                    <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAddSecteur(false)}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="form-group">
                        <label for="nom_secteur">Nom du secteur :</label>
                        <input type="text"
                            class="form-control" 
                            name='secteur' id="nom_secteur" 
                            placeholder="Entrez le nom du secteur" 
                            {...register("secteur")}
                            required
                            />
                      </div>
                      <button type="submit" class="btn myButton">Ajouter</button>
                      <button type="button" class="btn btn-secondary">Annuler</button>
                    </form>
                  </div>
                </div>
                
              }
              {
                showNotif && 
                <div className="alert alert-success"  data-delay="5000">
                {msg}
                <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setShowNotif(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
              
              }
              {
                showNotifError && 
                <div className="alert alert-danger"  data-delay="5000">
                {msg}
                <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setShowNotifError(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>              
              }
              <h1 className='myFont text-center mt-3 mb-3'>Vente par Secteur</h1>
              <div>
                  <button className='myButton mt-3 mb-1'onClick={()=>{Navigate("/addventesecteur")}}>Ajouter une Vente</button>
                  <button className='myButton mt-3 mb-1' Style='float:right' onClick={()=>setShowAddSecteur(true)}>Ajouter Secteur</button>
      
              </div>
              <table className='table table-stripped table-bordered'>
                  <thead className='primary'>
                      <tr>
                          <th>ID</th>
                          <th>Secteur d'activité</th>
                          <th>Année</th>
                          <th>Vente</th>
                          <th>Unité</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                          {
                              vente.map((vte,i)=>
                              <tr key={vte.id}>
                                  <td>
                                      {i}
                                  </td>                                
                                  <td>
                                      {vte.secteur}
                                  </td>
                                  <td>
                                      {vte.annee}                            
                                  </td>
                                  <td>
                                      {vte.quantite}
                                  </td>
                                  <td>
                                      {vte.unite}
                                  </td>
                              </tr>
                              )
                          }
                          
                      
                  </tbody>
              </table>
          </div>
  )
}
