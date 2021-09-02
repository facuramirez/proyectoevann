import { useState, useEffect } from 'react';
import Style from './Password.module.css';
import register from '../../img/register.jpg';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';


export default function Password(){
    
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

    
    // console.log('=======================================');
    // console.log(alldata);
    // console.log(form);
    // console.log(error);

    return(
        <div>
            <div className={Style.containerRegister}>            
                <img src={register} className={Style.registerOne}/>
                <div className={Style.form}>
                </div>
                <div className={`${Style.formComplete}`}>
                    <h1 className={Style.title}>Reestablecer contraseña</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4>Recuperar contraseña</h4>
                            <h5>Coloque su usuario para reestablecer su contraseña</h5>
                        </div>

                        <div className={`${Style.data}`}>
                            <div className={`row`}>
                                <h4 className={`col-1`}>Mail</h4>
                                <input autoFocus className={`${Style.inpMail} mail col-10`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                            </div>
                            {error.mail && form.mail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Introduza un correo válido</h5>
                                </div>
                                : null 
                            }                            
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <h5 className={`${alldata.ready ? "d-none":null} `}>Complete el formulario para habilitar el botón...</h5>
                        <button className={`${Style.save} ${alldata.ready ? Style.disabled:Style.color} notActive`} onClick={(e)=>save(e)}>Aceptar</button>
                    </div>
                </div>                
            </div>
        </div>
    )
}