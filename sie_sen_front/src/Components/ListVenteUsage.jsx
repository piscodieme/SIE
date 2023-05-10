import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsageService from '../Services/UsageService';

class ListVenteUsage extends Component {
    constructor(props){
        super(props)
        this.state ={
            venteUsage:[],
        }
    }

    componentDidMount(){
        UsageService.getAll().then((res)=>{
            this.setState({venteUsage : res.data});
        })
    }

    render() {
        return (
            <div>
                <div className='col-sm-12'>
                    <h2 className='text-center'>Liste des Ventes Par Usage</h2>
                    <Link className='btn btn-primary' to="/addUsage">
                        Ajouter 
                    </Link>
                        <table className='table table-striped table-bordered mt-1'>
                            <thead>
                                <th>Année</th>
                                <th>Unité</th>
                                <th>Domestique</th>
                                <th>Professionnel</th>
                                <th>Eclairage Public</th>
                                <th>Woyofal</th>
                                <th>Usage HT</th>
                                <th>Usage MT</th>
                                <th>Exportations</th>
                                <th>Produits livrés non facturés</th>
                                <th>Action</th>
                            </thead>
                            <tbody className=''>
                                {
                                    this.state.venteUsage.map(
                                        vente => <tr key={vente.id} className='text-center'>
                                            <td>{vente.annee}</td>
                                            <td>{vente.unite}</td>
                                            <td>{vente.domestique}</td>
                                            <td>{vente.professionnel}</td>
                                            <td>{vente.eclairagePublic}</td>
                                            <td>{vente.woyofal}</td>
                                            <td>{vente.usagesHT}</td>
                                            <td>{vente.usagesMT}</td>
                                            <td>{vente.exportations}</td>
                                            <td>{vente.produitsLivresNonFacture}</td>
                                            <td>
                                                <button className='btn btn-primary UpdateDeleteBtn'>
                                                    <span class="material-icons-outlined">
                                                        update
                                                    </span>
                                                </button>
                                                <button className='btn btn-danger UpdateDeleteBtn'>
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
            </div>
        );
    }
}

export default ListVenteUsage;