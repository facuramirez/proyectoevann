import { useState, useEffect } from 'react';
import Style from './Login.module.css';
import register from '../../img/register.jpg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';
// import axios from '../../axiosConfig';
import axios from '../../axiosConfig';
import { dataUser } from '../../globalState/Actions';
import { useDispatch } from 'react-redux';


export default function Login(){

    let history = useHistory();
    let dispatch = useDispatch();

    // useEffect( () => {
    //     window.scrollTo(0, 0);
    // });
    
    let [form, setForm] = useState({
        mail: '',
        clave: ''
    });

    let [error, setError] = useState({
        mail: '',
        clave: ''
    });
    
    let [email, setEmail] = useState({
        valid: false,
        repeat: false
    });
    
    const verifyMail = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        

        // ================ PROCESO EMAIL, REPEAT EMAIL =====================
        if(name==='mail'){
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)){
                setError({...error, [name]: 'Error'});
                setEmail({...email, valid: false});                
                
            } else {
                setError({...error, [name]: ''});
                setEmail({...email, valid: true});                
                
            }
        }
        
        // =========================================================================
        // ================ PROCESO PASSWORD, REPEAT PASSWORD ======================
        if(name==='clave'){
            let typedPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if(!typedPass.test(value)){
                setError({...error, [name]: 'Error'});
                setPass({...pass, valid: false});               
                
            } else {
                setError({...error, [name]: ''});
                setPass({...pass, valid: true});
                
            }
        }

        setForm({
            ...form,
            [name]: value,
        });

        if(!error.mail && !error.clave && form.mail && form.clave) {
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
        
        if(!/^[A-Za-z]+$/g.test(value)){
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

    // ================= ESTE LOGIN ES SOLO FRONTEND =========================
    // const login = async (e) => {
    //     e.preventDefault();
        
    //     history.push('/back_office/mis_datos');
    //     swal({
    //         title: 'Bienvenido a Evann!',
    //         text: 'Que disfrutes tu estadía en la página',
    //         icon: 'success',
    //         timer: 2000
    //     })
           
        
    // }
    // =======================================================================================


    // ================= ESTE LOGIN ES EL QUE FUNCIONA CON BACKEND =========================
    const login = async (e) => {
        e.preventDefault();
        let data = {
            username: form.mail,
            password: form.clave
        }

        await axios.post(`${process.env.REACT_APP_BACKEND}/owners/login/`, data)
        .then(async(response) => { // si los datos estan correctos
            if(response.data.is_password_temp) {
                history.push('/asociados/cambiar_contraseña');
            }
            else {
            await axios.get(`${process.env.REACT_APP_BACKEND}/users/info`)
            .then(response => {
                dispatch(dataUser(response.data));
                history.push('/back_office/mis_datos');
                swal({
                    title: 'Bienvenido a Evann!',
                    text: 'Que disfrutes tu estadía en la página',
                    icon: 'success',
                    timer: 2000
                })
            })
            .catch(error => {
                console.log(error);
            })
            }
        })
        .catch(error => { // si los datos NO estan correctos
            swal({
                title: 'Datos Incorrectos!',
                text: 'El correo y/o la contraseña no son válidos',
                icon: 'warning',
                timer: 2500
            })
        })
    }
    // =======================================================================================
  

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
                    <h1 className={Style.title}>Iniciar sesión</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4>Iniciar sesión - Asociados</h4>
                            <h5>Tu usuario es tu mail</h5>
                        </div>

                        <div className={`${Style.data}`}>
                            <div className={`row`}>
                                <h4 className={`col-2 text-center`}>Mail</h4>
                                <input autoFocus className={`mail col-9`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                            </div>
                            {error.mail && form.mail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Introduza un correo válido</h5>
                                </div>
                                : null 
                            }
                            <div className={`row mt-3`}>
                                <h4 className={`col-2 text-center`}>Clave</h4>
                                <input className={`col-9 pass`} type="password" name="clave" value={form.clave} onChange={(e)=> verifyMail(e)}/>
                            </div>
                            {/* {error.clave && form.clave ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Mínimo 8 caracteres, una letra y un número</h5>
                                </div>
                                : null 
                            }                             */}
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <div className={`${Style.buttons} row d-flex justify-content-center`}>
                            <button className={`${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button>
                            <button className={`${Style.save}`} onClick={(e)=>login(e)}>Ingresar</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        </Fade>
    )
}