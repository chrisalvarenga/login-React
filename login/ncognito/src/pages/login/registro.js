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
class Reg extends Component{
    state={
        form:{
            email:'',
            password:''
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

   componentDidMount=async()=>{
        await axios.post('http://localhost:3000/auth/register', {
            email: this.state.form.email,
            password: this.state.form.password
        })
        .then(result=>{
            cookies.set('username', result.data.username, {path: "/"});
            cookies.set('userpoolId', result.data.pool.userPoolId, {path: "/"});
            cookies.set('clientId', result.data.pool.clientId, {path: "/"});
            cookies.set('endpoint', result.data.pool.client.endpoint, {path: "/"});
            console.log(result);
            //alert(`Bienvenido ${result.data.username} ${result.data.pool.userPoolId}`);
            window.location.href="./codigo"
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
                        <h1>Bienvenido</h1><span>Registra tu cuenta para continuar 	</span>
                        </header>
                        <form class="form--login">
                            
                            <div class="form__row">
                                <label for="input--username">Correo Electrónico</label>
                                <input onChange={this.handleChange} type="text" name="email"  placeholder="david@fenaprocacaho.org"></input>
                            </div>
                            <div class="form__row">
                                <label for="input--password">Contraseña</label>
                                <input onChange={this.handleChange} type="password" name="password"  placeholder="123456"></input>
                        </div>
                        <div class="form__columns">
                            
                            <label for="input--remember">¿Ya tienes una cuenta?</label><a class="form--login__forgot-password" href="./login">Iniciar Sesión</a>
                        </div>
                        <div class="form__row">
                            <button type="button" class="button--login" onClick={()=> this.componentDidMount()}>Registrarse</button>
                        </div>
                    </form>
                    </div>
                    </div>
                </main>
            </body>
        )
    };
}


export default Reg;