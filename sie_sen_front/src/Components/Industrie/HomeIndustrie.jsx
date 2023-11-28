import React, {useState,useEffect} from 'react'
import industrieService from '../../Services/industrieService';
import { useForm } from 'react-hook-form';
import AnneeService from '../../Services/AnneeService';
import Tableau from './Tableau';
import TableauHorsProdEner from './TableauHorsProdEner';
import TableauNiveauProduction from './TableuNiveauProduction';
import TableauAutres from './TableauAutres';

export default function HomeIndustrie() {

    const [toggle, setToggle] = useState(1);
    const [niveauProd, setNiveauProd] = useState([])
    const [prodBrute, setProdBrute] = useState([])
    const [produit, setProduit] = useState([])
    const [horsProd, SetHorsProd] = useState([])
    const [autres, setAutres] = useState([])
    const [annee, setAnnee] = useState([])
    const [combustible, setCombustible] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [useHors,setUseHors] = useState([])
    const [showHistory,setShowHistory] = useState(false)

    const [anneeActuel, setAnneeActuel] = useState("")


    const [msg, setMsg] = useState('');
    const [notif, setNotif] = useState(false);
    const [notifErreur, setNotifErreur] = useState(false);

    /* form pop up */

    const [showFormProdBrute, setShowFormProdBrute] = useState(false)
    const [showFormHorsProdEner, setShowFormHorsProdEner] = useState(false)
    const [showFormNivProd, setShowFormNivProd] = useState(false)
    const [showFormAutres, setShowFormAutres] = useState(false)

    function getCurrentYear() {
        const currentYear = new Date().getFullYear();
        return currentYear;
      }

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

      const {
        register: register4,
        formState: { errors: errors4 },
        handleSubmit: handleSubmit4,
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
        industrieService.addProdBrute(prodData).then((res)=>{
            console.log("la reponse === ",res.data);
            if(res.data === "ok"){
                setShowFormProdBrute(false);
                setNotif(true);
                setMsg("production brute ajouté avec succès");
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
    const onSubmitAutres = (data)=>{
        console.log(data);
        let prodData = {
            ...data,
            "annee":anneeActuel,
            "sigle":localStorage.getItem("sigle")
        }; 
        console.log(prodData);
        industrieService.addAutres(prodData).then((res)=>{
            console.log("la reponse === ",res.data);
            if(res.data === "ok"){
                setShowFormAutres(false);
                setNotif(true);
                setMsg("Ajouté avec succès");
                window.location.reload();
                setToggle(4);
            }else{
                setNotifErreur(true);
                setMsg("Erreur lors de l'ajout");
            }
        }).catch((err)=>{
            setNotifErreur(true);
            setMsg("Erreur lors de l'ajout",err);
        })
    }

    const onSubmitHorsProdEner = (data)=>{
      console.log(data);
      let horsprodData = {
          ...data,
          "unite":"KWH",
          "annee":getCurrentYear()-1,
          "sigle":localStorage.getItem("sigle")
      }; 
      console.log(horsprodData.annee);
      industrieService.addHorsProd(horsprodData).then((res)=>{
          console.log("la reponse === ",res.data);
          if(res.data === "ok"){
              setShowFormHorsProdEner(false);
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

  const onSubmitNivProd = (data)=>{
    console.log(data);
    let nivprodData = {
        ...data,
        "sigle":localStorage.getItem("sigle")
    }; 
    console.log(nivprodData);
    industrieService.addNivProd(nivprodData).then((res)=>{
        console.log("la reponse === ",res.data);
        if(res.data === "ok"){
            setShowFormNivProd(false);
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
        industrieService.getAllProdBrute(localStorage.getItem("sigle")).then((res)=>{
            console.log('data production brute', res);
            setProdBrute(res.data)
        }).catch((err)=>{
            console.log("error recupération ",err)
        })

        /* Annee actuelle */
        AnneeService.getAnneeActu().then((res)=>{
            console.log(res.data[0].annee)
            setAnneeActuel(res.data[0].annee)
        }).catch((err)=>{
            console.log("error recupération annee actu",err)
        })
        /* récupération niveau de production */
        industrieService.getAllNivProd(localStorage.getItem("sigle")).then((res)=>{
            console.log('data niveau de production', res);
            setNiveauProd(res.data)
        }).catch((err)=>{
            console.log("error recupération ",err)
        })

        /* récupération utilisation hors production energetique */

        industrieService.getAllHorsProd(localStorage.getItem("sigle")).then((res)=>{
            console.log('data utilisation hors production energetique', res);
            SetHorsProd(res.data)
            const year = getCurrentYear()-1;
            setFilteredData(res.data.filter(a => a.annee - year === 0))
            console.log('données === ',res.data,"données filtrer ==== ",filteredData)

        }).catch((err)=>{
            console.log("error recupération ",err)
        })
        /* récupération autres */

        industrieService.getAllAutres(localStorage.getItem("sigle")).then((res)=>{
            console.log('data autres', res);
            setAutres(res.data)
        }).catch((err)=>{
            console.log("error recupération ",err)
        })

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

        industrieService.getAllProduits().then((res)=>{
          setProduit(res.data)
      }).catch((err)=>{
          console.log("error recupération ",err)
      })
      /* get data current year */
      industrieService.getUseHorsCurrentYear({"annee":getCurrentYear()-1,"sigle":localStorage.getItem("sigle")}).then((res)=>{
        setUseHors(res.data);
        console.log("data current year ++++++++++",res.data);
      }).catch((err)=>{
        console.log("error recupération use hors",err)
      }) 

      const newArray = horsProd.filter(a => a.annee == getCurrentYear()-1);
      console.log('données === ',horsProd,"données filtrer ==== ",newArray)
    },[])

    function setShowHistoryNew(){
        setShowHistory(!showHistory)
    }

    function UpdateToggle(id){
        setToggle(id)
    }


  return (
    <div className='marTop'>
        <h1 className='myFont text-center mt-3 mb-3'>Modèle Industrie : {localStorage.getItem("sigle")}</h1>
        <div className='d-flex align-items-center justify-content-center'>
            <div className='col-12 tab p-2 '>
                <ul className='d-flex'>
                    <li className={toggle === 1 ?'flex-fill bgli':'bg-li'} onClick={()=>UpdateToggle(1)}>Production brute</li>
                    <li className={toggle === 2 ?'flex-fill bgli':'bg-li'} onClick={()=>UpdateToggle(2)}>Utilisation hors production énergétique</li>
                    <li className={toggle === 3 ?'flex-fill bgli':'bg-li'} onClick={()=>UpdateToggle(3)}>Niveau de production</li>
                    <li className={toggle === 4 ?'flex-fill bgli':'bg-li'} onClick={()=>UpdateToggle(4)}>Autres</li>
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
                
                    <h2>Production brute</h2>

                    {/* ajout producduction Brute  */}
                    {
                        showFormProdBrute && 
                        <div className="container mt-3 card">
   
                        <h4 className='myFont text-center'>
                           Ajout production brute
                        </h4> 
                        
                     <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                          <div className="col-md-6">
                          <div class="form-group">
                              <label for="combustible">Combustible :</label>
                              <select id="selectField" name="selectField" className="form-select" {...register("idComb")} required >
                             <option>Choisir un combustible</option>
                               {combustible.map((option) => (
                                 <option key={option.id} value={option.id}>{option.titre}</option>
                               ))}
                             </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                              <label for="casNonFournie">Année</label>
                              <select id="selectField" name="selectField" className="form-select" {...register("idAnnee")} required >
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
                            {...register("unite")}
                            required
                            />
                        </div>
                        <div className="form-group">
                         <label for="QUANTITE">Quantité :</label>
                         <input 
                            type="number"
                            step="0.01" 
                            class="form-control" 
                            name='quantite' id="quantite" 
                            placeholder="Entrez la Quantité " 
                            {...register("quantite")}
                            required
                            />
                        </div>
                       </div>
                       <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                       <button type="reset" className="otherButton" onClick={()=>{setShowFormProdBrute(false)} }>Annuler</button>
                 
                     </form>
                   </div>
                    }
                    {/* end prod brute form */}
                    {!showFormProdBrute &&
                    <div>
                        <button className='myButton mt-3 mb-1' onClick={()=>setShowFormProdBrute(true)}>Ajouter</button>
                    </div>
                    }
                    <Tableau data={prodBrute}/>
                </div>
                <div className={toggle === 2 ? 'show-content':'content'}>
                    
                    <h2>Utilisation hors production énergétique</h2>
                    
                        <button className='myButton mt-3 mb-1' Style="float:right" onClick={()=>setShowHistoryNew()}>{showHistory ? "Fermer historique" : " Historique"}</button>
                        { !showHistory &&
                        <div className="container mt-3 card bg-light">
    
                            <h4 className='myFont text-center'>
                            Ajout utilisation hors production énergétique
                            </h4> 
                            
                        <form onSubmit={handleSubmit2(onSubmitHorsProdEner)}>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                            <div className="col-md-6">
                            <div class="form-group">
                                <label for="combustible">Combustible :</label>
                                <select id="selectField" name="selectField" className="form-select" {...register2("idComb")} required >
                                <option>Choisir un combustible</option>
                                {combustible.map((option) => (
                                    <option key={option.id} value={option.id}>{option.titre}</option>
                                ))}
                                </select>
                                </div>
                            </div>
                            
                            <div className="form-group">
                            <label for="QUANTITE">Quantité (KWH):</label>
                            <input 
                                type="number"
                                step="0.01" 
                                class="form-control" 
                                name='quantite' id="quantite" 
                                placeholder="Entrez la Quantité " 
                                {...register2("quantite")}
                                required
                                />
                            </div>
                        </div>
                        <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                        <button type="reset" className="otherButton" onClick={()=>{setShowFormHorsProdEner(false)} }>Annuler</button>
                    
                        </form>
                        <table className="table table-striped table-bordered mt-1 myfont">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Année</th>
                                    <th scope="col">Combustible</th>
                                    <th scope="col">Quantité (kwh)</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                   filteredData && filteredData.map(
                                        (prod,i) => <tr key={prod.id} className='text-center paddCell'>
                                            <td >{i+1}</td>
                                            <td className='text-center'>{prod.titre}</td>
                                            <td>{prod.annee}</td>
                                            <td>{prod.quantite}</td>
                                            <td>
                                                <button className='action'>
                                                    <span class="material-icons">
                                                        edit
                                                    </span>
                                                </button>
                                                <button className='action'/*  onClick={()=>confirmation(prod.id)} */>
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
                    }
                    {showHistory &&
                    <TableauHorsProdEner data={horsProd}/>
                    }
                </div>
                <div className={toggle === 3 ? 'show-content':'content'}>
                {
                        showFormNivProd && <div className="container mt-3 card">
   
                        <h4 className='myFont text-center'>
                           Ajout information niveau de production
                        </h4> 
                        
                     <form onSubmit={handleSubmit3(onSubmitNivProd)}>
                       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                          <div className="col-md-6">
                          <div class="form-group">
                              <label for="combustible">Produit industriel :</label>
                              <select id="selectField" name="selectField" className="form-select" {...register3("idProduit")} required >
                             <option>Choisir un produit industriel</option>
                               {produit.map((option) => (
                                 <option key={option.id} value={option.id}>{option.nomProduit}</option>
                               ))}
                             </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                              <label for="casNonFournie">Année</label>
                              <select id="selectField" name="selectField" className="form-select" {...register3("idAnnee")} required >
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
                            {...register3("quantite")}
                            required
                            />
                        </div>
                       </div>
                       <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                       <button type="reset" className="otherButton" onClick={()=>{setShowFormNivProd(false)} }>Annuler</button>
                 
                     </form>
                   </div>
                    }
                    <h2>Niveau de production</h2>
                    {!showFormNivProd &&
                    <div>
                        <button className='myButton mt-3 mb-1' onClick={()=>setShowFormNivProd(true)}>Ajouter</button>
                    </div>                 
                    }
                    <TableauNiveauProduction data={niveauProd}/>
                </div>
                <div className={toggle === 4 ? 'show-content':'content'}>
                {
                        showFormAutres && 
                        <div className="container mt-3 card">
   
                        <h4 className='myFont text-center'>
                           Ajout données macroéconomiques
                        </h4> 
                        
                     <form onSubmit={handleSubmit4(onSubmitAutres)}>
                       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 g-3 shadow-lg m-3 p-3 ">
                        <div className="col-md-6">
                        <div className="form-group">
                              <label for="casNonFournie">Année</label>
                              <select id="selectField" name="selectField" className="form-select" {...register4("idAnnee")} required >
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
                            {...register4("unite")}
                            required
                            />
                        </div>
                        <div className="form-group">
                         <label for="prodTotal">Production Totale:</label>
                         <input type="number"
                            class="form-control" 
                            name='prodTotal' id="prodTotal" 
                            placeholder="Entrez la production totale " 
                            {...register4("prodTotal")}
                            required
                            />
                        </div>
                        <div className="form-group">
                         <label for="consoTotal">Consommation Totale:</label>
                         <input type="number"
                            class="form-control" 
                            name='consoTotal' id="consoTotal" 
                            placeholder="Entrez la consommation totale " 
                            {...register4("consoTotal")}
                            required
                            />
                        </div>
                        <div className="form-group">
                         <label for="venteElec">Vente d'électricité:</label>
                         <input type="number"
                            class="form-control" 
                            name='venteElec' id="venteElec" 
                            placeholder="Entrez la vente d'électricité totale " 
                            {...register4("venteElec")}
                            required
                            />
                        </div>
                        <div className="form-group">
                         <label for="achatElec">Achat d'électricité':</label>
                         <input type="number"
                            class="form-control" 
                            name='achatElec' id="achatElec" 
                            placeholder="Entrez l'achat totale d'électricité " 
                            {...register4("achatElec")}
                            required
                            />
                        </div>
                       </div>
                       <button type="submit" className="myButton mt-3 mb-3">Ajouter</button>
                       <button type="reset" className="otherButton" onClick={()=>{setShowFormAutres(false)} }>Annuler</button>
                 
                     </form>
                   </div>
                    }
                    <h2>Autres</h2>
                    {!showFormAutres && 
                    <div>
                        <button className='myButton mt-3 mb-1'onClick={()=>setShowFormAutres(true)}>Ajouter</button>
                    </div>                  
                    }
                    <TableauAutres data={autres}/>
                </div>
            
            </div>
        </div>
        
    </div>
  );

}
