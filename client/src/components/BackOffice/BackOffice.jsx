import Style from './BackOffice.module.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useHistory, useLocation } from 'react-router-dom';
import image from '../../img/registerBack.jpg';
import Vehiculos from '../Vehiculos/Vehiculos';
import NewCarForm from '../NewCar/NewCarForm';
import Conductores from '../Conductores/Conductores';
import NewConductorForm from '../NewConductor/NewConductorForm';
import Facturas from '../Facturas/Facturas';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';

export default function BackOffice() {
    
    let history = useHistory();
    let url = window.location.href;
    let {pathname:ruta} = useLocation();
    console.log(ruta);

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

    return(
        
        <div>
            <div className={`${Style.containerBackOffice} row m-0`}>
                <section className={`${Style.menuBar} col-lg-2`}>
                <div className={`row`}>
                        <div className={`${Style.welcome} col-12 align-self-center`}>
                            <h3>Bienvenido Facundo!</h3>
                        </div>
                        <div className={Style.menuOptions}>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/">Mis Datos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/conductores">Conductores</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/vehiculos">Vehículos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/">Viajes</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/back_office/facturas_y_pagos">Facturación y Pagos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/">Reclamos</Link>
                            </div>
                            <div className={`${Style.options} col-12`}>
                                <Link to="/">Alertas</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`${Style.details} col-lg-10`}>
                    <div className={`row`}>
                        <div className={`${Style.close} col-12`}>
                            <a href="" onClick={(e)=>close(e)}>Cerrar Sesión</a>
                        </div>
                        
                        <div className={`${Style.pageOffice} col-12`}>
                            <img src={image}/>
                            <div className={Style.opaco}></div>
                            <div className={`${Style.divOffice} row`}>
                                {ruta === '/back_office' ?                               
                                    <h1>SOY BACKOFFICE</h1>
                                :
                                ruta === '/back_office/vehiculos' ?
                                    <Fade>
                                        <Vehiculos />
                                    </Fade>
                                :
                                ruta === '/back_office/vehiculos/nuevo_auto' ?
                                    <Fade>
                                        <NewCarForm />
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