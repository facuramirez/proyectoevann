import { useState, useEffect } from 'react';
import Style from './NewConductor.module.css';
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


export default function NewConductor(){

    let history = useHistory();

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

    let [form, setForm] = useState({
        nombre: '',
        direccion: '',
        nacionalidad: '',
        fechaNac: '',
        email: '',
        cel: '',
        foto: '',
        carne: '',
        licencia: ''
    });

    let [error, setError] = useState({
        nombre: 'Error',
        direccion: 'Error',
        nacionalidad: 'Error',
        fechaNac: 'Error',
        email: 'Error',
        cel: 'Error',
        foto: 'Error',
        carne: 'Error',
        licencia: 'Error'
    });

    const clear = (e) => {
        e.preventDefault();
        // let inputs = document.querySelectorAll('input');
        // inputs.forEach( (input) => {
        //     input.value = '';
        // });
        // inputs[0].focus();
        let inputs = document.querySelectorAll('input');

        setForm({
            nombre: '',
            direccion: '',
            nacionalidad: '',
            fechaNac: '',
            email: '',
            cel: '',
            foto: '',
            carne: '',
            licencia: ''
        })

        setError({
            nombre: 'Error',
            direccion: 'Error',
            nacionalidad: 'Error',
            fechaNac: 'Error',
            email: 'Error',
            cel: 'Error',
            foto: 'Error',
            carne: 'Error',
            licencia: 'Error'
        })

        inputs[0].focus();
    }

    const inputs = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })

        if(value === '') {
            setError({
                ...error,
                [name]: 'Error'
            })
        } else {
            setError({
                ...error,
                [name]: ''
            })
        }
        console.log(form, 'form');   
    }

    const save = async (e) => {
        e.preventDefault();
        if(form.nombre && form.direccion && form.nacionalidad && form.fechaNac && form.email && form.cel && form.foto && form.carne && form.licencia && !error.nombre && !error.direccion && !error.nacionalidad && !error.fechaNac && !error.email && !error.cel && !error.foto && !error.carne && !error.licencia){
            await swal({
                title: 'Operación exitosa!',
                text: 'El conductor fue registrado correctamente',
                icon: 'success',
                buttons: [''],
                timer: 2000
              })
            history.push('/back_office_administracion/conductores');
        } else {
            await swal({
                title: 'Advertencia!',
                text: 'Por favor complete los campos obligatorios antes de guardar',
                icon: 'warning'
              })
            document.getElementById('nombreLabel').focus();          
        }
    }

    const back = (e) => {
        e.preventDefault();
        history.push('/back_office/conductores');
    }

    return(
        <Fade>
        <div>
            <div className={Style.containerRegister}>
                <div className={Style.form}>
                </div>
                <div className={`${Style.formComplete}`}>
                    <h1 className={`${Style.title} mt-4`}>Nuevo Conductor</h1>
                    <div className={Style.formRegister}>
                        <div className={Style.titleForm}>
                            <h4 className={Style.titleEdit}>Completar formulario</h4>
                            <h5>Tu usuario es tu mail</h5>
                        </div>

                        <div className={`${Style.data}`}>
                            <div className={`row`}>
                                <h4 className={`col-1 mt-md-2 mt-lg-2`} id="nombreLabel">Nombre</h4>
                                <input autoFocus className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`} type="text" name="nombre" onChange={(e)=>inputs(e)} value={form.nombre}/>
                                <h4 className={`${Style.repeatMailLabel} col-2 mt-md-2 mt-lg-2 text-sm-start text-md-center text-lg-end`}>Dirección</h4>
                                <input className={`${Style.repeatMail} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `} type="text" name="direccion" onChange={(e)=>inputs(e)} value={form.direccion}/>
                            </div>
                            {/* {error.mail && form.mail ?
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
                            } */}
                            <div className={`row`}>
                                <h4 className={`${Style.clave} col-2 mt-md-2 mt-lg-2`}>Nacionalidad</h4>
                                <input className={`${Style.claveInp} col-11 col-sm-11 col-md-3 col-lg-2 mt-md-2 mt-lg-2 pass`} type="password" name="nacionalidad" onChange={(e)=>inputs(e)} value={form.nacionalidad}/>
                                <h4 className={`${Style.fechaNac} col-4 col-md-3 col-lg-3 mt-2 mt-md-2 mt-lg-2 text-end`}>Fecha de Nacimiento</h4>
                                <form className={`${classes.container} ${Style.inputFecha} mt-sm-1 p-0 p-sm-0 col-11 col-sm-11 col-md-3 col-lg-4`} noValidate>
                                    <TextField
                                        id="date"
                                        label=""
                                        type="date"
                                        name="fechaNac"
                                        value={form.fechaNac}
                                        onChange={(e)=> inputs(e)}
                                        // defaultValue="2017-05-24"
                                        className={`${Style.fechaNacField} ${classes.textField}`}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </form>
                            </div>
                            {/* {error.clave && form.clave ?
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
                            } */}
                            {/* <div className={`row`}>
                                <h4 className={`${Style.admLabel} mt-md-2 mt-lg-2 col-4 col-sm-4 col-md-3 col-lg-3`}>Nombre Administrador</h4>
                                <input className={`${Style.inputLabel} mt-2 mt-sm-2 col-11 col-sm-11 col-md-3 col-lg-3`} type="text" name="admin" value={form.admin} onChange={(e)=> verifyAdmin(e)}/>
                                <h4 className={`${Style.dir} col-2 mt-md-2 mt-lg-2 text-end`}>Dirección</h4>
                                <input className={`${Style.inputDir} mt-2 mt-sm-2 col-11 col-sm-11 col-md-3 col-lg-3`} type="text" name="direccion" value={form.direccion} onChange={ (e)=> verifyData(e)}/>
                            </div>
                            {error.admin && form.admin ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                            } */}
                            
                            
                            <div className={`row`}>
                                <h4 className={`col-1 mt-md-2 mt-lg-2`}>Email</h4>
                                <input autoFocus className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`} type="text" name="email" onChange={(e)=>inputs(e)} value={form.email}/>
                                <h4 className={`${Style.repeatMailLabel} col-2 mt-md-2 mt-lg-2 text-sm-start text-md-center text-lg-end`}>Celular</h4>
                                <input className={`${Style.repeatMail} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `} type="text" name="cel" onChange={(e)=>inputs(e)} value={form.cel}/>
                            </div>
                            
                            
                            <div className={`${Style.fotos} row`}>
                                <h4 className={`col-3 col-sm-3 col-md-2 col-lg-2 mt-md-3 mt-lg-3`}>Foto (*)</h4>
                                {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.foto} name="foto"/> */}
                                <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                    <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                    :null
                                } */}
                            </div>
                        
                        
                            <div className={`${Style.fotos} row`}>
                                <h4 className={`col-2 mt-md-3 mt-lg-3`}>Carne (*)</h4>
                                {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.carne} name="carne"/> */}
                                <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                    <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                    :null
                                } */}
                            </div>
                        
                        
                            <div className={`${Style.fotos} row`}>
                                <h4 className={`col-2 mt-md-3 mt-lg-3`}>Licencia (*)</h4>
                                {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.licencia} name="licencia"/> */}
                                <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                    <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                    :null
                                } */}
                            </div>
                            

                            {/* <div className="row" >
                                <div className={`${Style.docs} col-8`}>
                                    <div className={`${Style.docsDivs}`}>
                                        <label className={`${Style.labelDocs} mt-3`}>Permiso de Circulación (*)</label>
                                        <label className={`${Style.labelDocs} mt-3`}>Seguro Responsabilidad Civil (*)</label>
                                        <label className={`${Style.labelDocs} mt-3`}>Permiso de Circulación (*)</label>
                                    </div>
                                    <div className={`${Style.docsDivs}`}>
                                        <input type="file" className={`${Style.upButtons}`} />
                                        <input type="file" className={`${Style.upButtons}`} />
                                        <input type="file" className={`${Style.upButtons}`} />
                                    </div>
                                </div>
                            </div> */}
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
        </Fade>
    )
}