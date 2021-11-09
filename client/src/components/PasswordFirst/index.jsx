import { useState, useEffect } from 'react';
import Style from './PasswordFirst.module.css';
import register from '../../img/register.jpg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import Fade from 'react-reveal/Fade';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import axios from '../../axiosConfig';

export default function PasswordFirst(){
    
    let history = useHistory();
    
    useEffect( () => {
        window.scrollTo(0, 0);
    });
    
    let [form, setForm] = useState({
        clave: '',
        repeatClave: ''
    });
 
    let [error, setError] = useState({
        clave: '',
        repeatClave: ''
    });

    let [alldata, setAlldata] = useState({
        ready: false
    });
    
    const verifyClave = (e) => {
        e.preventDefault();
        let value = e.target.value;
        let name = e.target.name;
        
        if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g.test(value)){ // al menos una letra y un numero
            setError({...error, [name]:'Error'});
        } else {
            setError({...error, [name]:''});
        }        
        setForm({...form, [name]:value});
    }
   
    const accept = async (e) => {
        e.preventDefault();
        
        if(form.clave !== '' && form.repeatClave !== '' && error.clave === '' && error.repeatClave === ''
        && form.clave === form.repeatClave){            
            swal({
                title: 'Contraseña reestablecida',
                text: 'Una vez que el administrador apruebe su cuenta podrá ingresar al sistema!',
                icon: 'success'
            })
        
            // await axios.post(`${process.env.REACT_APP_BACKEND}/users/change_password/`, form);
            
        } else {
            swal({
                title: 'Datos incorrectos!',
                text: 'Por favor verifica que los datos estén correctos!',
                icon: 'error'
            })
        }
    }

    const back = (e) => {
        e.preventDefault();
        history.push('/asociados');
        window.scrollTo(0, 0);
    }

    return(
        <Fade>
        <div>
            <div className={Style.containerRegister}>            
                {/* <img src={register} className={Style.registerOne}/> */}
                <div className={Style.form}>
                </div>
                <div className={`${Style.formComplete}`}>
                    <h1 className={Style.title}>Primera modificación de contraseña</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4>Modificar contraseña</h4>
                            <h5>Por favor complete los siguientes campos</h5>
                        </div>

                        <div className={`${Style.data} row`}>
                            <div className={`col-lg-12`}>
                                <div className="row">
                                    <h4 className={`${Style.labels} col-12 col-lg-4 mt-2`}>Nueva Contraseña</h4>
                                    <input autoFocus className={`${Style.inpMail} mail col-12 col-lg-8 mt-2`} type="text" name="clave" value={form.clave} onChange={(e)=> verifyClave(e)}/>
                                </div>
                            </div>
                            {error.clave && form.clave ?
                                <div className={`col-lg-12`}>
                                    <h5 className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}>Mínimo 8 caracteres, una letra y un número</h5>
                                </div>
                                : null 
                            }
                            <div className={`col-lg-12`}>
                                <div className="row">
                                    <h4 className={`${Style.labels} col-12 col-lg-5 mt-2`}>Repetir Nueva Contraseña</h4>
                                    <input autoFocus className={`${Style.inpMail} mail col-12 col-lg-7 mt-2`} type="text" name="repeatClave" value={form.repeatClave} onChange={(e)=> verifyClave(e)}/>
                                </div>
                            </div>
                            {error.repeatClave && form.repeatClave ?
                                <div className={`col-lg-12`}>
                                    <h5 className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}>Mínimo 8 caracteres, una letra y un número</h5>
                                </div>
                                : null 
                            }
                            {!error.clave && form.clave && !error.repeatClave && form.repeatClave && (form.clave !== form.repeatClave) ?
                                <div className={`col-lg-12`}>
                                    <h5 className={`${Style.alertTextsC} border text-center mt-3 col-12 col-md-6 col-lg-12`}>Las contraseñas establecidas no coinciden!</h5>
                                </div>
                                : null 
                            }
                               {!error.clave && form.clave && !error.repeatClave && form.repeatClave && (form.clave === form.repeatClave) ?
                                <div className={`col-lg-12`}>
                                    <h5 className={`${Style.alertTextsSuccess} border text-center mt-3 col-12 col-md-6 col-lg-12`}>Correcto!</h5>
                                </div>
                                : null 
                            }
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <h5 className={`${alldata.ready ? "d-none":null} `}>Complete el formulario para habilitar el botón...</h5>
                        <div className={`${Style.buttons} w-100 d-flex justify-content-center`}>
                            <button className={`${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button>
                            <button className={`${Style.save}`} onClick={(e)=>accept(e)}>Aceptar</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        </Fade>
    )
}