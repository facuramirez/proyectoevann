import Style from './NewCar.module.css';
import { Link } from 'react-router-dom';
import Vehiculos from '../Vehiculos';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import image from '../../img/registerBack.jpg';
import NewCarForm from './NewCarForm';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';


export default function NewCar() {

    let history = useHistory();
    let url = window.location.href;

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
                                Mis Datos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Conductores
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Vehículos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Viajes
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Facturación y Pagos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Reclamos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Alertas
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
                            <img className={`${Style.imageCar}`} src={image}/>
                            <div className={Style.opaco}></div>
                            <div className={`${Style.divOffice} row`}>
                                <Fade>
                                    <NewCarForm />
                                </Fade>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
        
    )
}