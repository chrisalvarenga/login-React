import React, { Component } from "react";
import axios from 'axios';
import cover1 from './images/logo-color.png';
import Cookies from 'universal-cookie';
import './datos.js';

const cookies=new Cookies();
class Codigo extends Component{
    state={
        form:{
            code:''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    Resgitrarse=async()=>{
        await axios.post('http://localhost:3000/auth/confirm', {
            code: this.state.form.code,
            name: cookies.get('username')
        })
        .then(result=>{
            alert(cookies.get('username'));
            console.log(result);
            window.location.href="/datos"
            
        })
        .catch(console.log)
    } 

    render(){
        return(
            <div>
                <header><img src={cover1} alt="Logo"></img>
                        <h1>Bienvenido</h1><span>Ingresa tu codigo de confirmación para validar 	</span>
                </header>
                <form class="form--login">
                        <div class="form__row">
                                <label for="input--username">Codigo</label>
                                <input onChange={this.handleChange} type="text" name="code"  placeholder="1234"></input>
                        </div>
                       
                        <div class="form__row">
                            <button type="button" class="button--login" onClick={()=> this.Resgitrarse()}>Confirmar</button>
                        </div>
                    </form>
            </div>
        );
    }
}

export default Codigo;