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

export default function PasswordFirst(){
    
    let history = useHistory();
    
    useEffect( () => {
        window.scrollTo(0, 0);
    });
    
    let [form, setForm] = useState({
        mail: ''
    });
 
    let [error, setError] = useState({
        mail: ''
      });
    
    let [email, setEmail] = useState({
        valid: false
    });

    let [alldata, setAlldata] = useState({
        ready: false
    });
    
    const verifyMail = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        
        // ================ PROCESO EMAIL, REPEAT EMAIL =====================
        if(name==='mail'){
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,4})+$/.test(value)){
                setError({...error, [name]: 'Error'});
                setEmail({...email, valid: false});                
                
            } else {
                setError({...error, [name]: ''});
                setEmail({...email, valid: true});          
            }
        }
        
        // =========================================================================
               
        setForm({
            ...form,
            [name]: value,
        });

        if(!error.mail && form.mail) {
            setAlldata({ready: true})
        } else {
            setAlldata({ready: false})
        }
    }
   
    const save = (e) => {
        e.preventDefault();
        
        if(alldata.ready){
            swal({
                title: 'Contraseña reestablecida',
                text: 'Por favor revise su correo para visualizar su nueva contraseña',
                icon: 'success'
              })
        } else {
            swal({
                title: 'Correo incompleto!',
                text: 'Debes colocar un correo válido para reestablecer tu contraseña',
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
                    <h1 className={Style.title}>Reestablecer contraseña</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4>Recuperar contraseña</h4>
                            <h5>Coloque su usuario para reestablecer su contraseña</h5>
                        </div>

                        <div className={`${Style.data} row`}>
                            <div className={`col-lg-12`}>
                                <div className="row">
                                    <h4 className={`${Style.labels} col-12 col-lg-2 mt-2`}>Mail</h4>
                                    <input autoFocus className={`${Style.inpMail} mail col-12 col-lg-10 mt-2`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                </div>
                            </div>
                            <div className={`col-lg-12`}>
                                <div className="row">
                                    <h4 className={`${Style.labels} col-12 col-lg-4 mt-2`}>Contraseña Actual</h4>
                                    <input autoFocus className={`${Style.inpMail} mail col-12 col-lg-8 mt-2`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                </div>
                            </div>
                            <div className={`col-lg-12`}>
                                <div className="row">
                                    <h4 className={`${Style.labels} col-12 col-lg-4 mt-2`}>Nueva Contraseña</h4>
                                    <input autoFocus className={`${Style.inpMail} mail col-12 col-lg-8 mt-2`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                </div>
                            </div>
                            <div className={`col-lg-12`}>
                                <div className="row">
                                    <h4 className={`${Style.labels} col-12 col-lg-5 mt-2`}>Repetir Nueva Contraseña</h4>
                                    <input autoFocus className={`${Style.inpMail} mail col-12 col-lg-7 mt-2`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                </div>
                            </div>
                            {error.mail && form.mail ?
                                <div className={`col-lg-12`}>
                                    <h5 className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}>Introduza un correo válido</h5>
                                </div>
                                : null 
                            }                            
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <h5 className={`${alldata.ready ? "d-none":null} `}>Complete el formulario para habilitar el botón...</h5>
                        <div className={`${Style.buttons} w-100 d-flex justify-content-center`}>
                            <button className={`${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button>
                            <button className={`${Style.save}`} onClick={(e)=>save(e)}>Aceptar</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        </Fade>
    )
}