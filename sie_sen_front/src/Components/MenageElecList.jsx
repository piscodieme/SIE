import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenageElecZRService from '../Services/MenageElecZRService';

export default function MenageElecList() {

    const Navigate = useNavigate();
    const [menage, setMenage] = useState([]);
    const [menageZU, setMenageZU] = useState([]);

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
 
     },[])

     /* const redirection = (id)=>{
        Navigate(`/AddMenageZRPage/${id}`);
    } */
console.log("données liste ménages    ",menage);
  return (
    
<div class="container">
  <div>
  <h3 className='text-center myFont'>Les Ménages Electrifiés en Zone Urbaine</h3>
  <button type='button' className='primary mt-2 mb-1 text-white' Style="width:10%;" onClick={()=>{Navigate(`/AddMenageZRPage/Urbaine`)}}>Ajouter</button>
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
            {menageZU.map
                (menage =>
                    <tr>
                        <td>{menage.id}</td>
                        <td>{menage.region}</td>
                        <td>{menage.annee}</td>
                        <td>{menage.menage_elec_ZU}</td>
                    </tr>
                )
        }
            
        </tbody>
    </table>
  </div>
  <div>
    <h3 className='text-center myFont'>Les Ménages Electrifiés en Zone Rurale</h3>
    <button type='button' className='primary mt-2 mb-1 text-white' Style="width:10%;" onClick={()=>{Navigate(`/AddMenageZRPage/Rurale`)}}>Ajouter</button>
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
