import { Link } from 'react-router-dom';
import Style from './RegisterOne.module.css';
import register from '../../img/register.jpg'
import { useEffect } from 'react';

export default function RegisterOne() {

    useEffect( () => {
        window.scrollTo(0, 0);
    });


    return(
        <div>
            <div className={Style.containerRegister}>            
                <img src={register} className={Style.registerOne}/>
                <div className={Style.form}>
                </div>
                
                <div className={`${Style.formComplete}`}>
                    <h1 className={`${Style.title}`}>Múevete con Evann</h1>
                    <div className={Style.contentDescription}>
                        <span className={Style.description}>Súmate al servicio de transporte de personas con el standard más alto del país. Regístra tus datos e ingresa tus automóviles y conductores para que seas parte de nuestro selecto grupo
                        </span>                        
                        <Link to="/asociados/register" className={Style.linkRegister}>REGÍSTRATE</Link>                    
                        <span className={Style.here}>Si ya te registraste, ingresá <Link to='/asociados/iniciar_sesion'>Aquí</Link></span>
                        <span className={Style.here}>¿Olvidaste tu contraseña? click <Link to='/asociados/recuperar_contraseña'>Aquí</Link></span>
                    </div>
                    <div className={Style.info}>
                        <div className={Style.box}>
                            <h3>Más ingresos</h3>
                            <p className={Style.textBox}>Gana mas conduciento con nuestra frecuencia de viajes y recibe los mejores beneficios por tu servicio.</p>    
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
    )
}