import React, { Component, useEffect, useState } from 'react';
import ActeursService from '../Services/ActeursService';
import { useNavigate } from 'react-router-dom';


function ListActeursComponent () {

    const [acteurs,setActeurs] = useState([]);
    const [sigle, setSigle] = useState('');
    const [libelle, setLibelle] = useState('');
    const [description, setDescription] = useState('');

    const Navigate = useNavigate();

    const updateActor = (id)=>{
        Navigate(`/updateActeurs/${id}`);
    }

    const deleteActor = (id) =>{
        ActeursService.deleteActeur(id).then((res)=>{
            Navigate("/acteurs");
            return res;
        }).then((resp)=>{
            ActeursService.getAllActors().then((res)=>{
                setActeurs(res.data);
            })
            console.log(resp);
        }).catch((err)=>{
            console.log("delete error",err);
        })
    }

    const saveActor = (e) => {
        e.preventDefault();
        let actor = {sigle:sigle, libelle:libelle,description:description,modele:1};
        console.log('acteurs = >> '+ JSON.stringify(actor));

        ActeursService.createActor(actor).then(res =>{
            ActeursService.getAllActors().then((resp)=>{
                setActeurs(resp.data);
            })
            setSigle('');
            setLibelle('');
            setDescription('');
            Navigate('/acteurs');
        })
    }

   const changeSigleHandler = (event)=>{
        setSigle( event.target.value);
    }
    const changeLibelleHandler = (event)=>{
        setLibelle(event.target.value);
    }
    const changeDescHandler = (event)=>{
        setDescription(event.target.value);
    }

    const cancel =()=>{
        setSigle('');
        setLibelle('');
        setDescription('');
    }

    const SignOut = () =>{
        localStorage.clear();
        Navigate('/');
        window.location.reload();
    }

    useEffect(()=>{
        ActeursService.getAllActors().then((res)=>{
           setActeurs(res.data);
        })
    },[])

        return (
            <div className='marTop'>
                <a href="/electricite"><button className='myButton'> &#8592; Menu principal</button></a>  
                <div className='row mt-3'>
                    <div className='col-sm-8'>
                    <h2 className='text-center myFont'>Liste des acteurs</h2>

                        <table className='table table-striped table-bordered mt-3'>
                            <thead>
                                <th>Sigle</th>
                                <th>Libelle</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </thead>
                            <tbody className=''>
                                {
                                    acteurs.map(
                                        acteurs => <tr key={acteurs.id}>
                                            <td>{acteurs.sigle}</td>
                                            <td>{acteurs.libelle}</td>
                                            <td>{acteurs.description}</td>
                                            <td>
                                                {/* <button className='btn btn-primary m-1 updateHover' onClick={()=>updateActor(acteurs.id)}>
                                                    <span class="material-icons-outlined">
                                                        update
                                                    </span>
                                                </button>
                                                <button className='btn btn-danger' onClick={()=>deleteActor(acteurs.id)}>
                                                    <span class="material-icons">
                                                        delete
                                                    </span>
                                                </button> */}
                                                <button className='action' onClick={()=>updateActor(acteurs.id)}>
                                                    <span class="material-icons">
                                                        edit
                                                    </span>
                                                </button>
                                                <button className='action' onClick={()=>deleteActor(acteurs.id)}>
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
                    <div className='col-sm-4'>
                        <h2 className='text-center myFont'>Ajout Acteur</h2>
                        <div className='card col-md-12 offset-md-1 mt-3'>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label htmlFor="Sigle">Sigle</label>
                                        <input type="text" name="sigle" id="sgl" placeholder='Sigle' className='form-control'
                                        value={sigle} onChange={changeSigleHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="Libelle">Libellé</label>
                                        <input type="text" name="libelle" id="lbl" placeholder='Libellé' className='form-control'
                                        value={libelle} onChange={changeLibelleHandler} rowspan="3"/>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="description">Description</label>
                                        <input type="text" name="description" id="desc" placeholder='Description' className='form-control'
                                        value={description} onChange={changeDescHandler} />
                                    </div>
                                    <button className='myButton' onClick={saveActor}> Ajouter</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    
}

export default ListActeursComponent;