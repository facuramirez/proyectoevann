import { Link } from 'react-router-dom';
import Style from './RegisterOne.module.css';
import register from '../../img/register.jpg'
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RegisterOne() {

    // ============= Motion ================
    const buttonVariants = {
        hover: {
            scale: 1.07,
            textShadow: '0px 0px 8px rgb(255, 255, 255)',
            boxShadow: '0px 0px 8px rgb(255, 255, 255)',
            transition: {
                duration: 0.25,
                yoyo: Infinity
            }
        }
    }



    // =====================================

    let history = useHistory();
    
    const scrollUp = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        history.push('./asociados/register');
    }
    

    return(
        <Fade>
        <div>
            <div className={Style.containerRegister}>            
                {/* <img src={register} className={Style.registerOne}/> */}
                <div className={Style.form}>
                </div>
                
                <div className={`${Style.formComplete}`}>
                    <h1 className={`${Style.title}`}>Muevete con Evann</h1>
                    <div className={Style.contentDescription}>
                        <span className={Style.description}>Súmate al servicio de transporte de personas con el standard más alto del país. Regístra tus datos e ingresa tus automóviles y conductores para que seas parte de nuestro selecto grupo
                        </span>
                        <button
                            className={Style.linkRegister}>                  
                            <Link to="/asociados/register" onClick={(e)=>scrollUp(e)} className={Style.linkRegister}>
                                REGÍSTRATE
                            </Link>
                        </button>
                        <span className={Style.here}>Si ya te registraste, ingresá <Link to='/asociados/iniciar_sesion'>Aquí</Link></span>
                        <span className={Style.here}>¿Olvidaste tu contraseña? click <Link to='/asociados/recuperar_contraseña'>Aquí</Link></span>
                    </div>
                    <div className={Style.info}>
                        <div className={Style.box}>
                            <h3>Más ingresos</h3>
                            <p className={Style.textBox}>Gana mas conduciendo con nuestra frecuencia de viajes y recibe los mejores beneficios por tu servicio.</p>    
                        </div>
                        <div className={Style.box}>
                            <h3>Nuestra App</h3>
                            <p className={Style.textBox}>Se tu propio jefe, tendrás siempre información actualizada respecto de tus viajes, tarifas trayectos, etc.</p>    
                        </div>
                        <div className={Style.box}>
                            <h3>Pasajeros Vip</h3>
                            <p className={Style.textBox}>Conduce para los más exigentes y exclusivos pasajeros y empresas de nuestro país.</p>
                        </div>
                    </div>                
                </div>                
            </div>
        </div>
        </Fade>
    )
}