import React, { Component } from 'react';
import UsageService from '../Services/UsageService';
import { Link } from 'react-router-dom';

class AddVenteUsage extends Component {
    constructor(props){
        super(props)

        this.state={
            annee:'',
            unite:'',
            domestique:'',
            prof:'',
            eclairage:'',
            woyofal:'',
            usageHT:'',
            usageMT:'',
            export:'',
            prodLNF:''
        }

        this.changeAnneeHandler = this.changeAnneeHandler.bind(this);
        this.changeUniteHandler = this.changeUniteHandler.bind(this);
        this.changeDomestiqueHandler=this.changeDomestiqueHandler.bind(this);
        this.changeEclairageHandler = this.changeEclairageHandler.bind(this);
        this.changeExportHandler = this.changeExportHandler.bind(this);
        this.changeProdHandler = this.changeProdHandler.bind(this);
        this.changeUsageHTHandler = this.changeUsageHTHandler.bind(this);
        this.changeUsageMTHandler = this.changeUsageMTHandler.bind(this);
        this.changeWoyofalHandler = this.changeWoyofalHandler.bind(this);
        this.changeProfHandler = this.changeProfHandler.bind(this);
    }

    changeAnneeHandler = (event)=>{
        this.setState({annee: event.target.value});
    }

    changeUniteHandler = (event)=>{
        this.setState({unite: event.target.value});
    }

    changeDomestiqueHandler = (event)=>{
        this.setState({domestique: event.target.value});
    }

    changeWoyofalHandler = (event)=>{
        this.setState({woyofal: event.target.value});
    }

    changeUsageMTHandler = (event)=>{
        this.setState({usageMT: event.target.value});
    }

    changeUsageHTHandler = (event)=>{
        this.setState({usageHT: event.target.value});
    }

    changeProdHandler = (event)=>{
        this.setState({prodLNF: event.target.value});
    }

    changeEclairageHandler = (event)=>{
        this.setState({eclairage: event.target.value});
    }

    changeExportHandler = (event)=>{
        this.setState({export: event.target.value});
    }

    changeProfHandler=(event)=> {
        this.setState({prof : event.target.value})
    }

    saveVenteUsage = (e) => {
        e.preventDefault();
        let vente = {annee:this.state.annee,
                     unite:this.state.unite,
                     usageHT:this.state.usageHT,
                     usageMT:this.state.usageMT,
                     professionnel:this.state.prof,
                     woyofal:this.state.woyofal,
                     exportations:this.state.export,
                     eclairagePublic:this.state.eclairage,
                     domestique:this.state.domestique,
                     produitsLivresNonFacture:this.state.prodLNF,
                     validation:0
                    };
        console.log('vente niveau de tension = >> '+ JSON.stringify(vente));

        UsageService.create(vente).then(res =>{
            this.props.history.push('/usage')
        })

    }
    render() {
        return (
            <div>
                <Link className='btn btn-primary mt-3' to="/usage">
                    Historique 
                </Link>
                <div className='row mt-1'>
                        <div className='card col-sm-12'>
                            <h2 className='text-center m-3'> Ventes par Usage </h2>
                            <div className='card-body'>
                                <form action="" >
                                <div className='col-sm-12 form-inline container mt-2'>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="Annee"  className='m-2'>Année</label>
                                            <input type="text" name="annee" id="annee" placeholder='Année' className='form-control'
                                            value={this.state.annee} onChange={this.changeAnneeHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="Unite" className='m-2'>Unité</label>
                                            <input type="text" name="unite" id="unite" placeholder='Unité de Mesure' className='form-control'
                                            value={this.state.unite} onChange={this.changeUniteHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="Domestique" className='m-2'>Domestique</label>
                                            <input type="text" name="domestique" id="dom" placeholder='Domestique' className='form-control'
                                            value={this.state.domestique} onChange={this.changeDomestiqueHandler} />
                                        </div>
                                    </div>

                                    <div className='col-sm-12 form-inline container mt-2'>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="Professionnel"  className='m-2'>Professionnel</label>
                                            <input type="text" name="prof" id="prof" placeholder='Professionnel' className='form-control'
                                            value={this.state.prof} onChange={this.changeProfHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="Eclairage" className='m-2'>Eclairage Public</label>
                                            <input type="text" name="eclairage" id="ep" placeholder='Eclairage Public' className='form-control'
                                            value={this.state.eclairage} onChange={this.changeEclairageHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="Woyofal" className='m-2'>Woyofal</label>
                                            <input type="text" name="woyofal" id="wyf" placeholder='Woyofal' className='form-control'
                                            value={this.state.woyofal} onChange={this.changeWoyofalHandler} />
                                        </div>
                                    </div>
                                   
                                    <div className='form-inline container mt-2'>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="UsageHT"  className='m-2'>Usage HT</label>
                                            <input type="text" name="usageHT" id="uHT" placeholder='Usage HT' className='form-control'
                                            value={this.state.usageHT} onChange={this.changeUsageHTHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="UsageMT" className='m-2'>Usage MT</label>
                                            <input type="text" name="UsageMT" id="uMT" placeholder='Usage MT' className='form-control'
                                            value={this.state.usageMT} onChange={this.changeUsageMTHandler} />
                                        </div>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="Export" className='m-2'>Exportations</label>
                                            <input type="text" name="export" id="export" placeholder='Export' className='form-control'
                                            value={this.state.export} onChange={this.changeExportHandler} />
                                        </div>
                                    </div>
                                    <div className='form-inline container mt-2'>
                                        <div className='form-group mx-sm-3 m-2'>
                                            <label htmlFor="prodLNF"  className='m-2'>Produits Livrés Non Facturés</label>
                                            <input type="text" name="prodLNF" id="prod" placeholder='Produits Livrés Non Facturés' className='form-control'
                                            value={this.state.prodLNF} onChange={this.changeProdHandler} />
                                        </div>
                                       
                                    </div>
                                    <div className='col-sm-8 container mt-2'> 
                                        <button className='btn btn-success' onClick={this.saveVenteUsage} > Ajouter</button>
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

export default AddVenteUsage;