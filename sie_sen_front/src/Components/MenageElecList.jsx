import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenageElecZRService from '../Services/MenageElecZRService';
import AnneeService from '../Services/AnneeService';
import RegionService from '../Services/regionService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CommuneService from '../Services/CommuneService';
import { useForm } from 'react-hook-form';

export default function MenageElecList() {

    const Navigate = useNavigate();
    const [menage, setMenage] = useState([]);
    const [menageZU, setMenageZU] = useState([]);
    const [annee, setAnnee] = useState([]);
    const [region, setRegion] = useState([]);
    const [showAddZU, setShowAddZU] = useState(false);
    const [showAddZR, setShowAddZR] = useState(false);

    const [commune, setCommune] = useState([]);
    const [msg, setMsg] = useState('');
    const [showNotif,setShowNotif] = useState(false);
    const [showNotifError,setShowNotifError] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        mode: "onBlur",
      });

      const {
        register :register2,
        formState: { errors2 },
        handleSubmit : handleSubmit2,
      } = useForm({
        mode: "onBlur",
      });

    const onSubmit=(data)=>{
        MenageElecZRService.AddZU(data).then((res)=>{
         console.log(data);
             setShowAddZU(false);
             window.location.reload();
             setShowNotif(true);
             setMsg("nombre ménage ajouté avec Succès")
        }).catch((err)=>{
         setShowNotifError(true);
         setMsg("Erreur ajout nombre de ménage Réessayez SVP")
        })
     }
     const onSubmit2=(data)=>{
        MenageElecZRService.Add(data).then((res)=>{
         console.log(data);
             setShowAddZR(false);
             window.location.reload();
             setShowNotif(true);
             setMsg("nombre ménage ajouté avec Succès")
        }).catch((err)=>{
         setShowNotifError(true);
         setMsg("Erreur ajout nombre de ménage Réessayez SVP")
        })
     }


    useEffect(()=>{
        MenageElecZRService.getAll().then((res)=>{
        setMenage(res.data);
         console.log("les données des menage ZR",menage);
        }).catch((err)=>{
         console.log("error get all ",err);
        })
        
        MenageElecZRService.getAllZU().then((res)=>{
            setMenageZU(res.data);
        }).catch((err)=>{
            console.log("error get all ZU");
        })

        AnneeService.getAll().then((res)=>{
            setAnnee(res.data);
        }).catch((err)=>{
            console.log("error : ",err);
        })

          CommuneService.getAll().then((res)=>{
              setCommune(res.data);
              
          }).catch((err)=>{
              console.log("error get all commune  ",err);
          })

        RegionService.getRegions().then((res)=>{
            setRegion(res.data);
        }).catch((err)=>{
            console.log("error : ",err);
        })
 
     },[])

     /* const redirection = (id)=>{
        Navigate(`/AddMenageZRPage/${id}`);
    } */
console.log("données liste ménages    ",menage);
console.log("annéé  :",annee);
console.log("Regions  :",region);

  return (
    
<div class="container marTop">
<a href="/electricite"><button className='myButton'> &#8592; Menu Principal</button></a>
{
    showAddZU && 
    <div className="container mt-3 card">
   
                        <h4 className='myFont text-center'>
                        Ajout ménage électrifié par commune (zone urbaine)
                        </h4> 
                        
                     <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                          <div className="col-md-6">
                          <div class="form-group">
                              <label for="niveauTension">Commune :</label>
                              <select id="selectField" name="selectField" className="form-select" {...register("idCommune")} required >
                             <option>Choisir une Commune</option>
                               {commune.map((option) => (
                                 <option key={option.id} value={option.id}>{option.nomCommune}</option>
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
                            placeholder="Entrez le nombre de client " 
                            {...register("menage_elec_ZU")}
                            required
                            />
                        </div>
                       </div>
                       <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                       <button type="reset" className="otherButton" onClick={()=>{setShowAddZU(false)} }>Annuler</button>
                 
                     </form>
    </div>
}
{
    showAddZR && 
    <div className="container mt-3 card">
   
                        <h4 className='myFont text-center'>
                             Ajout ménage électrifié par commune (zone rurale)
                        </h4> 
                        
                     <form onSubmit={handleSubmit2(onSubmit2)}>
                       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                          <div className="col-md-6">
                          <div class="form-group">
                              <label for="commune">Commune :</label>
                              <select id="selectField" name="selectField" className="form-select" {...register2("idCommune")} required >
                             <option>Choisir une Commune</option>
                               {commune.map((option) => (
                                 <option key={option.id} value={option.id}>{option.nomCommune}</option>
                               ))}
                             </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div class="form-group">
                              <label for="casNonFournie">Année</label>
                              <select id="selectField" name="selectField" className="form-select" {...register2("idAnnee")} required >
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
                            placeholder="Entrez le nombre de client " 
                            {...register2("menage_elec_ZR")}
                            required
                            />
                        </div>
                       </div>
                       <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                       <button type="reset" className="otherButton" onClick={()=>{setShowAddZR(false)} }>Annuler</button>
                 
                     </form>
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

  <div>
  <h3 className='text-center myFont'>Les ménages électrifiés en zone urbaine</h3>
  {!showAddZU &&
  <button type='button' className='myButton mt-2 mb-1' onClick={()=>setShowAddZU(true)}><AddCircleOutlineIcon/> Ajouter</button>
  }
    <table className='table table-stripped table-bordered'>
        <thead className='primary text-white'>
            <tr>
            <th>ID</th>
                <th>Commune</th>
                <th>Année</th>
                <th>Ménage Electrifié</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {menageZU.map
                (menage =>
                    <tr>
                        <td>{menage.id}</td>
                        <td>{menage.nomCommune}</td>
                        <td>{menage.menage_elec_ZU}</td>
                        <td>{menage.menage_elec_ZU}</td>
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
  </div>
  <div>
    <h3 className='text-center myFont'>Les ménages électrifiés en zone rurale</h3>
    {!showAddZR && 
    <button type='button' className='myButton mt-2 mb-1' onClick={()=>{setShowAddZR(true)}}><AddCircleOutlineIcon/> Ajouter</button>
    }
    <table className='table table-stripped table-bordered'>
        <thead className='primary text-white'>
            <tr>
                <th>ID</th>
                <th>Commune</th>
                <th>Année</th>
                <th>Ménage Electrifié</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {menage.map
                (menage =>
                    <tr>
                        <td>{menage.id}</td>
                        <td>{menage.nom_commune}</td>
                        <td>{menage.annee}</td>
                        <td>{menage.menage_elec_ZR}</td>
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
  </div>
</div>

  )
}
