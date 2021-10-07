import Style from './BackOfficeAdm.module.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useHistory, useLocation } from 'react-router-dom';
import image from '../../img/regBack.jpg';
import Asociados from '../Asociados';
import AsociadosEditar from '../AsociadosEditar';
import AsociadosVehiculos from '../AsociadosVehiculos';
import AsociadosVehiculosDetalle from '../AsociadosVehiculosDetalle';
import NewCarFormAdm from '../NewCarAdm/NewCarForm';
import ConductoresAdm from '../ConductoresAdm';
import ConductoresDetailAdm from '../ConductoresDetailAdm';
import NewConductorFormAdm from '../NewConductorAdm';
import FacturasAdm from '../FacturasAdm';
import AdmUsuarios from '../AdmUsuarios';
import ReclamosAdm from '../ReclamosAdm';
import AlertasAdm from '../AlertasAdm';
import MisDatosAdm from '../MisDatosAdm';
import EditarMisDatosAdm from '../EditarMisDatosAdm';
import PasswordAdmin from '../PasswordAdmin';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';

export default function BackOfficeAdm() {
    
    let history = useHistory();
    let url = window.location.href;
    let {pathname:ruta} = useLocation();

    // if(document.querySelector('imageDom')){
    //     if(ruta.includes('/nuevo_auto')) {
    //         document.querySelector('imageDom').style.height = '135vh';
    //         document.querySelector('opaco').style.height = '135vh';
    //     } else if(ruta.includes('/vehiculos')) {
    //         document.querySelector('imageDom').style.height = '100vh';
    //         document.querySelector('opaco').style.height = '100vh';
    //     }
    // }

    const close = (e) => {
        e.preventDefault();
        swal({
            title: '¿Cerrar sesión?',
            text: 'Confirme si desea cerrar la sesión',
            icon: 'warning',
            buttons: ["NO", "SI"]
        }).then( async (response) => {
            if(response){
                await swal({
                    title: 'Adiós, vuelve pronto!',
                    text: 'Redireccionando a Evann...',
                    icon: 'success',
                    buttons: [''],
                    timer: 2000
                })
                history.push('/');
            }            
        });
    }

    // <div className={`${Style.close} col-12`}>
    //     <div className="row">
    //         <div className={`${Style.welcome} col-4`}>
    //             <h3>Bienvenido Facundo!</h3>
    //         </div>
    //         <a className="col-8" href="" onClick={(e)=>close(e)}>Cerrar Sesión</a>
    //     </div>
    // </div>
    
    return(
        <div>
            <div className={`${Style.containerBackOffice} row m-0`}>                 
                <nav className={`${Style.navBar} navbar navbar-expand-lg navbar-light bg-light`}>
                    <div className="container-fluid">
                        <a className={`${Style.welcome} navbar-brand`} href="#">Bienvenido Facundo!</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`${Style.divUlNav} collapse navbar-collapse`} id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/mis_datos">Mis Datos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/conductores">Conductores</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/asociados">Asociados</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/viajes">Administración de Usuarios</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/facturas_y_pagos">Facturas y Pagos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/reclamos">Reclamos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/alertas">Alertas</Link>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="" aria-current="page" onClick={(e)=>close(e)}>Cerrar Sesión</a>
                                </li>
                                
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#">Disabled</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                

                <div className="d-none d-sm-none d-md-none d-lg-block col-lg-2">
                    <div className="row" >
                        <div className={`${Style.menuOptions} col-12`}>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/mis_datos">Mis Datos</Link>
                            </div>
                            {/* <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/conductores">Conductores</Link>
                            </div> */}
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/asociados">Asociados</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/usuarios">Administración de Usuarios</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/facturas_y_pagos">Facturación y Pagos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/reclamos">Reclamos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/alertas">Alertas</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <section className={`${Style.details} d-sm-block d-md-block d-lg-block col-lg-10`}>
                    <div className={`row`}>                        
                        <div className={`${Style.pageOffice} col-12`}
                            style={ruta.includes('/mis_datos/editar') ? {height:'96vh'}:
                            ruta.includes('/mis_datos') ? {height:'87vh'}:
                            ruta.includes('/asociados/editar') ? {height:'70vh'}:
                            ruta.includes('/asociados') ? {height:'87vh'}:null
                            }
                        >
                            <img src={image} className="imageDom"
                                style={ruta.includes('/asociados/editar') ? {height:'135%'}:
                                ruta.includes('/asociados') ? {height:'87vh'}:
                                ruta.includes('/asociados/editar') ? {height:'100%'}:
                                ruta.includes('/mis_datos/editar') ? {height:'100%'}:
                                ruta.includes('/mis_datos') ? {height:'100%'}:
                                ruta.includes('/conductores/nuevo_conductor') ? {height:'100%'}:
                                ruta.includes('/conductores') ? {height:'100%'}:
                                ruta.includes('/usuarios') ? {height:'100%'}:
                                ruta.includes('/facturas_y_pagos') ? {height:'100%'}:
                                ruta.includes('/reclamos') ? {height:'100%'}:
                                ruta.includes('/alertas') ? {height:'100%'}:null
                                }
                            />
                            <div className={`${Style.opaco} opaco`}
                                 style={ruta.includes('/asociados/editar') ? {height:'135%'}:
                                 ruta.includes('/asociados') ? {height:'87vh'}:
                                 ruta.includes('/mis_datos/editar') ? {height:'100%'}:
                                 ruta.includes('/mis_datos') ? {height:'100%'}:
                                 ruta.includes('/conductores/nuevo_conductor') ? {height:'100%'}:
                                 ruta.includes('/conductores') ? {height:'100%'}:
                                 ruta.includes('/usuarios') ? {height:'100%'}:
                                 ruta.includes('/facturas_y_pagos') ? {height:'100%'}:
                                 ruta.includes('/reclamos') ? {height:'100%'}:
                                 ruta.includes('/alertas') ? {height:'100%'}:null
                                 }
                            ></div>
                            <div className={`${Style.divOffice} row`}>
                            {
                                ruta === '/back_office_administracion' ?
                                    <div>               
                                    {history.push('back_office_administracion/mis_datos')}
                                    </div>
                                :
                                ruta === '/administracion/recuperar_contraseña' ?
                                    <Fade>
                                        <PasswordAdmin />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/asociados' ?
                                    <Fade>
                                        <Asociados />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/asociados/editar' ?
                                    <Fade>
                                        <AsociadosEditar />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/asociados/vehiculos' ?
                                    <Fade>
                                        <AsociadosVehiculos />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/vehiculos/nuevo_auto' ?
                                    <Fade>
                                        <NewCarFormAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/asociados/vehiculos/detalles' ?
                                    <Fade>
                                        <AsociadosVehiculosDetalle />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/asociados/conductores' ?
                                    <Fade>
                                        <ConductoresAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/asociados/conductores/detalles' ?
                                    <Fade>
                                        <ConductoresDetailAdm />
                                    </Fade>
                                :

                                // ruta === '/back_office_administracion/conductores' ?
                                //     <Fade>
                                //         <ConductoresAdm />
                                //     </Fade>
                                // :
                                ruta === '/back_office_administracion/conductores/nuevo_conductor' ?
                                    <Fade>
                                        <NewConductorFormAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/facturas_y_pagos' ?
                                    <Fade>
                                        <FacturasAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/usuarios' ?
                                    <Fade>
                                        <AdmUsuarios />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/usuarios/detalles' ?
                                    <Fade>
                                        <ConductoresDetailAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/reclamos' ?
                                    <Fade>
                                        <ReclamosAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/alertas' ?
                                    <Fade>
                                        <AlertasAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/mis_datos' ?
                                    <Fade>
                                        <MisDatosAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/mis_datos/editar' ?
                                    <Fade>
                                        <EditarMisDatosAdm />
                                    </Fade>
                                :
                                null
                                
                                }
                            </div>
                        
                        </div>
                    </div>
                </section>
            
            </div>
        </div>
        
    )
    
}