import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import industrieService from '../../Services/industrieService';
import AnneeService from '../../Services/AnneeService';
import TableauAutoConsommation from './TableauAutoConsommation';
import TableauConsoEner from './TableauConsoEner';
import TableauDonneeHydro from './TableauDonneeHydro';
import HydrocarbureService from '../../Services/HydrocarbureService';

export default function HomeHydrocarbure() {
    const [toggle, setToggle] = useState(1);
    const [donneeHydro, setDonneeHydro] = useState([])
    const [consoEner, setConsoEner] = useState([])
    const [produit, setProduit] = useState([])
    const [autoConso, SetAutoConso] = useState([])
    const [annee, setAnnee] = useState([])
    const [combustible, setCombustible] = useState([])
    const [typeDonnee, setTypeDonnee] = useState([])
    const [rubrique, setRubrique] = useState([])
    const [rubrique1, setRubrique1] = useState([])
    const [rubrique2, setRubrique2] = useState([])

    const [msg, setMsg] = useState('');
    const [notif, setNotif] = useState(false);
    const [notifErreur, setNotifErreur] = useState(false);
/* forms */
    const [showFormConsoEner, setShowFormConsoEner] = useState(false)
    const [showFormAutoConso, setShowFormAutoConso] = useState(false)
    const [showFormDonneeHydro, setShowFormDonneeHydro] = useState(false)

    const {register, handleSubmit} = useForm();
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


    const onSubmit = (data)=>{
        console.log(data);
        let prodData = {
            ...data,
            "sigle":localStorage.getItem("sigle")
        }; 
        console.log(prodData);
        HydrocarbureService.addConsoEner(prodData).then((res)=>{
            console.log("la reponse === ",res);
            if(res.status == 200){
                setShowFormConsoEner(false);
                setNotif(true);
                setMsg("consommation energetique ajouté avec succès");
                window.location.reload();
            }else{
                setNotifErreur(true);
                setMsg("Erreur lors de l'ajout");
            }
        }).catch((err)=>{
            setNotifErreur(true);
            setMsg("Erreur lors de l'ajout",err);
        })
    }

    const onSubmitAutoConso = (data)=>{
      console.log(data);
      let autoConso = {
          ...data,
          "sigle":localStorage.getItem("sigle")
      }; 
      console.log(autoConso);
      HydrocarbureService.addAutoConso(autoConso).then((res)=>{
          console.log("la reponse === ",res.data);
          if(res.status == 200){
              setShowFormAutoConso(false);
              setNotif(true);
              setMsg("Ajouté avec succès");
              window.location.reload();
              setToggle(2);
          }else{
              setNotifErreur(true);
              setMsg("Erreur lors de l'ajout");
          }
      }).catch((err)=>{
          setNotifErreur(true);
          setMsg("Erreur lors de l'ajout",err);
      })
  }

  const onSubmitDonneeHydro = (data)=>{
    console.log(data);
    let donneeHydrocarbure = {
        ...data,
        "rubrique3":localStorage.getItem("sigle")
    }; 
    console.log(donneeHydrocarbure);
    HydrocarbureService.addDonneesHydrocarbures(donneeHydrocarbure).then((res)=>{
        console.log("la reponse === ",res.data);
        if(res.status == 200){
            setShowFormDonneeHydro(false);
            setNotif(true);
            setMsg("Ajouté avec succès");
            window.location.reload();
            setToggle(3);
        }else{
            setNotifErreur(true);
            setMsg("Erreur lors de l'ajout");
        }
    }).catch((err)=>{
        setNotifErreur(true);
        setMsg("Erreur lors de l'ajout",err);
    })
}

useEffect(()=>{
    /* récupération production brute */
    HydrocarbureService.getAllConsoEner(localStorage.getItem("sigle")).then((res)=>{
        console.log('data production brute', res);
        setConsoEner(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })

    /* récupération niveau de production */
    HydrocarbureService.getAllDonneesHydrocarbures(localStorage.getItem("sigle")).then((res)=>{
        console.log('data niveau de production', res);
        setDonneeHydro(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })

    /* récupération rubrique 1 et 2 */

    HydrocarbureService.getAllRubrique1().then((res)=>{
        console.log('les rubriques 1', res);
        setRubrique1(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })

    HydrocarbureService.getAllRubrique2().then((res)=>{
        console.log('les rubriques 2', res);
        setRubrique2(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })

    /* recup type de données */

    HydrocarbureService.getAllTypeDonnees().then((res)=>{
        console.log('les types de données ', res);
        setTypeDonnee(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })
    /* récupération utilisation hors production energetique */

    HydrocarbureService.getAllAutoConso(localStorage.getItem("sigle")).then((res)=>{
        console.log('donnée auto consommation', res);
        SetAutoConso(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })
    /* récupération autres */

    AnneeService.getAll().then((res)=>{
        setAnnee(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })

    industrieService.getAllCombustible().then((res)=>{
        setCombustible(res.data)
    }).catch((err)=>{
        console.log("error recupération ",err)
    })

    HydrocarbureService.getAllRubrique().then((res)=>{
        setRubrique(res.data)
    }).catch((err)=>{
        console.log("error recupération rubrique",err)
    })

    industrieService.getAllProduits().then((res)=>{
      setProduit(res.data)
  }).catch((err)=>{
      console.log("error recupération ",err)
  })

},[])



function UpdateToggle(id){
    setToggle(id)
}

  return (
    <div className='marTop'>
    <h1 className='myFont text-center mt-3 mb-3'>Modèle hydrocarbure : {localStorage.getItem("sigle")}</h1>
    <div className='d-flex align-items-center justify-content-center'>
        <div className='col-12 tab p-2 '>
            <ul className='d-flex'>
                <li className={toggle === 1 ?'flex-fill bgli':'bg-li'} onClick={()=>UpdateToggle(1)}>Consommation énergétique</li>
                <li className={toggle === 2 ?'flex-fill bgli':'bg-li'} onClick={()=>UpdateToggle(2)}>Auto-consommation</li>
                <li className={toggle === 3 ?'flex-fill bgli':'bg-li'} onClick={()=>UpdateToggle(3)}>Table Hydrocarbure</li>
            </ul>
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


            <div className={toggle === 1 ? 'show-content':'content'}>
                {/* ajout producduction Brute  */}
                {
                    showFormConsoEner && 
                    <div className="container mt-3 card">

                    <h4 className='myFont text-center'>
                       Ajout consommation énergétique
                    </h4> 
                    
                 <form onSubmit={handleSubmit(onSubmit)}>
                   <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                   <div className="col-md-6">
                      <div class="form-group">
                          <label for="combustible">Rubrique :</label>
                          <select id="selectField" name="selectField" className="form-select" {...register("rubrique")} required >
                         <option>Choisir la rubrique</option>
                           {rubrique.map((option) => (
                             <option key={option.id} value={option.libelle}>{option.libelle}</option>
                           ))}
                         </select>
                        </div>
                    </div>
                      <div className="col-md-6">
                      <div class="form-group">
                          <label for="combustible">Produits :</label>
                          <select id="selectField" name="selectField" className="form-select" {...register("produit")} required >
                         <option>Choisir le produit</option>
                           {combustible.map((option) => (
                             <option key={option.id} value={option.titre}>{option.titre}</option>
                           ))}
                         </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                          <label for="casNonFournie">Année</label>
                          <select id="selectField" name="selectField" className="form-select" {...register("annee")} required >
                         <option>Choisir une année</option>
                           {annee.map((option) => (
                             <option key={option.id} value={option.annee}>{option.annee}</option>
                           ))}
                         </select>
                        </div>
                     </div>
                     <div className="form-group">
                     <label for="UNITE">Unite</label>
                     <input type="text"
                        class="form-control" 
                        name='unite' id="unite" 
                        placeholder="Entrez l'unité de mesure" 
                        {...register("unite")}
                        required
                        />
                    </div>
                    <div className="form-group">
                     <label for="QUANTITE">Quantité :</label>
                     <input type="number"
                        class="form-control" 
                        name='quantite' id="quantite" 
                        placeholder="Entrez la Quantité " 
                        {...register("quantite")}
                        required
                        />
                    </div>
                    <div className="form-group">
                     <label for="elecBruteProd">Electricité Brute Produite en MWH :</label>
                     <input type="number"
                        class="form-control" 
                        name='quantite' id="quantite" 
                        placeholder="Entrez l'électricité Brute Produite en MWH  " 
                        {...register("elecBruteProd")}
                        required
                        />
                    </div>
                   </div>
                   <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                   <button type="reset" className="otherButton" onClick={()=>{setShowFormConsoEner(false)} }>Annuler</button>
             
                 </form>
               </div>
                }
                {/* end prod brute form */}
                {!showFormConsoEner &&
                <div>
                    <button className='myButton mt-3 mb-1' onClick={()=>setShowFormConsoEner(true)}>Ajouter</button>
                </div>
                }
                <TableauConsoEner data={consoEner}/>
            </div>
            <div className={toggle === 2 ? 'show-content':'content'}>
                {
                    showFormAutoConso && <div className="container mt-3 card">

                    <h4 className='myFont text-center'>
                       Ajout auto-consommation
                    </h4> 
                    
                 <form onSubmit={handleSubmit2(onSubmitAutoConso)}>
                   <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                      <div className="col-md-6">
                      <div class="form-group">
                          <label for="combustible">Produit :</label>
                          <select id="selectField" name="selectField" className="form-select" {...register2("produit")} required >
                         <option>Choisir le produit</option>
                           {combustible.map((option) => (
                             <option key={option.id} value={option.titre}>{option.titre}</option>
                           ))}
                         </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                          <label for="casNonFournie">Année</label>
                          <select id="selectField" name="selectField" className="form-select" {...register2("annee")} required >
                         <option>Choisir une Année</option>
                           {annee.map((option) => (
                             <option key={option.id} value={option.annee}>{option.annee}</option>
                           ))}
                         </select>
                        </div>
                     </div>
                     <div className="form-group">
                     <label for="UNITE">Unite</label>
                     <input type="text"
                        class="form-control" 
                        name='unite' id="unite" 
                        placeholder="Entrez l'unité de mesure" 
                        {...register2("unite")}
                        required
                        />
                    </div>
                    <div className="form-group">
                     <label for="QUANTITE">Quantité :</label>
                     <input type="number"
                        class="form-control" 
                        name='quantite' id="quantite" 
                        placeholder="Entrez la Quantité " 
                        {...register2("quantite")}
                        required
                        />
                    </div>
                   </div>
                   <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                   <button type="reset" className="otherButton" onClick={()=>{setShowFormAutoConso(false)} }>Annuler</button>
             
                 </form>
               </div>
                }
                {!showFormAutoConso &&
                <div>
                    <button className='myButton mt-3 mb-1' onClick={()=>setShowFormAutoConso(true)}>Ajouter</button>
                </div>
                }
                <TableauAutoConsommation data={autoConso}/>
            </div>
            <div className={toggle === 3 ? 'show-content':'content'}>
            {
                    showFormDonneeHydro && <div className="container mt-3 card">

                    <h4 className='myFont text-center'>
                       Ajout à la table hydrocarbure
                    </h4> 
                    
                 <form onSubmit={handleSubmit3(onSubmitDonneeHydro)}>
                   <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                   <div className="col-md-6">
                      <div class="form-group">
                          <label for="typeDonnee">Type de Donnée :</label>
                          <select id="selectField" name="selectField" className="form-select" {...register3("typeDonnee")} required >
                         <option>Choisir le type de donnée</option>
                           {typeDonnee.map((option) => (
                             <option key={option.id} value={option.libelle}>{option.libelle}</option>
                           ))}
                         </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-group">
                          <label for="rubrique1">Rubrique 1 :</label>
                          <select id="selectField" name="selectField" className="form-select" {...register3("rubrique1")} required >
                         <option>Choisir la rubrique 1</option>
                           {rubrique1.map((option) => (
                             <option key={option.id} value={option.libelle}>{option.libelle}</option>
                           ))}
                         </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                      <div class="form-group">
                          <label for="rubrique2">Rubrique 2 :</label>
                          <select id="selectField" name="selectField" className="form-select" {...register3("rubrique2")} required >
                         <option>Choisir la rubrique 2</option>
                           {rubrique2.map((option) => (
                             <option key={option.id} value={option.libelle}>{option.libelle}</option>
                           ))}
                         </select>
                        </div>
                    </div>
                      <div className="col-md-3">
                      <div class="form-group">
                          <label for="combustible">Produit :</label>
                          <select id="selectField" name="selectField" className="form-select" {...register3("produitsDetail")} required >
                         <option>Choisir un produit</option>
                           {combustible.map((option) => (
                             <option key={option.id} value={option.titre}>{option.titre}</option>
                           ))}
                         </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                    <div className="form-group">
                          <label for="casNonFournie">Année</label>
                          <select id="selectField" name="selectField" className="form-select" {...register3("annee")} required >
                         <option>Choisir une Année</option>
                           {annee.map((option) => (
                             <option key={option.id} value={option.id}>{option.annee}</option>
                           ))}
                         </select>
                        </div>
                     </div>
                     <div className="form-group">
                     <label for="UNITE">Unite</label>
                     <input type="text"
                        class="form-control" 
                        name='unite' id="unite" 
                        placeholder="Entrez l'unité de mesure" 
                        {...register3("unite")}
                        required
                        />
                    </div>
                    <div className="form-group">
                     <label for="QUANTITE">Quantité :</label>
                     <input type="number"
                        class="form-control" 
                        name='quantite' id="quantite" 
                        placeholder="Entrez la Quantité " 
                        {...register3("valeur")}
                        required
                        />
                    </div>
                   </div>
                   <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                   <button type="reset" className="otherButton" onClick={()=>{setShowFormDonneeHydro(false)} }>Annuler</button>
             
                 </form>
               </div>
                }
                {!showFormDonneeHydro &&
                <div>
                    <button className='myButton mt-3 mb-1' onClick={()=>setShowFormDonneeHydro(true)}>Ajouter</button>
                </div>                 
                }
                <TableauDonneeHydro data={donneeHydro}/>
            </div>        
        </div>
    </div>
    
</div>
  )
}
