import React, { Component } from 'react';
import NiveauTensionService from '../Services/NiveauTensionService';

class AddNiveauTensionPage extends Component {
    constructor(props){
        super(props)
        this.state={
            annee:'',
            venteHT:'',
            venteMT:'',
            venteBT:'',
            unite:'',
            clientHT:'',
            clientMT:'',
            clientBT:''

        }

        this.changeAnneeHandler = this.changeAnneeHandler.bind(this);
        this.changeUniteHandler = this.changeUniteHandler.bind(this);
        this.changeVenteBTHandler = this.changeVenteBTHandler.bind(this);
        this.changeVenteMTHandler = this.changeVenteMTHandler.bind(this);
        this.changeventeHTHandler = this.changeventeHTHandler.bind(this);
        this.changeClientBTHandler = this.changeClientBTHandler.bind(this);
        this.changeClientMTHandler = this.changeClientMTHandler.bind(this);
        this.changeClientHTHandler = this.changeClientHTHandler.bind(this);
    }

    changeAnneeHandler = (event)=>{
        this.setState({annee: event.target.value});
    }

    changeventeHTHandler = (event)=>{
        this.setState({venteHT: event.target.value});
    }

    changeVenteMTHandler = (event)=>{
        this.setState({venteMT: event.target.value});
    }

    changeVenteBTHandler = (event)=>{
        this.setState({venteBT: event.target.value});
    }

    changeUniteHandler = (event)=>{
        this.setState({unite: event.target.value});
    }

    changeClientHTHandler = (event)=>{
        this.setState({clientHT: event.target.value});
    }

    changeClientMTHandler = (event)=>{
        this.setState({clientMT: event.target.value});
    }

    changeClientBTHandler = (event)=>{
        this.setState({clientBT: event.target.value});
    }

    saveVenteClientele = (e) => {
        e.preventDefault();
        let vente = {annee:this.state.annee,
                     unite:this.state.unite,
                     venteHT:this.state.venteHT,
                     venteMT:this.state.venteMT,
                     venteBT:this.state.venteBT,
                     clientHT:this.state.clientHT,
                     clientMT:this.state.clientMT,
                     clientBT:this.state.clientBT
                    };
        console.log('vente niveau de tension = >> '+ JSON.stringify(vente));

        NiveauTensionService.create(vente).then(res =>{
            this.props.history.push('/nivten')
        })
    }

    render() {
        return (
            <div>
                <div className='row'>
                        <div className='card col-sm-12'>
                            <h2 className='text-center m-3'> Ventes et Clientèles par Niveau de Tension </h2>
                            <div className='card-body'>
                                <form action="" >
                                    <div className='form-inline container col-sm-8 mt-2'>
                                        <div className='form-group'>
                                            <label htmlFor="Annee" className='m-3'>Année</label>
                                            <input type="text" name="annee" id="annee" placeholder='Année' className='form-control'
                                            value={this.state.annee} onChange={this.changeAnneeHandler} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="unite"  className='m-3'>Unité</label>
                                            <input type="text" name="unite" id="unt" placeholder='Unité de mesure' className='form-control'
                                            value={this.state.unite} onChange={this.changeUniteHandler} />
                                        </div>
                                    </div>
                                   <h4 className='text-center mt-2'>Les ventes par Niveau de Tension</h4>
                                    <div className='col-sm-12 form-inline container mt-2'>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="VenteHT"  className='m-2'>Vente HT</label>
                                            <input type="text" name="venteHT" id="vHT" placeholder='Vente Haute Tension' className='form-control'
                                            value={this.state.venteHT} onChange={this.changeventeHTHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="VenteMT" className='m-2'>Vente MT</label>
                                            <input type="text" name="venteMT" id="vMT" placeholder='Vente Moyenne Tension' className='form-control'
                                            value={this.state.venteMT} onChange={this.changeVenteMTHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="VenteBT" className='m-2'>Vente BT</label>
                                            <input type="text" name="venteBT" id="vBT" placeholder='Vente Basse Tension' className='form-control'
                                            value={this.state.venteBT} onChange={this.changeVenteBTHandler} />
                                        </div>
                                    </div>
                                    <h4 className='text-center mt-2'>La clientèle par Niveau de Tension</h4>
                                    <div className='form-inline container mt-2'>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="ClientHT"  className='m-2'>Client HT</label>
                                            <input type="text" name="clientHT" id="cHT" placeholder='Client Haute Tension' className='form-control'
                                            value={this.state.clientHT} onChange={this.changeClientHTHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="ClientMT" className='m-2'>Client MT</label>
                                            <input type="text" name="ClientMT" id="cMT" placeholder='Client Moyenne Tension' className='form-control'
                                            value={this.state.clientMT} onChange={this.changeClientMTHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="clientBT" className='m-2'>Client BT</label>
                                            <input type="text" name="cientBT" id="cBT" placeholder='Client Basse Tension' className='form-control'
                                            value={this.state.clientBT} onChange={this.changeClientBTHandler} />
                                        </div>
                                    </div>
                                    <div className='col-sm-8 container mt-2'> 
                                        <button className='btn btn-success' onClick={this.saveVenteClientele} > Ajouter</button>
                                        <button className='btn btn-warning'  style={{marginLeft:"10px"}}> Annuler </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                       
                    </div>
                </div>            
        );
    }
}

export default AddNiveauTensionPage;