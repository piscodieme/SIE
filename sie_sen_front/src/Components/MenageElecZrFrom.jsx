import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import AnneeService from '../Services/AnneeService';
import MenageElecZRService from '../Services/MenageElecZRService';
import regionService from '../Services/regionService';
import {useNavigate, useParams } from 'react-router-dom';

const regions = ["Dakar", "Diourbel", "Fatick", "Kaffrine", "Kaolack", "Kédougou", "Kolda", "Louga", "Matam", "SaintLouis", "Sédhiou", "Tambacounda", "Thiès", "Ziguinchor"];
 
export default function MenageElecZrFrom() {
    const [opt, setOpt] = useState([]);
    const [region, setRegion] = useState([]);
    const [nbMenageZR, setNbMenageZR] = useState([]);
    const Params = useParams();
    const Navigate = useNavigate
    useEffect(()=>{
       AnneeService.getAll().then((res)=>{
       setOpt(res.data);
        console.log("les anneee ====== ", opt);
       }).catch((err)=>{
        console.log("Erreur Anneee",err);
       });

       regionService.getRegions().then((res)=>{
            setRegion(res.data);
            console.log("les regions ====== ", region);
       }).catch((err)=>{
        console.log("erreur liste region",err);
       });
    
       MenageElecZRService.getAll().then((res)=>{
        setNbMenageZR(res.data);
        console.log("les données des menage ZR",nbMenageZR);
       }).catch((err)=>{
        console.log("error get all ",err);
       })

    },[])

    

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
          if(Params.id ==="Urbaine"){
            const dataZU = [
                { region: "Dakar", annee: data.annee ,menage_elec_ZU:data.Dakar },
                { region: "Thiès", annee: data.annee ,menage_elec_ZU:data.Thiès },
                { region: "Diourbel", annee: data.annee ,menage_elec_ZU:data.Diourbel },
                { region: "Fatick", annee: data.annee ,menage_elec_ZU:data.Fatick },
                { region: "Kaffrine", annee: data.annee ,menage_elec_ZU:data.Kaffrine },
                { region: "Kaolack", annee: data.annee ,menage_elec_ZU:data.Kaolack },
                { region: "Kolda", annee: data.annee ,menage_elec_ZU:data.Kolda },
                { region: "Kédougou", annee: data.annee ,menage_elec_ZU:data.Kédougou },
                { region: "Louga", annee: data.annee ,menage_elec_ZU:data.Louga },
                { region: "Matam", annee: data.annee ,menage_elec_ZU:data.Matam },
                { region: "SaintLouis", annee: data.annee ,menage_elec_ZU:data.SaintLouis },
                { region: "Sédhiou", annee: data.annee ,menage_elec_ZU:data.Sédhiou },
                { region: "Tambacounda", annee: data.annee ,menage_elec_ZU:data.Tambacounda },
                { region: "Ziguinchor", annee: data.annee ,menage_elec_ZU:data.Ziguinchor },
    
              ];

            MenageElecZRService.AddZU(dataZU).then((res)=>{
                console.log(res.data);
                Navigate("/nbMenage");
              }).catch((err)=>{
                console.log("erreurr add Zone Urbaine ", err);
    
              })
          }else{
            const dataZR = [
                { region: "Dakar", annee: data.annee ,menage_elec_ZR:data.Dakar },
                { region: "Thiès", annee: data.annee ,menage_elec_ZR:data.Thiès },
                { region: "Diourbel", annee: data.annee ,menage_elec_ZR:data.Diourbel },
                { region: "Fatick", annee: data.annee ,menage_elec_ZR:data.Fatick },
                { region: "Kaffrine", annee: data.annee ,menage_elec_ZR:data.Kaffrine },
                { region: "Kaolack", annee: data.annee ,menage_elec_ZR:data.Kaolack },
                { region: "Kolda", annee: data.annee ,menage_elec_ZR:data.Kolda },
                { region: "Kédougou", annee: data.annee ,menage_elec_ZR:data.Kédougou },
                { region: "Louga", annee: data.annee ,menage_elec_ZR:data.Louga },
                { region: "Matam", annee: data.annee ,menage_elec_ZR:data.Matam },
                { region: "SaintLouis", annee: data.annee ,menage_elec_ZR:data.SaintLouis },
                { region: "Sédhiou", annee: data.annee ,menage_elec_ZR:data.Sédhiou },
                { region: "Tambacounda", annee: data.annee ,menage_elec_ZR:data.Tambacounda },
                { region: "Ziguinchor", annee: data.annee ,menage_elec_ZR:data.Ziguinchor },
    
              ];
              MenageElecZRService.Add(dataZR).then((res)=>{
                console.log(res.data);
                Navigate("/nbMenage");
              }).catch((err)=>{
                console.log("erreurr add Zone Rurale", err);
    
              })
          }

    };
 console.log("Niou xoll",opt);
 console.log("Niou xoll region yii",regions);
 console.log("les données des menage ZR",nbMenageZR);
 console.log("Niou xoll",Params.id);

  return (
    <div className="container marTop">
    <h4 className='text-center mb-3 myFont'>Formulaire : Nombre de Ménages électrifié en Zone {Params.id}</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
      <div className="col-md-6">
            <div className="card">
              <div className="card-header">Année</div>
              <div className="card-body">
                <select id="selectField" name="selectField" className="form-select" {...register("annee")} >
                <option>Choisir une Année</option>
                  {opt.map((option) => (
                    <option key={option.id} value={option.annee}>{option.annee}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        {regions.map((region) => (
          <div key={region} className="col">
            <div className="card">
              <div className="card-header">{region}</div>
              <div className="card-body">
                <input type="number" id={region} name={region} className="form-control" {...register(region)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="submit" className="myButton mt-2">Envoyer</button>
      <button type="reset" className="otherButton mt-2">Annuler</button>

    </form>
  </div>
  )
}
