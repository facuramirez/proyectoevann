import { useState } from 'react';
import Style from './RegisterTwo.module.css';
import register from '../../img/register.jpg';


export default function RegisterTwo(){
    let inputRepeatEmail;

    let [form, setForm] = useState({
        mail: '',
        repeatMail: '',
        clave: '',
        repeatClave: '',
        admin: '',
        direccion: '',
        fechaNac: '',
        mail2: '',
        cel1: '',
        cel2: ''
    });

    let [error, setError] = useState({
        mail: '',
        repeatMail: '',
        clave: '',
        repeatClave: '',
        admin: '',
        direccion: '',
        fechaNac: '',
        mail2: '',
        cel1: '',
        cel2: ''
      });
    
    let [email, setEmail] = useState({
        valid: false,
        repeat: false
    });
    
    const verifyMail = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        inputRepeatEmail = document.querySelector('.repeatMail');

        if(name==='mail'){
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)){
                setError({...error, [name]: 'Error'});
                setEmail({...email, valid: false});                
                inputRepeatEmail.disabled = true;
            } else {
                setError({...error, [name]: ''});
                setEmail({...email, valid: true});                
                inputRepeatEmail.disabled = false;
            }
        }
        
        setForm({...form, [name]: value, repeatMail: inputRepeatEmail.disabled ? '':inputRepeatEmail.value});
        if(name==='repeatMail') validMail(e);
    }

    const validMail = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let mail = form.mail;

        if(value === mail){
            setEmail({...email, repeat:true});
            setError({...error, [name]: ''});
        }else{
            setEmail({...email, repeat:false});
            setError({...error, [name]: 'Error'});
        }
    }

    return(
        <div>
            <div className={Style.containerRegister}>            
                <img src={register} className={Style.registerOne}/>
                <div className={Style.form}>
                </div>
                <div className={`${Style.formComplete}`}>
                    <h1 className={Style.title}>Registro Administrador</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4>Registro Administrador</h4>
                            <h5>Tu usuario es tu mail</h5>
                        </div>

                        <div className={`${Style.data}`}>
                            <div className={`row`}>
                                <h4 className={`col-1`}>Mail</h4>
                                <input className={`mail col-4`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                <h4 className={`${Style.repeatMailLabel} col-md-2 col-lg-2`}>Repetir Mail</h4>
                                <input className={`${Style.repeatMail} repeatMail col-md-3 col-lg-4`} type="text" disabled name="repeatMail" value={form.repeatMail} onChange={(e)=> verifyMail(e)}/>
                            </div>
                            {error.mail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Introduza un correo válido</h5>
                                </div>
                                : null 
                                // !email.repeat ?
                                // <div className={`row`}>
                                //     <h5 className={`${Style.alertTexts} col-6`}>Debe repetir el email correctamente</h5>
                                // </div>:null
                            }
                            {!error.mail && !email.repeat && document.querySelector('.repeatMail') ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts2} col-9`}>Debe repetir exactamente el correo colocado</h5>
                                </div>
                                : null                                
                            }
                            <div className={`row`}>
                                <h4 className={`col-1`}>Clave</h4>
                                <input className={`col-3`} type="text" />
                                {/* <h1 className={`col-1`}></h1> */}
                                <h4 className={`${Style.repeatPass} col-3`}>Repetir Clave</h4>
                                <input className={`${Style.repeatPassInp} repeatPass col-4`} type="text" />
                            </div>
                            <div className={`row`}>
                                <h4 className={`${Style.admLabel} col-sm-5 col-md-4 col-lg-4`}>Nombre del Administrador</h4>
                                <input className={`${Style.inputLabel} col-sm-6 col-md-7 col-lg-7`} type="text" />
                            </div>
                            <div className={`row`}>
                                <h4 className={`col-2`}>Dirección</h4>
                                <input className={`${Style.inputDir} col-9`} type="text" />
                            </div>
                            <div className={`row`}>
                                <h4 className={`${Style.fechaNac} col-4`}>Fecha de Nacimiento</h4>
                                <input className={`${Style.inputFecha} col-7`} type="text" />
                            </div>                            
                            <div className={`${Style.cel} row`}>
                                <h4 className={`col-1`}>Celular1</h4>
                                <input className={`${Style.celInp1} col-3`} type="text" />
                                <h4 className={`${Style.cel2} col-2`}>Celular2</h4>
                                <input className={`${Style.celInp2} col-4`} type="text" />
                            </div>                        
                        </div>
                    </div>
                    <a href="" className={Style.save}>Guardar</a>
                </div>
                {/* <div className={`${Style.formComplete}`}>
                    <h1 className={`${Style.title}`}>Múevete con Evann</h1>
                    <div className={Style.contentDescription}>
                        <span className={Style.description}>Súmate al servicio de transporte de personas con el standard más alto del país. Regístra tus datos e ingresa tus automóviles y conductores para que seas parte de nuestro selectro grupo
                        </span>                        
                            <a href="" className={Style.linkRegister}><Link to="/asociados/register">REGÍSTRATE</Link></a>                        
                        <span className={Style.here}>Si ya te registraste, ingresá <a href="#">Aquí</a></span>
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
                                   
                </div>                     */}
                
            </div>
        </div>
    )
}