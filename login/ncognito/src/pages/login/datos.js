import React, { Component } from "react";

import Cookies from 'universal-cookie';

const cookies=new Cookies();
class Datos extends Component{


    render(){
        return(
            <div>
                <header>
                    
                        <h1>Bienvenido </h1><h3>{cookies.get('username')}</h3><span> </span>
                        <h3>userPoolId: {cookies.get('userpoolId')}</h3>
                        <h3>clientId: {cookies.get('clientId')}</h3>
                        <h3>endpoint: {cookies.get('endpoint')}</h3>
                        
                </header>
                
            </div>
        );
    }
}

export default Datos;