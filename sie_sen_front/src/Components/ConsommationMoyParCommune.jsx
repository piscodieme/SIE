import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ConsommationMoyParCommuneService from '../Services/ConsommationMoyParCommuneService';
import CommuneService from '../Services/CommuneService';
import regionService from '../Services/regionService';
import DepartementService from '../Services/DepartementService';
import AnneeService from '../Services/AnneeService';

export default function ConsommationMoyParCommune() {
    const Navigate = useNavigate();

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
      const {
        register: register3,
        formState: { errors: errors3 },
        handleSubmit: handleSubmit3,
      } = useForm({
        mode: "onBlur",
      });

      const {
        register: register4,
        formState: { errors: errors4 },
        handleSubmit: handleSubmit4,
      } = useForm({
        mode: "onBlur",
      });
    const [conso, setConso] = useState([]);
    const [commune, setCommune] = useState([]);
    const [region, setRegion] = useState([]);
    const [departement, setDepartement] = useState([]);
    const [annee, setAnnee] = useState([]);
    const [msg, setMsg] = useState('');
    const [showNotif,setShowNotif] = useState(false);
    const [showNotifError,setShowNotifError] = useState(false);
    const [showAddCommune, setShowAddCommune] = useState(false);
    const [showAddDepartement, setShowAddDepartement] = useState(false);
    const [showAddRegion, setShowAddRegion] = useState(false);
    const [showAddConso, setShowAddConso] = useState(false);

    const [notifMsg, setNotifMsg] = useState(false);
    const [notifMsgError, setNotifMsgError] = useState(false);

    /* pagination */
    const [currentPage , setCurrentPage] = useState(1);
    const lineParPage = 5;
    const dernierIndex = currentPage * lineParPage;
    const premierIndex = dernierIndex - lineParPage;
    const line = conso.slice(premierIndex, dernierIndex);
    const npage = Math.ceil(conso.length / lineParPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

        useEffect(()=>{

            ConsommationMoyParCommuneService.getAll().then((res)=>{
                setConso(res.data);
                console.log("hellooooooooooo");
            }).catch((err)=>{
                console.log("error get all consoo  ",err);
            })
            AnneeService.getAll().then((res)=>{
              setAnnee(res.data);
            }).catch((err)=>{
                console.log("error get annee == ", err);
            })

            CommuneService.getAll().then((res)=>{
                setCommune(res.data);
                
            }).catch((err)=>{
                console.log("error get all commune  ",err);
            })

            regionService.getRegions().then((res)=>{
                setRegion(res.data);
               
            }).catch((err)=>{
                console.log("error get all region  ",err);
            })

            DepartementService.getAll().then((res)=>{
                setDepartement(res.data);
            }).catch((err)=>{
                console.log("error get all departement  ",err);
            })
        },[])
    
    const onSubmit=(data)=>{
       CommuneService.add(data).then((res)=>{
        console.log(data);
            setShowAddCommune(false);
            window.location.reload();
            setShowNotif(true);
            setMsg("Commune créé avec Succès")
       }).catch((err)=>{
        setShowNotifError(true);
        setMsg("Erreur création de la commune Réessayez SVP")
       })
    }

    const onSubmitDep = (data) =>{
        console.log(data)
        DepartementService.add(data).then((res)=>{
            setShowAddDepartement(false);
            setShowNotif(true);
            window.location.reload();
            setMsg("Département créé avec Succès")
        }).catch((err)=>{
            setShowNotifError(true);
            setMsg("Erreur Création du Département réessayez SVP")
        })
    }

    const onSubmitReg = (data) =>{
        regionService.add(data).then((res)=>{
            setShowAddRegion(false);
            setShowNotif(true);
            window.location.reload();
            setMsg("Région créée avec Succès");
        }).catch((err)=>{
            setShowNotifError(true);
            setMsg("Erreur Création Région réessayez SVP", err)
        })
    }

    const onSubmitCons =(data)=>{
      console.log(data);
      ConsommationMoyParCommuneService.add(data).then((res)=>{
        if(res.data === "ok"){
          console.log(res);
          setShowAddConso(false);
          setShowNotif(true);
          window.location.reload();
          setMsg("Consommation ajoutée avec Succès");
        }else{
          setShowNotifError(true);
          setMsg("Erreur Ajout Consommation réessayez SVP", res.data);

        }

      }).catch((err)=>{
        setShowNotifError(true);
        setMsg("Erreur Ajout Consommation réessayez SVP", err);
      })
    }

  return (
    <div className="marTop">
      <a href="/electricite"><button className='myButton'> &#8592; Menu principal</button></a>
      {
        showAddConso && 
          <div className="container mt-3 card">
   
          <h4 className='myFont text-center'>
               Ajout consommation moyenne et vente par commune
          </h4> 
          
       <form onSubmit={handleSubmit4(onSubmitCons)}>
         <div className="">
            <div className="col-md-12">
            <div class="form-group">
                <label for="niveauTension">Commune :</label>
                <select id="selectField" name="selectField" className="form-select" {...register4("idCommune")} required >
               <option>Choisir une commune</option>
                 {commune.map((option) => (
                   <option key={option.id} value={option.id}>{option.nomCommune}</option>
                 ))}
               </select>
              </div>
          </div>
          <div className="col-md-12">
          <div class="form-group">
                <label for="casNonFournie">Année</label>
                <select id="selectField" name="selectField" className="form-select" {...register4("idAnnee")} required >
               <option>Choisir une Année</option>
                 {annee.map((option) => (
                   <option key={option.id} value={option.id}>{option.annee}</option>
                 ))}
               </select>
              </div>
           </div>
           <div class="form-group col-md-12">
           <label for="QUANTITE">Consommation (KWH/Client) :</label>
           <input type="text"
              class="form-control" 
              name='quantite' id="quantite" 
              placeholder="Entrez la quantité" 
              {...register4("quantite")}
              required
              />
          </div>
          <div class="form-group col-md-12">
           <label for="Vente">Vente (KWH) :</label>
           <input type="text"
              class="form-control" 
              name='vente' id="vente" 
              placeholder="Entrez la vente " 
              {...register4("vente")}
              required
              />
          </div>
         </div>
         <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
         <button type="reset" className="otherButton" onClick={()=>{setShowAddConso(false)} }>Annuler</button>
   
       </form>
     </div>
      }
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
                        <label for="nom_commune">Nom du Commune :</label>
                        <input type="text"
                            class="form-control" 
                            name='commune' id="nom_commune" 
                            placeholder="Entrez le nom de la commune" 
                            {...register("nomCommune")}
                            required
                            />
                      </div>
                      <div class="form-group">
                        <label for="departement">Departement</label>
                        <select id="selectField" name="selectField" className="form-select" {...register("idDepartement")} required>
                            <option>Choisir le departement de la commune</option>
                            {departement.map((option) => (
                                <option key={option.id} value={option.id}>{option.nomDepartement}</option>
                            ))}
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="annee_creation">Année de Création :</label>
                        <input type="text"
                            class="form-control" 
                            name='annee_creation' id="annee_creation" 
                            placeholder="Entrez le nom l'année de création" 
                            {...register("anneeCreation")}
                            
                            />
                      </div>
                      <div class="form-group">
                        <label for="departement">Zone (Urbaine / Rurale)</label>
                        <select id="selectField" name="selectField" className="form-select" {...register("zone")} required>
                            <option>Choisir la zone de la commune</option>
                            <option>Urbaine</option>
                            <option>Rurale</option>
                        </select>
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
                    <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAddDepartement(false)}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="card-body">
                    <form onSubmit={handleSubmit2(onSubmitDep)}>
                      <div class="form-group">
                        <label for="nomDepartement">Nom du Département :</label>
                        <input type="text"
                            class="form-control" 
                            name='nomDepartement' id="nomDepartement" 
                            placeholder="Entrez le nom du Département" 
                            {...register2("nomDepartement")}
                            required
                            />
                      </div>
                      <div class="form-group">
                        <label for="departement">Région</label>
                        <select id="selectField" name="selectField" className="form-select" {...register2("idRegion")} required>
                            <option>Choisir la région du département</option>
                            {region.map((option) => (
                                <option key={option.id} value={option.id}>{option.nomRegion}</option>
                            ))}
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="anneeCreation">Année de Création</label>
                        <input type="text" 
                            class="form-control" 
                            name='anneeCreation' id="anneeCreation" 
                            placeholder="Entrez l'année de Création" 
                            {...register2("anneeCreation")} 
                            
                            />
                      </div>
                      <button type="submit" class="myButton">Ajouter</button>
                      <button type="button" class="otherButton" onClick={()=>{setShowAddDepartement(false)}}>Annuler</button>
                    </form>
                  </div>
                </div>
                
              }
              {
                  showAddRegion && 
                  <div class="card">
                  <div class="card-header">
                    Ajouter une Région
                    <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAddRegion(false)}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="card-body">
                    <form onSubmit={handleSubmit3(onSubmitReg)}>
                      <div class="form-group">
                        <label for="nomRegion">Nom de la Région :</label>
                        <input type="text"
                            class="form-control" 
                            name='nomRegion' id="nomRegion" 
                            placeholder="Entrez le nom de la région" 
                            {...register3("nomRegion")}
                            required
                            />
                      </div>
                      <div class="form-group">
                        <label for="anneeCreation">Année Création</label>
                        <input type="text" 
                            class="form-control" 
                            name='anneeCreation' id="anneeCreation" 
                            placeholder="Entrez l'année de création" 
                            {...register3("anneeCreation")} 
                            
                            />
                      </div>
                      <button type="submit" class="myButton">Ajouter</button>
                      <button type="button" class="otherButton" onClick={()=>{setShowAddRegion(false)}}>Annuler</button>
                    </form>
                  </div>
                </div>
                
              }
              {
                showNotif && 
                <div className="alert alert-success">
                {msg}
                <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setShowNotif(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
              
              }
              {
                showNotifError && 
                <div className="alert alert-danger">
                {msg}
                <button type="button" class="ml-2 mb-1 close" aria-label="Fermer" onClick={()=>{setShowNotifError(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>              
              }
              <h2 className='myFont text-center mt-3 mb-3'>Consommation moyenne et vente par commune</h2>
              <div>
                {!showAddConso &&
                  <button className='myButton mt-3 mb-1'onClick={()=>{setShowAddConso(true)}}> Ajouter</button>
                }
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
                          <th>Consommation (KWH/Client)</th>
                          <th>Vente (KWH)</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                          {
                              line && line.map((conso,i)=>
                              <tr key={conso.id}>
                                  <td>
                                      {i+1}
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
                                  <td>
                                      {conso.vente}
                                  </td>
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
  )
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
