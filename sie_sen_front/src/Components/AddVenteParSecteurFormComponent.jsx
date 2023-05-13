import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SiteService from '../Services/SiteService';
import SecteurService from '../Services/SecteurService';
import AnneeService from '../Services/AnneeService';
import VenteParSecteurService from '../Services/VenteParSecteurService';
import { useNavigate } from 'react-router-dom';

export default function AddVenteParSecteurFormComponent() {

    const {register, handleSubmit} = useForm();
    const [error , setError] = useState('');
    const [secteur, setSecteur] = useState([]);
    const [annee, setAnnee] = useState([]);

    const Navigate = useNavigate();

    useEffect(()=>{
        SecteurService.getAll().then((res)=>{
            setSecteur(res.data);
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
        const vente = {
          idSecteur:data.idSecteur,
          idAnnee:data.idAnnee,
          unite:data.unite,
          quantite:data.quantite
        };
        VenteParSecteurService.add(vente).then((res)=>{
          const resp=res.data;
          if(resp ==='ok'){
            Navigate('/venteparsecteur');
            window.location.reload();
          }else{
            console.log("error : ",res.data);
            setError("une erreur est servenue réessayez SVP");
          }

        }).catch((err)=>{
          setError("une erreur est servenue réessayez SVP");
        })
       
        
    }

  return (
    <div className="container mt-3 card">
   
       <h4 className='myFont text-center'>
            Formulaire : Vente par Secteur d'activité
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
           <div className="card-header">Secteur d'activité</div>
           <div className="card-body">
             <select id="selectField" name="selectField" className="form-select" {...register("idSecteur")} required >
             <option>Choisir un Secteur</option>
               {secteur.map((option) => (
                 <option key={option.id} value={option.id}>{option.secteur}</option>
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
      <button type="reset" className="btn btn-warning mt-3 ml-3 mb-3">Annuler</button>

    </form>
  </div>
  )
}
