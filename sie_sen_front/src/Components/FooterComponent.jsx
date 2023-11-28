import { WidthFull } from '@mui/icons-material';
import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props){
        super(props)
    
        this.state={
            log:false,
        }

    }
    componentDidMount(){
        this.setState({log:localStorage.getItem("isLogged")})
    }
    render() {
        return (
            <div>
                {
                    this.state.log && 
                    <div Style="width:100%" className='footer'>
                        <footer className='footer'>
                            <div class="rs">
                                <a href="#"><i class='bx bxl-linkedin'></i></a>
                                <a href="#"><i class='bx bxl-facebook'></i></a>
                                <a href="#"><i class='bx bxl-twitter' ></i></a>
                                <a href="#"><i class='bx bxl-instagram-alt' ></i></a>
                                <a href="#"><i class='bx bxl-snapchat' ></i></a>
                            </div>
                        
                        
                        </footer>
                        <span className='text-muted'> &copy;.All Rights Reserved Design By Baba Saidou DIEME</span>
            </div>
                }
            </div>
           
        );
    }
}

export default FooterComponent;