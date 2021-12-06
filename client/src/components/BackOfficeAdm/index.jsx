import Style from './BackOfficeAdm.module.css';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useHistory, useLocation } from 'react-router-dom';
import image from '../../img/regBack.jpg';
import Asociados from '../Asociados';
import AsociadosEditar from '../AsociadosEditar';
import AsociadosVehiculos from '../AsociadosVehiculos';
import AsociadosVehiculosDetalle from '../AsociadosVehiculosDetalle';
import AsociadosViajes from '../AsociadosViajes';
import AsociadosViajesDetalle from '../AsociadosViajesDetalle';
import NewCarFormAdm from '../NewCarAdm/NewCarForm';
import ConductoresAdm from '../ConductoresAdm';
import ConductoresDetail from '../ConductoresDetail';
import ConductoresDetailAdm from '../ConductoresDetailAdm';
import NewConductorFormAdm from '../NewConductorAdm';
import FacturasAdm from '../FacturasAdm';
import AdmUsuarios from '../AdmUsuarios';
import ReclamosAdm from '../ReclamosAdm';
import AlertasAdm from '../AlertasAdm';
import PendientesAprobacion from '../PendientesAprobacion';
import PendientesAsociados from '../PendientesAsociados';
import PendientesConductores from '../PendientesConductores';
import PendientesConductoresId from '../PendientesConductoresId';
import MisDatosAdm from '../MisDatosAdm';
import EditarMisDatosAdm from '../EditarMisDatosAdm';
import CambiarPasswordAdm from '../CambiarContraseñaAdm';
import PasswordAdmin from '../PasswordAdmin';
import { useSelector } from 'react-redux';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../axiosConfig';
import { dataUser } from '../../globalState/Actions';


export default function BackOfficeAdm() {
    let dispatch = useDispatch();
    const { id } = useParams();
    let history = useHistory();
    let url = window.location.href;
    let {pathname:ruta} = useLocation();

    let user = useSelector(state => state['user']);
    
    // if(user === {}) history.push('/administracion');

    // ===== LA SIGUIENTE LINEA OBJECT KEYS ES PARA EL BACKEND ====
    // if(Object.keys(user).length === 0) history.push('/administracion');
    // ===============================================================
    
    // let userData;

    // useEffect( () => {
    //     axios.get(`${process.env.REACT_APP_BACKEND}/admins/`)
    //     .then(response => {
    //         userData = response.data.find( usuario => usuario.rut === user.rut)
    //         console.log(user, 'USER');
    //         dispatch(dataUser(userData));
            
    //     })
    // }, [])

    // // =========== ESTO ES CON FRONTEND ==================
    // const close = (e) => {
    //     e.preventDefault();
    //     swal({
    //         title: '¿Cerrar sesión?',
    //         text: 'Confirme si desea cerrar la sesión',
    //         icon: 'warning',
    //         buttons: ["NO", "SI"]
    //     })
    //     .then( async (response) => {
    //         if(response){
    //             await swal({
    //                 title: 'Adiós, vuelve pronto!',
    //                 text: 'Redireccionando a Evann...',
    //                 icon: 'success',
    //                 buttons: [''],
    //                 timer: 2000
    //             })                
    //             history.push('/');
    //         }
    //     })
    //     .catch(error => {
    //         alert('Error al cerrar sesión!')
    //     })
    // }

    // =========== ESTO ES CON BACKEND ==================
    const close = (e) => {
        e.preventDefault();
        swal({
            title: '¿Cerrar sesión?',
            text: 'Confirme si desea cerrar la sesión',
            icon: 'warning',
            buttons: ["NO", "SI"]
        }).then( async (response) => {
            if(response){                    
                await axios.get(`${process.env.REACT_APP_BACKEND}/users/logout/`)
                .then(async(response) => {
                    axios.defaults.headers.common['Authorization'] = '';
                    await swal({
                        title: 'Adiós, vuelve pronto!',
                        text: 'Redireccionando a Evann...',
                        icon: 'success',
                        buttons: [''],
                        timer: 2000
                    })
                    history.push('/');
                })
                .catch(error => {
                    alert('Error al cerrar sesión!')
                })
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
    // ================================================================
    
    return(
        <div>
            {user ? 
            <div className={`${Style.containerBackOffice} row m-0`}>                 
                <nav className={`${Style.navBar} navbar navbar-expand-lg navbar-light bg-light`}>
                    <div className={`${Style.menu} container-fluid`}>
                        <a className={`${Style.welcome} navbar-brand`} href="#">Bienvenido {user.name}</a>
                        <button className={`${Style.buttonHamburguer} navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`${Style.divUlNav} collapse navbar-collapse`} id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/mis_datos">Mis Datos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/cambiar_contraseña">Cambiar Contraseña</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/asociados">Asociados</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/usuarios">Administración de Usuarios</Link>
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
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office_administracion/pendientes_aprobacion">Pendientes de aprobación</Link>
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
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/cambiar_contraseña">Cambiar contraseña</Link>
                            </div>
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
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office_administracion/pendientes_aprobacion">Pendientes de aprobación</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <section className={`${Style.details} d-sm-block d-md-block d-lg-block col-lg-10`}>
                    {/* <div className={`row`}>                         */}
                        <div className={`${Style.pageOffice}`}
                            // style={ruta.includes('/mis_datos/editar') ? {height:'96vh'}:
                            // ruta.includes('/mis_datos') ? {height:'87vh'}:
                            // ruta.includes('/asociados/editar') ? {height:'70vh'}:
                            // ruta.includes('/asociados/conductores/detalles') ? {height:'100vh'}:
                            // ruta.includes('/asociados') ? {height:'87vh'}:null
                            // }
                        >
                            {/* <img src={image} className={`${Style.image} imageDom d-md-block d-lg-block`}
                                style={ruta.includes('/asociados/vehiculos/detalles') ? {height:'150%'}:                                
                                ruta.includes('/asociados/editar') ? {height:'135%'}:
                                ruta.includes('/conductores/detalles') ? {height:'105%'}:
                                ruta.includes('/asociados') ? {height:'87vh'}:
                                ruta.includes('/asociados/editar') ? {height:'100%'}:
                                ruta.includes('/mis_datos/editar') ? {height:'100%'}:
                                ruta.includes('/mis_datos') ? {height:'100%'}:                                
                                ruta.includes('/conductores/nuevo_conductor') ? {height:'100%'}:
                                ruta.includes('/conductores') ? {height:'100%'}:
                                ruta.includes('/usuarios/detalles') ? {height:'105%'}:
                                ruta.includes('/usuarios') ? {height:'100%'}:
                                ruta.includes('/facturas_y_pagos') ? {height:'100%'}:
                                ruta.includes('/reclamos') ? {height:'100%'}:
                                ruta.includes('/alertas') ? {height:'100%'}:null
                            }
                            /> */}
                            {/* <div className={`${Style.opaco} opaco`}
                                 style={ruta.includes('/vehiculos/detalles') ? {height:'150%'}:
                                 ruta.includes('/asociados/editar') ? {height:'135%'}:
                                 ruta.includes('/conductores/detalles') ? {height:'105%'}:
                                 ruta.includes('/asociados') ? {height:'87vh'}:
                                 ruta.includes('/mis_datos/editar') ? {height:'100%'}:
                                 ruta.includes('/mis_datos') ? {height:'100%'}:                                 
                                 ruta.includes('/conductores/nuevo_conductor') ? {height:'100%'}:
                                 ruta.includes('/conductores') ? {height:'100%'}:
                                 ruta.includes('/usuarios/detalles') ? {height:'105%'}:
                                 ruta.includes('/usuarios') ? {height:'100%'}:
                                 ruta.includes('/facturas_y_pagos') ? {height:'100%'}:
                                 ruta.includes('/reclamos') ? {height:'100%'}:
                                 ruta.includes('/alertas') ? {height:'100%'}:null
                                 }
                            ></div> */}
                            <div className={`${Style.divOffice} `}>
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
                                ruta === '/back_office_administracion/cambiar_contraseña' ?
                                    <Fade>
                                        <CambiarPasswordAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion/vehiculos' ?
                                    <Fade>
                                        <AsociadosVehiculos />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/vehiculos/nuevo_auto' ?
                                    <Fade>
                                        <NewCarFormAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion/vehiculos/detalles' ?
                                    <Fade>
                                        <AsociadosVehiculosDetalle />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion' ?
                                    <Fade>
                                        <PendientesAprobacion />
                                    </Fade>
                                :
                                ruta === `/back_office_administracion/pendientes_aprobacion/conductores/${id}` ?
                                    <Fade>
                                        <PendientesConductoresId />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion/conductores' ?
                                    <Fade>
                                        <PendientesConductores />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion/asociados' ?
                                    <Fade>
                                        <PendientesAsociados />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion/conductores/detalles' ?
                                    <Fade>
                                        <ConductoresDetailAdm />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion/viajes' ?
                                    <Fade>
                                        <AsociadosViajes />
                                    </Fade>
                                :
                                ruta === '/back_office_administracion/pendientes_aprobacion/viajes/detalles' ?
                                    <Fade>
                                        <AsociadosViajesDetalle />
                                    </Fade>
                                :
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
                                ruta === '/back_office_administracion/usuarios/roles' ?
                                    <Fade>
                                        <ConductoresDetail />
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
                </section>
            
            </div>
            :null}
        </div>
        
    )
    
}