import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteService from '../Services/SiteService';
import { useForm } from 'react-hook-form';
import AnneeService from '../Services/AnneeService';
import AchatEnergieParSenelecService from '../Services/AchatEnergieParSenelecService';

export default function AddAchatFormComponent() {
    const Navigate = useNavigate();
    const [site, setSite] = useState([]);
    const [annee, setAnnee] = useState([]);
    const [error, setError] = useState("");
    const {register, handleSubmit, errors} = useForm();


    useEffect(()=>{
        SiteService.GetAll().then((res)=>{
            setSite(res.data);
        }).catch((err)=>{
            console.log("error : ",err);
        });

        AnneeService.getAll().then((res)=>{
          setAnnee(res.data);
        }).catch((err)=>{
          console.log("error get annee  = ",err)
        })
    },[])

    const onSubmit=(data)=>{
        console.log(data);
        const achat = {
          idSiteProduction:data.idSiteProduction,
          idAnnee:data.idAnnee,
          unite:data.unite,
          quantite:data.quantite
        };
        AchatEnergieParSenelecService.Add(achat).then((res)=>{
          const resp=res.data;
          if(resp ==='ok'){
            Navigate('/achatsenelec');
            window.location.reload();
          }else{
            console.log("error : ",res.data);
            setError("une erreur est servenue réessayez SVP");
          }

        }).catch((err)=>{
          setError("une erreur est servenue réessayez SVP");
        })
       
        
    }
    console.log("les annéess ma xolll  ",annee);
  return (
    <div className="container mt-3 card">
   
       <h4 className='myFont text-center'>
            Formulaire : Achat Energie Par SENELEC
        </h4> 
       
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        error && <div className="alert alert-danger" role="alert">
          {error}
          </div>
      }
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
         <div className="col-md-6">
         <div className="card">
           <div className="card-header">Site de Production</div>
           <div className="card-body">
             <select id="selectField" name="selectField" className="form-select" {...register("idSiteProduction")} required >
             <option>Choisir un Site</option>
               {site.map((option) => (
                 <option key={option.id} value={option.id}>{option.site}</option>
               ))}
             </select>
           </div>
         </div>
       </div>
       <div className="col-md-6">
       <div className="card">
              <div className="card-header">Année</div>
              <div className="card-body">
                <select id="selectField" name="selectField" className="form-select" {...register("idAnnee")} required>
                <option>Choisir une Année</option>
                  {annee.map((option) => (
                    <option key={option.id} value={option.id}>{option.annee}</option>
                  ))}
                </select>
              </div>
            </div>
        </div>
       <div key='UNITE' className="col-md-6">
            <div className="card">
              <div className="card-header">Unité</div>
              <div className="card-body">
                <input type="text" id='unite' 
                  name='unite' className="form-control"
                  placeholder='Unité de mesure' 
                  {...register("unite")}
                  required
                  />
              </div>
            </div>
          </div>
        <div key='QUANTITE' className="col-md-6">
            <div className="card">
              <div className="card-header">Quantité</div>
              <div className="card-body">
                <input type="text" id='quantite'
                 name='quantite' className="form-control"
                 placeholder='Saisir la Quantité'
                {...register("quantite")}
                required
                />
              </div>
            </div>
        </div>
      </div>
      <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
      <button type="reset" className="otherButton mt-3 ml-3 mb-3">Annuler</button>

    </form>
  </div>
  )
}


