import { useState, useEffect } from 'react';
import Style from './CambiarContraseña.module.css';
import register from '../../img/register.jpg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import Fade from 'react-reveal/Fade';
import { FaArrowAltCircleLeft, FaChevronCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import axios from '../../axiosConfig';

export default function CambiarContraseña(){
    
    let history = useHistory();
    
    let url = window.location.href;
    
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
        let data = {
            password: form.clave,
            confirm_password: form.repeatClave
        }
        console.log(data, 'dataASOCIADOS !!!!!!');

        if(form.clave !== '' && form.repeatClave !== '' && error.clave === '' && error.repeatClave === ''
        && form.clave === form.repeatClave){
            swal({
                title: '¿Confirmar Operación?',
                text: '¿Desea realizar el cambio de contraseña?',
                icon: 'warning',
                buttons: ['NO', 'SI']
            })
            .then(async(response) => {
                if(response) { // Si respondo que "SI"
                    await axios.post(`${process.env.REACT_APP_BACKEND}/users/change_password/`, data)
                    .then(async(response) => {                        
                        await swal({
                            title: 'Cambio de contraseña exitoso!',
                            text: 'Ya puede ingresar al sistema con su nueva contraseña',
                            icon: 'success'
                        })
                        .then(response => {
                            history.push('/back_office/mis_datos');
                        })                          
                    })
                    .catch(error => {
                        swal({
                            title: 'Error!',
                            text: 'No se pudo completar la operación, por favor vuelva a ingresar con su correo y contraseña para realizar el cambio',
                            icon: 'warning'
                        })
                        .then(response => {
                            axios.defaults.headers.common['Authorization'] = '';
                            history.push('/');
                        })
                    })
                }
            })
        } else {
            swal({
                title: 'Datos incorrectos!',
                text: 'Por favor verifica que los datos estén correctos!',
                icon: 'error',
                buttons: ['','OK']
            })
        }
    }

    // const back = (e) => {
    //     e.preventDefault();
    //     history.push('/back_office/');
    //     window.scrollTo(0, 0);
    // }

    const showPass = (e) => {
        let input1 = document.getElementById('input1');

        if(input1.type === 'password') {
            input1.type = 'text';    
        } else {
            input1.type = 'password';
        }
    }

    const showPass2 = (e) => {
        let input2 = document.getElementById('input2');

        if(input2.type === 'password') {
            input2.type = 'text';    
        } else {
            input2.type = 'password';
        }
    }

    return(
        <Fade>
        <div>
            <div className={`${Style.containerCambiarContraseña} row`}>            
                {/* <img src={register} className={Style.registerOne}/> */}
                <div className={Style.form}>
                </div>
                <div className={`${Style.formComplete}`}>
                    <h1 className={Style.title}>Cambiar Contraseña</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4>Modificar contraseña</h4>
                            <h5 className="p-0 m-0">Por favor complete los siguientes campos</h5>
                        </div>

                        <div className={`${Style.data} row`}>
                            <div className={`col-lg-12`}>
                                <div className="row">
                                    <h4 className={`${Style.labels} col-12 col-lg-12`}>Nueva Contraseña</h4>
                                    <input autoFocus className={`${Style.inpMail} mail col-12 col-lg-12 mt-2`} id="input1" type="password" name="clave" value={form.clave} onChange={(e)=> verifyClave(e)}/>
                                    <div className="col-12 text-center">
                                        <div className="row mt-1">
                                            <div className={`${Style.divCheck1} col-1`}>
                                                <input className={`${Style.check}`} onClick={(e)=>showPass(e)} type="checkbox" />
                                            </div>
                                            <div className={`${Style.divShow} col-10 text-start`}>
                                                <label className={`${Style.lblShow}`}>Mostrar contraseña</label>
                                            </div>
                                        </div>
                                    </div>
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
                                    <h4 className={`${Style.labels} col-12 col-lg-12 mt-3`}>Repetir Nueva Contraseña</h4>
                                    <input id="input2" autoFocus className={`${Style.inpMail} mail col-12 col-lg-12 mt-2`} id="input2" type="password" name="repeatClave" value={form.repeatClave} onChange={(e)=> verifyClave(e)}/>
                                    <div className="col-12">
                                        <div className="row mt-1">
                                            <div className={`${Style.divCheck2} col-1`}>
                                                <input className={`${Style.check}`} onClick={(e)=>showPass2(e)} type="checkbox" />
                                            </div>
                                            <div className={`${Style.divShow} col-10 text-start`}>
                                                <label className={`${Style.lblShow}`}>Mostrar contraseña</label>
                                            </div>
                                        </div>
                                    </div>
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
                                    <h5 className={`${Style.alertTextsC} text-center mt-3 col-12 col-md-6 col-lg-12`}>Las contraseñas establecidas no coinciden!</h5>
                                </div>
                                : null 
                            }
                               {!error.clave && form.clave && !error.repeatClave && form.repeatClave && (form.clave === form.repeatClave) ?
                                <div className={`col-lg-12`}>
                                    <h5 className={`${Style.alertTextsSuccess} text-center mt-3 col-12 col-md-6 col-lg-12`}>Correcto!</h5>
                                </div>
                                : null 
                            }
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <h5 className={`${alldata.ready ? "d-none":null} `}>Complete el formulario para habilitar el botón...</h5>
                        <div className={`${Style.buttons} w-100 d-flex justify-content-center`}>
                            {/* <button className={`${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button> */}
                            <button className={`${Style.save}`} onClick={(e)=>accept(e)}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fade>
    )
}