import "./App.css";
import NavBar from "./components/NavBar/index";
import RegisterOne from "./components/RegisterOne/index";
import RegisterTwo from "./components/RegisterTwo/index";
import Contraseña from "./components/Password/index";
import Login from "./components/Login/index";
import BackOffice from "./components/BackOffice/index";
import LoginAdmin from "./components/LoginAdmin/index";
import ContraseñaAdmin from "./components/PasswordAdmin/index";
import BackOfficeAdm from "./components/BackOfficeAdm/index";
import NewCar from "./components/NewCar/index";
import Vehiculos from "./components/Vehiculos/index";
import PasswordAdmin from "./components/PasswordAdmin/index";
import PasswordFirst from "./components/PasswordFirst";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/asociados" component={RegisterOne} />
      <Route exact path="/asociados/register" component={RegisterTwo} />
      <Route
        exact
        path="/asociados/recuperar_contraseña"
        component={Contraseña}
      />
      <Route exact path="/asociados/iniciar_sesion" component={Login} />
      <Route
        exact
        path="/asociados/cambiar_contraseña"
        component={PasswordFirst}
      />
      <Route exact path="/back_office" component={BackOffice} />
      <Route
        exact
        path="/back_office/cambiar_contraseña"
        component={BackOffice}
      />
      <Route exact path="/back_office/vehiculos" component={BackOffice} />
      <Route
        exact
        path="/back_office/vehiculos/nuevo_auto"
        component={BackOffice}
      />
      <Route
        exact
        path="/back_office/vehiculos/detalles"
        component={BackOffice}
      />
      <Route exact path="/back_office/conductores" component={BackOffice} />
      <Route
        exact
        path="/back_office/conductores/nuevo_conductor"
        component={BackOffice}
      />
      <Route
        exact
        path="/back_office/facturas_y_pagos"
        component={BackOffice}
      />
      <Route exact path="/back_office/viajes" component={BackOffice} />
      <Route exact path="/back_office/reclamos" component={BackOffice} />
      <Route exact path="/back_office/alertas" component={BackOffice} />
      <Route exact path="/back_office/mis_datos" component={BackOffice} />
      <Route
        exact
        path="/back_office/mis_datos/editar"
        component={BackOffice}
      />

      <Route exact path="/administracion" component={LoginAdmin} />
      <Route
        exact
        path="/administracion/recuperar_contraseña"
        component={PasswordAdmin}
      />
      <Route
        exact
        path="/back_office_administracion"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/mis_datos"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/mis_datos/editar"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/cambiar_contraseña"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/conductores"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/conductores/nuevo_conductor"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/asociados"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/asociados/editar"
        component={BackOfficeAdm}
      />

      <Route
        exact
        path="/back_office_administracion/vehiculos/nuevo_auto"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/vehiculos/detalle"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/usuarios"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/usuarios/roles"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/facturas_y_pagos"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/reclamos"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/alertas"
        component={BackOfficeAdm}
      />

      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion/conductores"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion/conductores/:id"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion/vehiculos"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion/vehiculos/:id"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion/asociados"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion/asociados/:id"
        component={BackOfficeAdm}
      />
      <Route
        exact
        path="/back_office_administracion/pendientes_aprobacion/actualizaciones"
        component={BackOfficeAdm}
      />



      <Route
        exact
        path="/back_office_administracion/convenios"
        component={BackOfficeAdm}
      />
      {/* <Route exact path="/back_office_administracion/pendientes_aprobacion/vehiculos" component={BackOfficeAdm} /> 
      <Route exact path="/back_office_administracion/pendientes_aprobacion/vehiculos/detalles" component={BackOfficeAdm} />
      <Route exact path="/back_office_administracion/pendientes_aprobacion/conductores" component={BackOfficeAdm} /> 
      <Route exact path="/back_office_administracion/pendientes_aprobacion/conductores/detalles" component={BackOfficeAdm} />
      <Route exact path="/back_office_administracion/pendientes_aprobacion/viajes" component={BackOfficeAdm} />
      <Route exact path="/back_office_administracion/pendientes_aprobacion/viajes/detalles" component={BackOfficeAdm} /> */}
    </div>
  );
}

export default App;
