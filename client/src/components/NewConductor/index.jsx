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
        rut: '',
        name: '',
        last_name: '',
        address: '',
        birth_date: '',
        phone_number: '',
        phone_number2: '',
        email: '',        
        nationality: '',
        license_number: '',        
        foto: '',
        carnet: '',
        licencia: '',
        antecedentes: '',
        hoja: '',
        seguro: '',        
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    });

    let [error, setError] = useState({
        rut: '',
        name: '',
        last_name: '',
        address: '',
        birth_date: '',
        phone_number: '',
        phone_number2: '',
        email: '',        
        nationality: '',
        license_number: '',        
        foto: '',
        carnet: '',
        licencia: '',
        antecedentes: '',
        hoja: '',
        seguro: '',        
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    });

    const clear = (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');

        setForm({
            rut: '',
            name: '',
            last_name: '',
            address: '',
            birth_date: '',
            phone_number: '',
            phone_number2: '',
            email: '',        
            nationality: '',
            license_number: '',        
            foto: '',
            carnet: '',
            licencia: '',
            antecedentes: '',
            hoja: '',
            seguro: '',        
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
        });

        setError({
            rut: '',
            name: '',
            last_name: '',
            address: '',
            birth_date: '',
            phone_number: '',
            phone_number2: '',
            email: '',        
            nationality: '',
            license_number: '',        
            foto: '',
            carnet: '',
            licencia: '',
            antecedentes: '',
            hoja: '',
            seguro: '',        
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
        });

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
    }

    const verifyRut = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let rut1 = document.getElementById('rut1').value;
        let rut2 = document.getElementById('rut2').value;
        
        if(name === 'rut1'){
            if(/^\d*$/.test(parseInt(rut1)) && (rut1 >= 6000000 && rut1 < 99000000)){
                setError({...error, rut: ''});
            } else {
                setError({...error, rut: 'Error'});
            }
        }
        
        if(name === 'rut2'){
            if(/^\d*$/.test(parseInt(rut2)) || rut2.toUpperCase() === 'K'){
                setError({...error, rut: ''});
            } else {
                setError({...error, rut: 'Error'});
            }
        }

        if(!rut1 && !rut2){
            setError({...error, rut: ''});
        }
        else if(!rut1 || !rut2 ){
            setError({...error, rut: 'Error'});
        }

        let rutComplete = `${rut1}-${rut2}`;

        setForm({...form, rut: rutComplete});
        // console.log(error, 'error');
        // console.log(form, 'form');
    }

    const verifyData = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        
        // if(!form.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.banco) {
        //     setAlldata({ready: true})
        // } else {
        //     setAlldata({ready: false})
        // }

        setForm({...form, [name]: value});
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

        // let buttonSave = document.querySelector('.notActive');

        // if(!error.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.banco) {
        //     modifyAllData(true);
        //     let button = document.querySelector('.notActive');
        //     if(alldata.ready) button.disabled = false;
        // } else {
        //     modifyAllData(false);           
        // }
    }

    const verifyAdmin = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        
        if(!/^[A-Za-z\s]+$/g.test(value)){
            setError({...error, [name]: 'Error'});
        } else {
            setError({...error, [name]: ''});
        }
        setForm({...form, [name]: value});
        console.log(form, 'form');
        console.log(error, 'error');
    }

    const save = async (e) => {
        e.preventDefault();
        console.log(form, 'asdas');
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
            <div className={`${Style.containerRegister} row`}>
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
                                <h4 className={`col-sm-3 col-md-3 col-lg-2`}>Rut (*)</h4>
                                <input autoFocus className={`mail col-4 col-sm-3 col-md-3 col-lg-3 text-center`} type="text" name="rut1" id="rut1"  onChange={(e)=> verifyRut(e)}/>
                                &nbsp;&nbsp;&nbsp;-
                                <input className={`mail col-1 col-sm-1 col-md-1 col-lg-1 text-center`} type="text" name="rut2" id="rut2"  onChange={(e)=> verifyRut(e)}/>
                                {error.rut && form.rut ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>El formato permitido es 0000000-0 / 0000000-K</h5>
                                </div>
                                : null
                                }
                            </div>
                            <div className={`row`}>
                                <h4 className={`${Style.lblname} col-1 mt-md-2 mt-lg-2`} id="nombreLabel">Nombre</h4>
                                <input className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`} type="text" name="name" value={form.name} onChange={(e)=> verifyAdmin(e)}/>
                                <h4 className={`${Style.lbl_last_name} col-1 mt-md-2 mt-lg-2`} id="nombreLabel">Apellido</h4>
                                <input className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-5 col-lg-5`} type="text" name="last_name" value={form.last_name} onChange={(e)=>verifyAdmin(e)}/>
                                
                                {( (error.name && form.name) || (error.last_name && form.last_name) ) ?
                                <div className={`row d-none d-md-block d-lg-block`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Nombre y Apellido admiten sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                                }
                                {error.last_name && form.last_name ?
                                <div className={`row d-block d-md-none d-lg-none`}>
                                    <h5 className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                                }

                                {error.name && form.name ?
                                <div className={`row d-block d-md-none d-lg-none`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                                }
                                {error.last_name && form.last_name ?
                                <div className={`row d-block d-md-none d-lg-none`}>
                                    <h5 className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                                }
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
                                <h4 className={`${Style.lblDireccion} col-1 mt-md-2 mt-lg-2`}>Dirección</h4>
                                <input className={`${Style.inpDireccion} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `} type="text" name="address" onChange={(e)=>verifyData(e)} value={form.address}/>
                                <h4 className={`${Style.fechaNac} col-10 col-md-3 col-lg-3 mt-2 mt-md-2 mt-lg-2`}>Fecha de Nacimiento</h4>
                                <form className={`${classes.container} ${Style.inputFecha} mt-sm-1 p-0 p-sm-0 col-11 col-sm-11 col-md-3 col-lg-3`} noValidate>
                                    <TextField
                                        id="date"
                                        label=""
                                        type="date"
                                        name="fechaNac"
                                        value={form.birth_date}
                                        onChange={(e)=> verifyData(e)}
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
                                <h4 className={`${Style.lbl_cel1} col-1 mt-md-2 mt-lg-2 text-sm-start`}>Celular1</h4>
                                <input className={`${Style.inpt_cel1} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `} type="text" name="phone_number" value={form.phone_number} onChange={(e)=>verifyCel(e)} value={form.phone_number}/>
                                <h4 className={`${Style.lbl_cel2} col-1 mt-md-2 mt-lg-2 text-sm-start`}>Celular2</h4>
                                <input className={`${Style.inpt_cel2} mt-1 mt-sm-1 col-11 col-sm-11 col-md-5 col-lg-5 repeatMail `} type="text" name="phone_number2" value={form.phone_number2} onChange={(e)=>verifyCel(e)} value={form.phone_number2}/>
                            </div>
                            
                            <div className="d-none d-md-block d-lg-block">
                            {
                                (error.phone_number && form.phone_number && error.phone_number2 && form.phone_number2) ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-5`}>Sólo números</h5>
                                    <h5 className={`${Style.alertTexts} col-5 text-left`}>Sólo números</h5>
                                </div>
                                : (error.phone_number && !error.phone_number2) ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo números</h5>
                                </div>
                                :(!error.phone_number && error.phone_number2) ?
                                <div className={`row justify-content-center`}>
                                    <h5 className={`${Style.alertTexts} col-6 text-center`}>Sólo números</h5>
                                </div>:null
                            }
                            </div>

                            <div className={`row`}>
                                <h4 className={`col-1 mt-md-2 mt-lg-2`}>Email</h4>
                                <input className={`mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`} type="text" name="email" onChange={(e)=>inputs(e)} value={form.email}/>
                                <h4 className={`${Style.clave} col-2 mt-2 mt-md-2 mt-lg-2`}>Nacionalidad</h4>
                                <input className={`${Style.claveInp} col-11 col-sm-11 col-md-4 col-lg-4 mt-1 fmt-md-1 mt-lg-1`} type="password" name="nacionalidad" onChange={(e)=>inputs(e)} value={form.nacionalidad}/>
                            </div>

                            <div className={`row`}>
                                <h4 className={`col-12 col-md-3 col-lg-3 mt-2 mt-md-2 mt-lg-2`}>Viajes Internacionales</h4>
                                <div className={`col-5 col-sm-4 col-md-2 col-lg-2 mt-1 mt-md-1 mt-lg-1`}>
                                    <select className={`w-100`} name="inter_travels" value={form.inter_travels} onChange={(e)=> inputs(e)}>
                                        <option value="-" defaultValue>-</option>
                                        <option value="1">Sí</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                                <h4 className={`${Style.nroLicLbl} col-12 col-md-2 col-lg-2 mt-2 mt-md-2 mt-lg-2`}>Nro Licencia</h4>
                                <input className={`${Style.nroLicInp} col-11 col-sm-11 col-md-4 col-lg-4 mt-1 mt-md-1 mt-lg-1`} type="password" name="nacionalidad" onChange={(e)=>inputs(e)} value={form.nacionalidad}/>
                            </div>
                            
                            <div className={`${Style.files}`}>
                                <div className={`${Style.fotos} row`}>
                                    <h4 className={`col-10 col-md-1 col-lg-1 mt-md-3 mt-lg-3`}>Foto (*)</h4>
                                    {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.foto} name="foto"/> */}
                                    <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} name="foto" onChange={(e)=>inputs(e)} value={form.foto}/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>                            
                                
                                <div className={`${Style.fotos} row`}>
                                    <h4 className={`col-10 col-md-1 col-lg-1 mt-md-3 mt-lg-3`}>Carne (*)</h4>
                                    {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.carne} name="carne"/> */}
                                    <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>                            
                            
                                <div className={`${Style.fotos} row`}>
                                    <h4 className={`col-10 col-md-1 col-lg-1 mt-md-3 mt-lg-3`}>Licencia (*)</h4>
                                    {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.licencia} name="licencia"/> */}
                                    <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>

                                <div className={`${Style.fotos} row`}>
                                    <h4 className={`col-10 col-md-1 col-lg-1 mt-md-3 mt-lg-3`}>Antecedentes (*)</h4>
                                    {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.licencia} name="licencia"/> */}
                                    <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>

                                <div className={`${Style.fotos} row`}>
                                    <h4 className={`col-10 col-md-1 col-lg-1 mt-md-3 mt-lg-3`}>Hoja (*)</h4>
                                    {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.licencia} name="licencia"/> */}
                                    <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>

                                <div className={`${Style.fotos} row`}>
                                    <h4 className={`col-10 col-md-1 col-lg-1 mt-md-3 mt-lg-3`}>Seguro (*)</h4>
                                    {/* <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.licencia} name="licencia"/> */}
                                    <input type="file" className={`${Style.up} col-2 mt-md-2 mt-lg-2`} />
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`${Style.lastSection} row mt-3`}>
                                <h4 className={`col-12 col-md-3 col-lg-3 mt-2 mt-md-2 mt-lg-2`}>Días Laborales</h4>
                                <div className={`${Style.days} col-11`} >
                                    <section>
                                        <label>Lunes</label>                               
                                        <input type='checkbox' />
                                    </section>
                                    <section>
                                        <label>Martes</label>                                    
                                        <input type='checkbox' />
                                    </section>
                                    <section>
                                        <label>Miércoles</label>
                                        <input type='checkbox' />
                                    </section>
                                    <section>
                                        <label>Jueves</label>
                                        <input type='checkbox' />
                                    </section>
                                    <section>
                                        <label>Viernes</label>
                                        <input type='checkbox' />
                                    </section>
                                    <section>
                                        <label>Sábado</label>
                                        <input type='checkbox' />
                                    </section>
                                    <section>
                                        <label>Domingo</label>
                                        <input type='checkbox' />
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.containerSave}>
                        <h5 className={`${Style.habilitar}`}>Complete el formulario para habilitar el botón...</h5>
                        <div className={`${Style.buttons} row`}>
                            <div className={`col-3`}>
                                <button className={`${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button>
                            </div>
                            <div className={`col-3`}>
                                <button className={`${Style.save} notActive`} onClick={(e)=>save(e)}>Guardar</button>
                            </div>
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