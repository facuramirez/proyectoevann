import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RegisterOne from './components/RegisterOne/RegisterOne';
import RegisterTwo from './components/RegisterTwo/RegisterTwo';
import Contraseña from './components/Password/Password';
import Login from './components/Login/Login';
import BackOffice from './components/BackOffice/BackOffice';
import NewCar from './components/NewCar/NewCar';
import Vehiculos from './components/Vehiculos/Vehiculos';
import { Route } from 'react-router-dom';

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
      <Route exact path="/back_office/conductores" component={BackOffice} />
      <Route exact path="/back_office/conductores/nuevo_conductor" component={BackOffice} />
      <Route exact path="/back_office/facturas_y_pagos" component={BackOffice} />
      <Route exact path="/back_office/viajes" component={BackOffice} />
      <Route exact path="/back_office/reclamos" component={BackOffice} />
      <Route exact path="/back_office/alertas" component={BackOffice} />
    </div>
  );
}

export default App;
