import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import ActeursService from '../Services/ActeursService';

function UpdateActeurcomponent () {
    const Navigate= useNavigate();
    const Params = useParams();
    console.log(Params);
    const [acteur, setActeur]=useState({});
    const [sigle, setSigle] = useState();
    const [libelle, setLibelle] = useState(acteur.libelle);
    const [description, setDescription] = useState(acteur.description);

    const updateActor = (e)=>{
        e.preventDefault();
        let id = Params.id;
        let actor = {sigle:sigle, libelle:libelle,description:description};
        console.log('acteurs = >> '+ JSON.stringify(actor));
        ActeursService.updateActeur(id, actor).then(res =>{
            Navigate('/acteurs');
        });
    }

    const saveActor = (e) => {
        e.preventDefault();
        let actor = {sigle:sigle, libelle:libelle,description:description};
        console.log('acteurs = >> '+ JSON.stringify(actor));

        ActeursService.createActor(actor).then(res =>{
            Navigate('/acteurs');
        })
    }

    const changeSigleHandler = (e)=>{
        e.preventDefault();
        setSigle(e.target.value);
    }
    const changeLibelleHandler = (e)=>{

        setLibelle(e.target.value);
    }
    let changeDescHandler = (e)=>{
        e.preventDefault();
        setDescription(e.target.value);
    }

    const cancel = () =>{
        setSigle('');
        setLibelle('');
        setDescription('');
        //this.props.history.push('/');
    }
    useEffect(()=>{
        console.log("les paramètres =======  ",Params.id);
        ActeursService.getActeurById(Params.id).then((res)=>{
            return res;
        }).then((resp)=>{
            let act = resp.data;
            setActeur(act);
            console.log("donnees xxxxx ",act);
            setDescription(act.description);
            setLibelle(act.libelle);
            setSigle(act.sigle);
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    
        return (
            <div className='marTop'>
            <a href="/electricite"><button className='myButton'> &#8592; Dashboard</button></a>

                <div className='row mt-3'>
                    <div className='col-sm-8 container'>
                        <h2 className='text-center'>Ajout Acteur</h2>
                        <div className='card col-md-10 offset-md-1 mt-3'>
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
                                        <textarea type="text" name="description" id="desc" placeholder='Description' className='form-control'
                                        value={description} onChange={changeDescHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={updateActor}> Modifier </button>
                                    <button className='btn btn-warning' onClick={cancel.bind(this)} style={{marginLeft:"10px"}}> Annuler </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


export default UpdateActeurcomponent;