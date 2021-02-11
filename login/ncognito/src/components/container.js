import React, {Component} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Login from '../pages/login/login.js';
import Reg from '../pages/login/registro.js';
import Codigo from '../pages/login/codigo.js';
import Datos from '../pages/login/datos.js';
import Landing from '../pages/login/landing.js';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Reg}/>
                <Route exact path="/codigo" component={Codigo}/>
                <Route exact path="/datos" component={Datos}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/landing" component={Landing}/>

            </Switch>
        </BrowserRouter>
    );
}
    
        
    

export default Routes;