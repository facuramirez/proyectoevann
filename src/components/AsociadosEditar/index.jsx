import { useState, useEffect } from 'react';
import Style from './AsociadosEditar.module.css';
import register from '../../img/register.jpg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import Reveal from 'react-reveal/Reveal';


export default function AsociadosEditar(){
    let asociado = useSelector( state => state['editAssociated']);
    console.log(asociado);
    let history = useHistory();

    let inputRepeatEmail;
    let inputRepeatPass;

    let [form, setForm] = useState({
        mail: asociado.mail,
        repeatMail: '',
        clave: '',
        repeatClave: '',
        admin: asociado.nombre,
        direccion: asociado.direccion,
        fechaNac: '2021-03-19',
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
        cel1: '',
        cel2: ''
      });
    
    let [email, setEmail] = useState({
        valid: false,
        repeat: false
    });
    
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
        inputRepeatPass = document.querySelector('.repeatPass');

        let repeat = document.querySelector('.repeatMail');
        let repeat2 = document.querySelector('.repeatPass');
        
        repeat.onpaste = (e) => {
            e.preventDefault();
            swal({
                title: 'Acción inválida!',
                text: 'Por favor repita su correo manualmente',
                icon: 'warning'
            })
        }
        
        repeat2.onpaste = (e) => {
            e.preventDefault();
            swal({
                title: 'Acción inválida!',
                text: 'Por favor repita su clave manualmente',
                icon: 'warning'
            })
        }
        
        

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
        if(name==='clave'){
            let typedPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if(!typedPass.test(value)){
                setError({...error, [name]: 'Error'});
                setPass({...pass, valid: false});
                console.log(error, 'invalido');                
                inputRepeatPass.disabled = true;
            } else {
                setError({...error, [name]: ''});
                setPass({...pass, valid: true});
                console.log(error, 'VALIDO');                
                inputRepeatPass.disabled = false;
            }
        }

        setForm({
            ...form,
            [name]: value,
            repeatMail: inputRepeatEmail.disabled ? '':inputRepeatEmail.value,
            repeatClave: inputRepeatPass.disabled ? '':inputRepeatPass.value
        });

        if(!error.mail && !error.repeatMail && !error.clave && !error.repeatClave && !error.admin && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && form.mail && form.repeatMail && form.clave && form.repeatClave && form.admin && form.direccion && form.fechaNac && form.cel1) {
            setAlldata({ready: true})
        } else {
            setAlldata({ready: false})
        }

        if(name==='repeatMail' || name==='repeatClave') validMail(e);
    }

    const verifyData = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        
        if(!error.mail && !error.repeatMail && !error.clave && !error.repeatClave && !error.admin && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && form.mail && form.repeatMail && form.clave && form.repeatClave && form.admin && form.direccion && form.fechaNac && form.cel1) {
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

        if(name==='repeatClave'){
            if(value === clave){
                setPass({...pass, repeat:true});
                setError({...error, [name]: ''});
            }else{
                setPass({...pass, repeat:false});
                setError({...error, [name]: 'Error'});
            }
        }

        if(!error.mail && !error.repeatMail && !error.clave && !error.repeatClave && !error.admin && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && form.mail && form.repeatMail && form.clave && form.repeatClave && form.admin && form.direccion && form.fechaNac && form.cel1) {
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
        
        if(!error.mail && !error.repeatMail && !error.clave && !error.repeatClave && !error.admin && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && form.mail && form.repeatMail && form.clave && form.repeatClave && form.admin && form.direccion && form.fechaNac && form.cel1) {
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

    const save = async (e) => {
        e.preventDefault();
        
        if(alldata.ready){
            await swal({
                title: 'Administrador registrado con éxito!',
                text: 'Por favor verifica tu correo para validar la cuenta',
                icon: 'success',
                timer: 2000,
                buttons: ['']
              })
            history.push('/asociados/iniciar_sesion');              
        } else {
            swal({
                title: 'Formulario incompleto!',
                text: 'Debes completar el formulario para poder registrarte',
                icon: 'error'
              })
        }
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

        if(!error.mail && !error.repeatMail && !error.clave && !error.repeatClave && !error.admin && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && form.mail && form.repeatMail && form.clave && form.repeatClave && form.admin && form.direccion && form.fechaNac && form.cel1) {
            modifyAllData(true);
            let button = document.querySelector('.notActive');
            console.log(alldata.ready, 'ready');
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
        history.push('/back_office_administracion/asociados');
        window.scrollTo(0, 0);
    }

    return(
        <Fade>
        <div>
            <div className={Style.containerRegister}>
                <div className={Style.form}>
                </div>
                <div className={`${Style.formComplete}`}>
                    <h1 className={Style.title}>Editar Asociado "XXX"</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4>Editar Administrador</h4>
                            <h5>Tu usuario es tu mail</h5>
                        </div>

                        <div className={`${Style.data}`}>
                            <div className={`row`}>
                                <h4 className={`col-md-1 col-lg-1`}>Mail</h4>
                                <input autoFocus className={`col-md-4 col-lg-4 mt-1 mt-md-0 mt-lg-0 mail`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                <h4 className={`${Style.repeatMailLabel} col-md-2 col-lg-2 mt-2 mt-md-0 mt-lg-0`}>Repetir Mail</h4>
                                <input className={`${Style.repeatMail} repeatMail col-md-5 col-lg-5 mt-1 mt-md-0 mt-lg-0`} type="text" disabled name="repeatMail" value={form.repeatMail} onChange={(e)=> verifyMail(e)}/>
                            </div>
                            {error.mail && form.mail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Introduza un correo válido</h5>
                                </div>
                                : null 
                            }
                            {!error.mail && !email.repeat && form.repeatMail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts2} col-9`}>Debe repetir exactamente el correo colocado</h5>
                                </div>
                                : null                                
                            }
                            <div className={`row`}>
                                <h4 className={`col-md-1 col-lg-1 mt-2 mt-md-2 mt-lg-2`}>Clave</h4>
                                <input className={`col-md-5 col-lg-5 mt-1 mt-md-2 mt-lg-2 pass`} type="password" name="clave" value={form.clave} onChange={(e)=> verifyMail(e)}/>
                                {/* <h1 className={`col-1`}></h1> */}
                                <h4 className={`${Style.repeatPass} col-md-2 col-lg-2 mt-2 mt-md-2 mt-lg-2`}>Repetir Clave</h4>
                                <input className={`${Style.repeatPassInp} col-md-4 col-lg-4 mt-1 mt-md-2 mt-lg-2 repeatPass`} type="password" name="repeatClave" value={form.repeatClave} onChange={(e)=> verifyMail(e)}disabled/>
                            </div>
                            {error.clave && form.clave ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Mínimo 8 caracteres, una letra y un número</h5>
                                </div>
                                : null 
                            }
                            {!error.clave && !pass.repeat && form.repeatClave ?
                                <div className={`row justify-content-center`}>
                                    <h5 className={`${Style.alertTexts2} col-5`}>Debe repetir exactamente la clave colocada</h5>
                                </div>
                                : null                                
                            }
                            <div className={`row`}>
                                <h4 className={`${Style.admLabel} col-sm-12 col-md-4 col-lg-4 mt-2 mt-md-2 mt-lg-2`}>Nombre del Administrador</h4>
                                <input className={`${Style.inputLabel} col-sm-12 col-md-8 col-lg-8 mt-md-2 mt-lg-2`} type="text" name="admin" value={form.admin} onChange={(e)=> verifyAdmin(e)}/>
                            </div>
                            {error.admin && form.admin ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                            }                            
                            <div className={`row`}>
                                <h4 className={`col-md-2 col-lg-2 mt-2 mt-md-2 mt-lg-2`}>Dirección</h4>
                                <input className={`${Style.inputDir} col-md-10 col-lg-10 mt-md-2 mt-lg-2`} type="text" name="direccion" value={form.direccion} onChange={ (e)=> verifyData(e)}/>
                            </div>
                            <div className={`row`}>
                                <h4 className={`${Style.fechaNac} col-md-4 col-lg-4 mt-2 mt-md-2 mt-lg-2`}>Fecha de Nacimiento</h4>
                                <form className={`${classes.container} ${Style.inputFecha} col-md-7 col-lg-7 mt-md-2 mt-lg-2 p-0`} noValidate>
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
                            </div>                            
                            <div className={`${Style.cel} row`}>
                                <h4 className={`col-md-2 col-lg-2 mt-2 mt-md-2 mt-lg-2`}>Celular1</h4>
                                <input className={`${Style.celInp1} col-md-4 col-lg-4 mt-md-2 mt-lg-2`} type="text" name="cel1" value={form.cel1} onChange={(e)=> verifyCel(e)}/>
                                <h4 className={`${Style.cel2} col-md-2 col-lg-2 mt-2 mt-md-2 mt-lg-2`}>Celular2</h4>
                                <input className={`${Style.celInp2} col-md-4 col-lg-4 mt-md-2 mt-lg-2`} type="text" name="cel2" value={form.cel2} onChange={(e)=> verifyCel(e)}/>
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
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <h5 className={``}>Complete el formulario para habilitar el botón...</h5>
                        <div className={`${Style.buttons} row w-75`}>
                            <button className={`col-3 ${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button>
                            <button className={`col-3 mx-auto ${Style.save} notActive`} onClick={(e)=>save(e)}>Guardar</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        </Fade>
    )
}