import React, { Component } from "react";

import Cookies from 'universal-cookie';

const cookies=new Cookies();
class Landing extends Component{


    render(){
        return(
            <div>
                <header>
                        <h1>Bienvenido </h1><h3>{cookies.get('email')}</h3>
                        <h2>Ha ingresado correctamente</h2>
                </header>
                
            </div>
        );
    }
}

export default Landing;