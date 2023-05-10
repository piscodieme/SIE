import React, { Component } from 'react';

class createActeurComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            sigle:'',
            libelle:'',
            description:''
        }
        this.changeSigleHandler = this.changeSigleHandler.bind(this);
        this.changeLibelleHandler = this.changeLibelleHandler.bind(this);
        this.changeDescHandler = this.changeDescHandler.bind(this);
        this.saveActor = this.saveActor.bind(this);

    }

    saveActor = (e) => {
        e.preventDefault();
        let actors = {sigle:this.state.sigle, libelle:this.state.libelle,description:this.state.description};
        console.log('acteurs = >> '+ JSON.stringify(actors));
    }

    changeSigleHandler = (event)=>{
        this.setState({sigle: event.target.value});
    }
    changeLibelleHandler = (event)=>{
        this.setState({libelle: event.target.value});
    }
    changeDescHandler = (event)=>{
        this.setState({description: event.target.value});
    }


    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-9 offset-md-3 offset-md-3'>
                            <h2 className='text-center'>Ajout Acteur</h2>
                            <div className='card-body'>
                                <form action="">
                                    <div className='form-group'>
                                        <label htmlFor="Sigle">Sigle</label>
                                        <input type="text" name="sigle" id="sgl" placeholder='Sigle' className='form-control'
                                        value={this.state.sigle} onChange={this.changeSigleHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="Libelle">Libellé</label>
                                        <input type="text" name="libelle" id="lbl" placeholder='Libellé' className='form-control'
                                        value={this.state.libelle} onChange={this.changeLibelleHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="description">Description</label>
                                        <input type="text" name="description" id="desc" placeholder='Description' className='form-control'
                                        value={this.state.description} onChange={this.changeDescHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveActor}> Ajouter</button>
                                    <button className='btn btn-warning' onClick={this.changeDescHandler.bind(this)} style={{marginLeft:"10px"}}> Annuler </button>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default createActeurComponent;