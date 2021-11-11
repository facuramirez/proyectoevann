import { useState, useEffect } from 'react';
import Style from './RegisterTwo.module.css';
import register from '../../img/register.jpg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import Reveal from 'react-reveal/Reveal';
import axios from '../../axiosConfig';


export default function RegisterTwo(){

    let history = useHistory();

    let inputRepeatEmail;
    let inputRepeatPass;

    let [form, setForm] = useState({
        rut: '',
        mail: '',
        repeatMail: '',
        // clave: '',
        // repeatClave: '',
        admin: '',
        ape: '',
        direccion: '',
        fechaNac: '2021-01-01',
        cel1: '',
        cel2: '',
        cuenta: '',
        tipo_cuenta: '',
        banco: ''
    });
 
    let [error, setError] = useState({
        rut: '',
        mail: '',
        repeatMail: '',
        // clave: '',
        // repeatClave: '',
        admin: '',
        ape: '',
        direccion: '',
        fechaNac: '',
        cel1: '',
        cel2: '',
        cuenta: '',
        tipo_cuenta: '',
        banco: ''
      });
    
    let [email, setEmail] = useState({
        valid: false,
        repeat: false
    });
    
    let prueba = Object.keys(form);
    
    // window.onload = function() {
    //     let repeat = document.querySelector('.repeatMail');
    //     let repeat2 = document.querySelector('.repeatPass');

    //     repeat.onpaste = (e) => {
    //         e.preventDefault();
    //         paste(repeat);
    //     }
    //     repeat2.onpaste = (e) => {
    //         e.preventDefault();
    //         paste(repeat2);
    //     }
    // }

    
    const verifyMail = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        
        inputRepeatEmail = document.querySelector('.repeatMail');
        // inputRepeatPass = document.querySelector('.repeatPass');

        // let repeat = document.querySelector('.repeatMail');
        // let repeat2 = document.querySelector('.repeatPass');
        
        inputRepeatEmail.onpaste = (e) => {
            e.preventDefault();
            swal({
                title: 'Acción inválida!',
                text: 'Por favor repita su correo manualmente',
                icon: 'warning'
            })
        }
        
        // repeat2.onpaste = (e) => {
        //     e.preventDefault();
        //     swal({
        //         title: 'Acción inválida!',
        //         text: 'Por favor repita su clave manualmente',
        //         icon: 'warning'
        //     })
        // }
        
        

        // ================ PROCESO EMAIL, REPEAT EMAIL =====================
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
        
        // =========================================================================
        // ================ PROCESO PASSWORD, REPEAT PASSWORD ======================
        // if(name==='clave'){
        //     let typedPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        //     if(!typedPass.test(value)){
        //         setError({...error, [name]: 'Error'});
        //         setPass({...pass, valid: false});
        //         console.log(error, 'invalido');                
        //         inputRepeatPass.disabled = true;
        //     } else {
        //         setError({...error, [name]: ''});
        //         setPass({...pass, valid: true});
        //         console.log(error, 'VALIDO');                
        //         inputRepeatPass.disabled = false;
        //     }
        // }

        setForm({
            ...form,
            [name]: value,
            repeatMail: inputRepeatEmail.disabled ? '':inputRepeatEmail.value
            // repeatClave: inputRepeatPass.disabled ? '':inputRepeatPass.value
        });

        if(!error.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.banco) {
            setAlldata({ready: true})
        } else {
            setAlldata({ready: false})
        }

        if(name==='repeatMail' || name==='repeatClave') validMail(e);
    }

    const verifyData = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        
        if(!form.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.banco) {
            setAlldata({ready: true})
        } else {
            setAlldata({ready: false})
        }

        setForm({...form, [name]: value});
    }

    const validMail = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let mail = form.mail;
        let clave = form.clave;
        
        if(name==='repeatMail'){
            if(value === mail){
                setEmail({...email, repeat:true});
                setError({...error, [name]: ''});
            }else{
                setEmail({...email, repeat:false});
                setError({...error, [name]: 'Error'});
            }
        }

        // if(name==='repeatClave'){
        //     if(value === clave){
        //         setPass({...pass, repeat:true});
        //         setError({...error, [name]: ''});
        //     }else{
        //         setPass({...pass, repeat:false});
        //         setError({...error, [name]: 'Error'});
        //     }
        // }

        if(!error.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && !error.tipo_cuenta && !error.banco) {
            setAlldata({ready: true})
        } else {
            setAlldata({ready: false})
        }

    }

    let [pass, setPass] = useState({
        valid: false,
        repeat: false
    });

    let [admin, setAdmin] = useState({
        valid: false
    })

    const verifyAdmin = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        
        if(!/^[A-Za-z\s]+$/g.test(value)){
            setAdmin({...admin, valid: false});
            setError({...error, [name]: 'Error'});
        } else {
            setAdmin({...admin, valid: true});
            setError({...error, [name]: ''});
        }

        setForm({...form, [name]: value});
        
        if(!error.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && !error.tipo_cuenta && !error.banco) {
            setAlldata({ready: true})
        } else {
            setAlldata({ready: false})
        }
    }
    
    // ====== MATERIAL UI (Calendario Fecha de Nacimiento) =======
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
    }));

    const classes = useStyles();
    // ===========================================================

    let [alldata, setAlldata] = useState({
        ready: false
    });

    let loginUser = {
        username: process.env.REACT_APP_USER_BACKEND,
        password: process.env.REACT_APP_PASSWORD_BACKEND
    }

    let registracion = {
        user: {
            rut: 'rut', // DNI Chileno a partir de 6000000-5 (en vez de 5 puede ir del 1 al 9)
            name: 'Facundo',
            last_name: 'Ramirez',
            address: 'Av.Lopez y Planes 123',
            birth_date: '1990-10-12',
            phone_number: '73736466',
            phone_number2: '73736466',
            email: 'facundo123123@gmail.com'
        },
        bank_account: {
          number: 1, // Aca va el numero de cuenta bancaria
          type: 0,  // Tipo de cuenta (menu desplegable) por ej: cta cte, por ahora "0" (cero)
          bank: 1 // Menu desplegable (Get Bancos Backend). Mientras dejar en 1
        },
        billing_settings: {
          frequency: 1 // Cada cuanto tiempo se le va a pagar al asociado
        }
    }

    const save = async (e) => {
        e.preventDefault();
        let data = {
            user: {
                rut: form.rut,
                name: form.admin,
                last_name: form.ape,
                address: form.direccion,
                birth_date: form.fechaNac,
                phone_number: form.cel1,
                phone_number2: form.cel2,
                email: form.mail
            },
            bank_account: {
                number: 0,
                type: form.tipo_cuenta,
                bank: parseInt(form.banco)
            },
            billing_settings: {
                frequency: 1
            }
        };
        console.log(data);

        if(!error.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.tipo_cuenta !== '-' && form.banco && form.banco !== '-') {
            await swal({
                title: '¿Seguro?',
                text: '¿Confirmar registro de asociado?',
                icon: 'warning',
                buttons: ['NO','SI']
            })
            .then(async(response) => {
                if(response){
                    await axios.post(`${process.env.REACT_APP_BACKEND}/owners/`, data)
                    .then(async (response) => {
                        await swal({
                            title: 'Administrador registrado con éxito!',
                            text: 'Por favor verifica tu correo para validar la cuenta',
                            icon: 'success',
                            timer: 2000,
                            buttons: ['']
                        })
                        history.push('/asociados/iniciar_sesion');
                    })
                    .catch(error => {
                        console.log(error, 'ERROR POST OWNER');
                    })
                } // cierro if
            }) // cierro then                     
        } else {
            swal({
                title: 'Formulario incompleto!',
                text: 'Debes completar el formulario para poder registrarte',
                icon: 'error'
              })
        }
    }

    const verifyRut = (e) => {
        e.preventDefault();
        let rut1 = document.getElementById('rut1').value;
        let rut2 = document.getElementById('rut2').value;
        
        if(/^\d*$/.test(rut1) && (rut1 >= 6000000 && rut1 < 99000000)){
            setError({...error, rut: ''});
        } else {
            setError({...error, rut: 'Error'});
        }
    
        if(/^\d*$/.test(rut2) || rut2.toUpperCase() === 'K'){
            setError({...error, rut: ''});
        } else {
            setError({...error, rut: 'Error'});
        }
        
        let rutComplete = `${rut1}-${rut2}`;

        setForm({...form, rut: rutComplete});
        console.log(error, 'error');
        console.log(form, 'form');
    }

    const verifyCel = (e) => {
        let number = e.target.value;
        let name = e.target.name;
    
        if(/^\d*$/.test(number)){
            setError({...error, [name]: ''});
        } else {
            setError({...error, [name]: 'Error'});
        }
        
        setForm({...form, [name]:number})

        let buttonSave = document.querySelector('.notActive');

        if(!error.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.banco) {
            modifyAllData(true);
            let button = document.querySelector('.notActive');
            if(alldata.ready) button.disabled = false;
        } else {
            modifyAllData(false);           
        }
    }

    const modifyAllData = (value) => {
        setAlldata(formPrev => {return {...formPrev, ready:value }});
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
                <div className={`${Style.formComplete} row`}>
                    <h1 className={`${Style.title} col-5`}>Registro Asociado</h1>
                    <div className={`${Style.formRegister} col-12`}>
                        <div className={Style.titleForm}>
                            <h4 className={`${Style.titleReg}`}>Registro Asociado</h4>
                            <h5 className={`${Style.descriptionReg}`}>Tu usuario es tu mail</h5>
                        </div>
                        <div className={`${Style.data}`}>
                            <div className={`row`}>                        
                                <h4 className={`col-sm-3 col-md-3 col-lg-2`}>Rut (*)</h4>
                                <input autoFocus className={`mail col-4 col-sm-3 col-md-3 col-lg-3 text-center`} type="text" name="rut1" id="rut1"  onChange={(e)=> verifyRut(e)}/>
                                &nbsp;-&nbsp;
                                <input autoFocus className={`mail col-1 col-sm-1 col-md-1 col-lg-1 text-center`} type="text" name="rut2" id="rut2"  onChange={(e)=> verifyRut(e)}/>
                                {error.rut && form.rut ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>El formato permitido es 0000000-0 / 0000000-K</h5>
                                </div>
                                : null
                                }
                            </div>
                            <div className={`row`}>                        
                                <h4 className={`col-sm-3 col-md-3 col-lg-2`}>Mail (*)</h4>
                                <input autoFocus className={`mail col-11 col-sm-8 col-md-8 col-lg-9`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                {error.mail && form.mail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Introduza un correo válido</h5>
                                </div>
                                : null
                                }
                            </div>
                            <div className={`row`}>
                                <h4 className={`${Style.repeatMailLabel} col-sm-3 col-md-3 col-lg-2`}>Repetir Mail (*)</h4>
                                <input className={`${Style.repeatMail} repeatMail col-11 col-sm-8 col-md-8 col-lg-9`} type="text" disabled name="repeatMail" value={form.repeatMail} onChange={(e)=> verifyMail(e)}/>
                            {!error.mail && !email.repeat && form.repeatMail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts2} col-9`}>Debe repetir exactamente el correo colocado</h5>
                                </div>
                                : null                   
                            }
                            </div>
                            <div className={`row`}>
                                <h4 className={`${Style.admLabel} col-sm-3 col-md-3 col-lg-2`}>Nombre (*)</h4>
                                <input className={`${Style.inputLabel} col-11 col-sm-8 col-md-8 col-lg-9`} type="text" name="admin" value={form.admin} onChange={(e)=> verifyAdmin(e)}/>
                            </div>
                            {error.admin && form.admin ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                            }
                            <div className={`row`}>
                                <h4 className={`${Style.admLabel} col-sm-3 col-md-3 col-lg-2`}>Apellido (*)</h4>
                                <input className={`${Style.inputLabel} col-11 col-sm-8 col-md-8 col-lg-9`} type="text" name="ape" value={form.ape} onChange={(e)=> verifyAdmin(e)}/>
                            </div>
                            {error.ape && form.ape ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                            }
                            <div className={`row`}>
                                <h4 className={`col-11 col-sm-3 col-md-3 col-lg-2`}>Dirección (*)</h4>
                                <input className={`${Style.inputDir} col-11 col-sm-8 col-md-8 col-lg-9`} type="text" name="direccion" value={form.direccion} onChange={ (e)=> verifyData(e)}/>
                            </div>
                            <div className={`row`}>
                                <h4 className={`${Style.fechaNac} col-11 col-md-5 col-lg-4`}>Fecha de Nacimiento (*)</h4>
                                <form className={`${classes.container} ${Style.inputFecha} col-11 col-md-6 col-lg-7`} noValidate>
                                    <TextField
                                        id="date"
                                        label=""
                                        type="date"
                                        name="fechaNac"
                                        value={form.fechaNac}
                                        onChange={(e)=> verifyData(e)}
                                        // defaultValue="2017-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </form>

                                {/* <input className={`${Style.inputFecha} col-7`} type="text" /> */}
                            </div>                            
                            <div className={`${Style.cel} row`}>
                                <h4 className={`col-11 col-sm-3 col-md-3 col-lg-2`}>Celular1 (*)</h4>
                                <input className={`${Style.celInp1} col-11 col-sm-8 col-md-3 col-lg-3 mt-1`} type="text" name="cel1" value={form.cel1} onChange={(e)=> verifyCel(e)}/>
                                <h4 className={`${Style.cel2} col-11 col-sm-3 col-md-2 col-lg-2 text-md-center text-lg-center`}>Celular2</h4>
                                <input className={`${Style.celInp2} col-11 col-sm-8 col-md-3 col-lg-4 mt-1`} type="text" name="cel2" value={form.cel2} onChange={(e)=> verifyCel(e)}/>
                            </div>
                            {(error.cel1 && form.cel1 && error.cel2 && form.cel2) ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-5`}>Sólo números</h5>
                                    <h5 className={`${Style.alertTexts} col-5 text-left`}>Sólo números</h5>
                                </div>
                                : (error.cel1 && !error.cel2) ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo números</h5>
                                </div>
                                :(!error.cel1 && error.cel2) ?
                                <div className={`row justify-content-center`}>
                                    <h5 className={`${Style.alertTexts} col-6 text-center`}>Sólo números</h5>
                                </div>:null
                            }
                            <div className={`row`}>                        
                                <h4 className={`col-sm-5 col-md-5 col-lg-3`}>Nro Cuenta Bancaria (*)</h4>
                                <input className={`mail col-11 col-sm-6 col-md-6 col-lg-8`} type="text" name="cuenta" value={form.cuenta} onChange={(e)=> verifyCel(e)}/>
                                {error.cuenta && form.cuenta ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo números</h5>
                                </div>
                                : null
                                }
                            </div>
                            <div className={`row`}>                   
                                <h4 className={`col-sm-4 col-md-4 col-lg-2`}>Tipo Cuenta (*)</h4>
                                <select className={`mail col-11 col-sm-7 col-md-7 col-lg-9`} name="tipo_cuenta" value={form.tipo_cuenta} onChange={(e)=> verifyData(e)}>
                                    <option value="-" selected onChange={(e)=> verifyData(e)}>-</option>
                                    <option value="CC" onChange={(e)=> verifyData(e)}>CC</option>
                                    <option value="CV" onChange={(e)=> verifyData(e)}>CV</option>
                                    <option value="CE" onChange={(e)=> verifyData(e)}>CE</option>    
                                </select>
                                {form.tipo_cuenta === '-' ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Debe completar este campo</h5>
                                </div>
                                : null
                                }
                            </div>
                            <div className={`row`}>                   
                                <h4 className={`col-sm-3 col-md-3 col-lg-2`}>Banco (*)</h4>
                                <select className={`mail col-11 col-sm-8 col-md-8 col-lg-9`} name="banco" value={form.banco} onChange={(e)=> verifyData(e)}>
                                    <option value="-" selected>-</option>
                                    <option value="1">Scotiabank</option>
                                    <option value="2">Banco de Chile</option>
                                    <option value="3">Banco del Estado</option>
                                    <option value="4">Banco EDW</option>
                                    <option value="5">Banco BCI</option>
                                </select>
                                {form.banco === '-' ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Debe completar este campo</h5>
                                </div>
                                : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <h5 className={`${alldata.ready ? "d-none":null} text-center`}>Complete el formulario para habilitar el botón...</h5>
                        <div className={`${Style.buttons} row d-flex justify-content-center`}>
                            <button className={`${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button>
                            <button className={`${Style.save} notActive`} onClick={(e)=>save(e)}>Guardar</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        </Fade>
    )
}