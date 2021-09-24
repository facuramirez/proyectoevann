import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/index';
import RegisterOne from './components/RegisterOne/index';
import RegisterTwo from './components/RegisterTwo/index';
import Contraseña from './components/Password/index';
import Login from './components/Login/index';
import BackOffice from './components/BackOffice/index';
import NewCar from './components/NewCar/index';
import Vehiculos from './components/Vehiculos/index';
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/asociados" component={RegisterOne} />
      <Route exact path="/asociados/register" component={RegisterTwo} />
      <Route exact path="/asociados/recuperar_contraseña" component={Contraseña} />
      <Route exact path="/asociados/iniciar_sesion" component={Login} />
      <Route exact path="/back_office" component={BackOffice} />
      <Route exact path="/back_office/vehiculos" component={BackOffice} />
      <Route exact path="/back_office/vehiculos/nuevo_auto" component={BackOffice} />
      <Route exact path="/back_office/vehiculos/detalles" component={BackOffice} />
      <Route exact path="/back_office/conductores" component={BackOffice} />
      <Route exact path="/back_office/conductores/nuevo_conductor" component={BackOffice} />
      <Route exact path="/back_office/facturas_y_pagos" component={BackOffice} />
      <Route exact path="/back_office/viajes" component={BackOffice} />
      <Route exact path="/back_office/reclamos" component={BackOffice} />
      <Route exact path="/back_office/alertas" component={BackOffice} />
      <Route exact path="/back_office/mis_datos" component={BackOffice} />
      <Route exact path="/back_office/mis_datos/editar" component={BackOffice} />
    </div>
  );
}

export default App;
