import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenageElecZRService from '../Services/MenageElecZRService';
import AnneeService from '../Services/AnneeService';
import RegionService from '../Services/regionService';

export default function MenageElecList() {

    const Navigate = useNavigate();
    const [menage, setMenage] = useState([]);
    const [menageZU, setMenageZU] = useState([]);
    const [annee, setAnnee] = useState([]);
    const [region, setRegion] = useState([]);



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
    
<div class="container">
  <div>
  <h3 className='text-center myFont'>Les Ménages Electrifiés en Zone Urbaine</h3>
  <button type='button' className='myButton mt-2 mb-1 text-white' onClick={()=>{Navigate(`/AddMenageZRPage/Urbaine`)}}>Ajouter</button>
    <table className='table table-stripped table-bordered'>
        <thead className='primary text-white'>
            <tr>
                <th>ID</th>
                <th>Région</th>
                {
                    annee.map(annee =>
                        <th>
                            {annee.annee}
                        </th>
                        )
                }
                {/* <th>Année</th>
                <th>Ménage Electrifié</th>
                <th>Actions</th> */}
            </tr>
        </thead>
        <tbody>
            {menageZU.map
                (menage =>
                    <tr>
                        <td>{menage.id}</td>
                        <td>{menage.region}</td>
                        <td>{menage.menage_elec_ZU}</td>
                        {/* <td>{menage.menage_elec_ZU}</td> */}
                    </tr>
                )
        }
            
        </tbody>
    </table>
  </div>
  <div>
    <h3 className='text-center myFont'>Les Ménages Electrifiés en Zone Rurale</h3>
    <button type='button' className='myButton mt-2 mb-1 text-white' onClick={()=>{Navigate(`/AddMenageZRPage/Rurale`)}}>Ajouter</button>
    <table className='table table-stripped table-bordered'>
        <thead className='primary text-white'>
            <tr>
                <th>ID</th>
                <th>Région</th>
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
                        <td>{menage.region}</td>
                        <td>{menage.annee}</td>
                        <td>{menage.menage_elec_ZR}</td>
                    </tr>
                )
        }
            
        </tbody>
    </table>
  </div>
</div>

  )
}
