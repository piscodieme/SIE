import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import VenteEnergieNonFournieService from '../Services/VenteEnergieNonFournieService';
import AnneeService from '../Services/AnneeService';
import nonFournieService from '../Services/nonFournieService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function VenteEnergieNonFournie() {

    const Navigate = useNavigate();
    const [venteEnergie,setVenteEnergie] = useState([]);
    const [showAdd, setShowAdd] = useState();
    const [showAddVente, setShowAddVente] = useState();
    const [msg, setMsg] = useState({});
    const [showNotif,setShowNotif] = useState(false);
    const [showNotifError,setShowNotifError] = useState(false);
    const [nonFournie,setNonFournie] = useState([]);
    const [annee,setAnnee] = useState([]);

    const {register, handleSubmit} = useForm();
    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
      } = useForm({
        mode: "onBlur",
      });

    useEffect(()=>{
        VenteEnergieNonFournieService.getAll().then((res)=>{
            setVenteEnergie(res.data)
        }).catch((err)=>{
            console.log("erreur get all vente non fournie  == ",err)
        })

        AnneeService.getAll().then((res)=>{
            setAnnee(res.data);
        }).catch((err)=>{
            console.log("error get annee == ", err);
        })

        nonFournieService.getAll().then((res)=>{
            setNonFournie(res.data);
        }).catch((err)=>{
            console.log("error get non fournie == ", err);
        })


    },[])

    const onSubmit = (data)=>{
        nonFournieService.add(data).then((res)=>{          
                setMsg("CAS Ajouté avec Succès");
                setShowAdd(false);
                setShowNotif(true);
            
        }).catch((err)=>{
            setMsg("Ajout CAS Error Réessayez SVP");
            setShowNotifError(true);
        })
    }

    const onSubmit2 = (data)=>{
        VenteEnergieNonFournieService.add(data).then((res)=>{          
                setMsg("Vente Non Fournie Ajouté avec Succès");
                setShowAdd(false);
                setShowNotif(true);
            
        }).catch((err)=>{
            setMsg("Ajout Vente Non Fournie Error");
            setShowNotifError(true);
        })
    }

  return (
    <div className="marTop">
    {
        showAdd && 
        <div class="card">
        <div class="card-header">
          Ajouter Cas Non Fournie
          <button type="button" class="close" aria-label="Fermer" onClick={()=>{setShowAdd(false)}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <label for="casNonFournie">Nom du Cas :</label>
              <input type="text"
                  class="form-control" 
                  name='nom' id="casNonFournie" 
                  placeholder="Entrez le nom du cas" 
                  {...register("nom")}
                  required
                  />
            </div>
            <button type="submit" class="myButton">Ajouter</button>
            <button type="reset" class="otherButton" onClick={()=>{setShowAdd(false)}}>Annuler</button>
          </form>
        </div>
      </div>
      
    }
        
    {
        showAddVente &&
        <div className="container mt-3 card">
   
        <h4 className='myFont text-center'>
             Formulaire : Vente Energie Non Fournie
        </h4> 
        
     <form onSubmit={handleSubmit2(onSubmit2)}>
       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
          <div className="col-md-6">
          <div class="form-group">
              <label for="casNonFournie">Nom du Cas :</label>
              <select id="selectField" name="selectField" className="form-select" {...register2("id")} required >
             <option>Choisir un Cas</option>
               {nonFournie.map((option) => (
                 <option key={option.id} value={option.id}>{option.nom}</option>
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
         <label for="UNITE">Unité de Mesure :</label>
         <input type="text"
            class="form-control" 
            name='unite' id="unite" 
            placeholder="Entrez l'unité de mesure" 
            {...register2("unite")}
            required
            />
        </div>
        <div class="form-group">
         <label for="QUANTITE">Quantité :</label>
         <input type="text"
            class="form-control" 
            name='quantite' id="quantite" 
            placeholder="Entrez la quantité" 
            {...register2("quantite")}
            required
            />
        </div>
       </div>
       <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
       <button type="reset" className="btn btn-warning mt-3 ml-3 mb-3" onClick={()=>{setShowAddVente(false)} }>Annuler</button>
 
     </form>
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
    <h1 className='myFont text-center mt-3 mb-3'>Vente Energie Non Fournie</h1>
    <div>
        <button className='myButton mt-3 mb-1'onClick={()=>setShowAddVente(true)}><AddCircleOutlineIcon/> Vente</button>
        <button className='myButton mt-3 mb-1' Style='float:right' onClick={()=>setShowAdd(true)}><AddCircleOutlineIcon/> CAS</button>

    </div>
    <table className='table table-stripped table-bordered'>
        <thead className='primary'>
            <tr>
                <th>ID</th>
                <th>Cas Non Fournie</th>
                <th>Année</th>
                <th>Vente</th>
                
            </tr>
        </thead>
        <tbody>
            
                {
                    venteEnergie.map((vte,i)=>
                    <tr key={vte.id}>
                        <td>
                            {i}
                        </td>                                
                        <td>
                            {vte.nonFounie}
                        </td>
                        <td>
                            {vte.annee}                            
                        </td>
                        <td>
                            {vte.quantite}
                        </td>
                       
                    </tr>
                    )
                }
                
            
        </tbody>
    </table>
</div>
  )
}
