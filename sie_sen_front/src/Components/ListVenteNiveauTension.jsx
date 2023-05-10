import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HistoryRouterProps } from 'react-router-dom';
import nivtenService from '../Services/NiveauTensionService';

class ListVenteNiveauTension extends Component {

    constructor(props){

        super(props);

        this.state={
            venteNiveauTension:[],
        }
   
    }

    componentDidMount(){
        nivtenService.getAll().then((res)=>{
            this.setState({venteNiveauTension : res.data});
        })
    }
    AddPage(){
        this.props.history.push("/addnivtenpage");
    }

    render() {
        return (
            <div>
                <div className='col-sm-12'>
                    <h2 className='text-center'>Liste des Ventes Par Niveau de Tension</h2>
                    <Link className='btn btn-primary' to="/addnivtenpage">
                        Ajouter 
                    </Link>
                        <table className='table table-striped table-bordered mt-1'>
                            <thead>
                                <th>Ventes HT</th>
                                <th>Ventes MT</th>
                                <th>Ventes BT</th>
                                <th>Clients HT</th>
                                <th>Clients MT</th>
                                <th>Clients BT</th>
                                <th>Année</th>
                                <th>Action</th>
                            </thead>
                            <tbody className=''>
                                {
                                    this.state.venteNiveauTension.map(
                                        vente => <tr key={vente.id} className='text-center'>
                                            <td className='text-center'>{vente.venteHT}</td>
                                            <td className='text-center'>{vente.venteMT}</td>
                                            <td>{vente.venteBT}</td>
                                            <td>{vente.clientHT}</td>
                                            <td>{vente.clientMT}</td>
                                            <td>{vente.clientBT}</td>
                                            <td>{vente.annee}</td>
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

export default ListVenteNiveauTension;