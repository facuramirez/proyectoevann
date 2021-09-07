import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RegisterOne from './components/RegisterOne/RegisterOne';
import RegisterTwo from './components/RegisterTwo/RegisterTwo';
import Contraseña from './components/Password/Password';
import Login from './components/Login/Login';
import BackOffice from './components/BackOffice/BackOffice';
import NewCar from './components/NewCar/NewCar';
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
      <Route exact path="/back_office/nuevo_auto" component={NewCar} />
    </div>
  );
}

export default App;
