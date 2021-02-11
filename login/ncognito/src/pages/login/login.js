import React, {Component} from 'react';
import './login.css';
import './codigo.js';
import cover from './images/cover-image.png';
import cover1 from './images/logo-color.png';
import axios from 'axios';
import Cookies from 'universal-cookie';
import covmob from './images/cover-image-mobile.png';
import covweb from './images/cover-image.webp';

const cookies=new Cookies();
class Login extends Component{
    state={
        form:{
            password:'',
            name:''
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

   log=async()=>{
        await axios.post('http://localhost:3000/auth/authenticate', {
            password: this.state.form.password,
            name: this.state.form.name
        })
        .then(result=>{
            cookies.set('email', result.data.idToken.payload.email, {path: "/"});
            console.log(result);
            //alert(`Bienvenido ${result.data.idToken.payload.email}`);
            window.location.href="./landing"
        })
        .catch(console.log)
    } 

     render(){
        return(
            <body>
                <main>
                    <div class="container--main">
                        <div class="login__sidebar">
                            <picture>
                                <source media="(max-width: 799px)" srcSet={covmob}></source>
                                <source media="(min-width: 800px)" srcSet={covweb} type="image/webp"></source>
                                <img src={cover} alt="Imagen de Portada"></img>
                            </picture>
                        </div>
                    
                        <div class="login__content">
                        <header><img src={cover1} alt="Logo"></img>
                        <h1>Bienvenido</h1><span>Ingresa tus credenciales para continuar 	</span>
                        </header>
                        <form class="form--login">
                            
                            <div class="form__row">
                                <label for="input--username">Correo Electrónico</label>
                                <input onChange={this.handleChange} type="text" name="name"  placeholder="david@fenaprocacaho.org"></input>
                            </div>
                            <div class="form__row">
                                <label for="input--password">Contraseña</label>
                                <input onChange={this.handleChange} type="password" name="password"  placeholder="123456"></input>
                        </div>
                        <div class="form__columns">
                            <input type="checkbox" name="input--remember"></input>
                            <label for="input--remember">Recordarme</label><a class="form--login__forgot-password" href="#">¿Olvidates tu Contraseña?</a>
                        </div>
                        <div class="form__row">
                            <button type="button" class="button--login" onClick={()=> this.log()}>Registrarse</button>
                        </div>
                    </form>
                    </div>
                    </div>
                </main>
            </body>
        )
    };
}


export default Login;