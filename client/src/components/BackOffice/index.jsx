import Style from './BackOffice.module.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useHistory, useLocation } from 'react-router-dom';
import image from '../../img/regBack.jpg';
import Vehiculos from '../Vehiculos';
import NewCarForm from '../NewCar/NewCarForm';
import Conductores from '../Conductores';
import ConductoresDetail from '../ConductoresDetail';
import NewConductorForm from '../NewConductor';
import Facturas from '../Facturas';
import Viajes from '../Viajes';
import Reclamos from '../Reclamos';
import Alertas from '../Alertas';
import MisDatos from '../MisDatos';
import EditarMisDatos from '../EditarMisDatos';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import { useSelector } from 'react-redux';
import axios from '../../axiosConfig';

export default function BackOffice() {
    
    let user = useSelector(state => state['user']);

    let history = useHistory();
    let url = window.location.href;
    let {pathname:ruta} = useLocation();

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
                await axios.get(`${process.env.REACT_APP_BACKEND}/users/logout/`)
                .then(response => {
                    history.push('/');
                })
                .catch(error => {
                    alert('Error al cerrar sesión!')
                })
            }            
        });
    }

    return(
        <div>
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
                                    <Link to="/back_office/mis_datos">Mis Datos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office/conductores">Conductores</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office/vehiculos">Vehículos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office/viajes">Viajes</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office/facturas_y_pagos">Facturas y Pagos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office/reclamos">Reclamos</Link>
                                </li>
                                <li className={`nav-item active d-md-block d-lg-none`}>
                                    <Link to="/back_office/alertas">Alertas</Link>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="" aria-current="page" onClick={(e)=>close(e)}>Cerrar Sesión</a>
                                </li>
                            </ul>                            
                        </div>                        
                    </div>
                </nav>
                

                <div className="d-none d-sm-none d-md-none d-lg-block col-lg-2">
                    <div className="row" >
                        <div className={`${Style.menuOptions} col-12`}>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/mis_datos">Mis Datos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/conductores">Conductores</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/vehiculos">Vehículos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/viajes">Viajes</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/facturas_y_pagos">Facturación y Pagos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/reclamos">Reclamos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/alertas">Alertas</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <section className={`${Style.details} d-sm-block d-md-block d-lg-block col-lg-10`}>
                    {/* <div className={`row`}>                         */}
                        <div className={`${Style.pageOffice}`}
                            // style={ruta.includes('/mis_datos/editar') ? {height:'100vh'}:
                            // ruta.includes('/mis_datos') ? {height:'87vh'}:
                            // ruta.includes('/vehiculos/nuevo_auto') ? {height:'100vh'}:
                            // ruta.includes('/vehiculos') ? {height:'87vh'}:null
                            // }
                        >
                            {/* <img src={image} className={`${Style.image} imageDom d-md-block d-lg-block`}
                                style={ruta.includes('/vehiculos/nuevo_auto') ? {height:'135%'}:
                                ruta.includes('/vehiculos') ? {height:'100%'}:
                                ruta.includes('/mis_datos/editar') ? {height:'100%'}:
                                ruta.includes('/mis_datos') ? {height:'fit-content', minHeight: '100%', maxHeight: '120%'}:
                                ruta.includes('/conductores/nuevo_conductor') ? {height:'115%'}:
                                ruta.includes('/conductores') ? {height:'fit-content', minHeight: '100vh', maxHeight: 'fit-content'}:
                                ruta.includes('/viajes') ? {height:'100%'}:
                                ruta.includes('/facturas_y_pagos') ? {height:'100%'}:
                                ruta.includes('/reclamos') ? {height:'100%'}:
                                ruta.includes('/alertas') ? {height:'100%'}:null
                                }
                            /> */}

                            {/* <div className={`${Style.opaco} opaco`}
                                 style={ruta.includes('/vehiculos/nuevo_auto') ? {height:'135%'}:
                                 ruta.includes('/vehiculos') ? {height:'100%'}:
                                 ruta.includes('/mis_datos/editar') ? {height:'100%'}:
                                 ruta.includes('/mis_datos') ? {height:'fit-content'}:
                                 ruta.includes('/conductores/nuevo_conductor') ? {height:'115%'}:
                                 ruta.includes('/conductores') ? {height:'100%'}:
                                 ruta.includes('/viajes') ? {height:'100%'}:
                                 ruta.includes('/facturas_y_pagos') ? {height:'100%'}:
                                 ruta.includes('/reclamos') ? {height:'100%'}:
                                 ruta.includes('/alertas') ? {height:'100%'}:null
                                 }
                            ></div> */}
                            <div className={`${Style.divOffice} row`}>
                                {
                                ruta === '/back_office' ?
                                    <div>               
                                        {history.push('back_office/mis_datos')}
                                    </div>
                                :
                                ruta === '/back_office/vehiculos' ?
                                    <Fade>
                                        <Vehiculos alto='100'/>
                                    </Fade>
                                :
                                ruta === '/back_office/vehiculos/nuevo_auto' ?
                                    <Fade>
                                        <NewCarForm alto='135'/>
                                    </Fade>
                                :
                                ruta === '/back_office/vehiculos/detalles' ?
                                    <Fade>
                                        <ConductoresDetail />
                                    </Fade>
                                :
                                ruta === '/back_office/conductores' ?
                                    <Fade>
                                        <Conductores />
                                    </Fade>
                                :
                                ruta === '/back_office/conductores/nuevo_conductor' ?
                                    <Fade>
                                        <NewConductorForm />
                                    </Fade>
                                :
                                ruta === '/back_office/facturas_y_pagos' ?
                                    <Fade>
                                        <Facturas />
                                    </Fade>
                                :
                                ruta === '/back_office/viajes' ?
                                    <Fade>
                                        <Viajes />
                                    </Fade>
                                :
                                ruta === '/back_office/reclamos' ?
                                    <Fade>
                                        <Reclamos />
                                    </Fade>
                                :
                                ruta === '/back_office/alertas' ?
                                    <Fade>
                                        <Alertas />
                                    </Fade>
                                :
                                ruta === '/back_office/mis_datos' ?
                                    <Fade>
                                        <MisDatos />
                                    </Fade>
                                :
                                ruta === '/back_office/mis_datos/editar' ?
                                    <Fade>
                                        <EditarMisDatos />
                                    </Fade>
                                :
                                null
                                
                                }
                            </div>
                        
                        </div>
                    
                </section>
            
            </div>
        </div>
    )
    
}