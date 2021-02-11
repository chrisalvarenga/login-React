import React, {component} from "react"
import './App.css';
//import Login from './pages/login/login';
import Codigo from './pages/login/codigo.js';
import Reg from './pages/login/registro.js';
import Datos from './pages/login/datos.js';


function App() {
    

  return (
    <div className="App">
    
      <Reg exact path=".pages/login/registro.js" component={Reg}/>
      <Codigo exact path="./pages/login/codigo.js" component={Codigo} />
      <Datos exact path="./pages/login/datos.js" component={Datos}/>
    </div>
  );
}

export default App;
