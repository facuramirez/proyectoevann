import Style from './NewConductorForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { VscSave } from 'react-icons/vsc';
import { AiOutlineClear } from 'react-icons/ai';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Fade } from 'react-reveal/Fade';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



export default function NewCarForm(){
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
            history.push('/back_office/conductores');
        } else {
            await swal({
                title: 'Advertencia!',
                text: 'Por favor complete los campos obligatorios antes de guardar',
                icon: 'warning'
              })
            document.querySelector('.inpPatente').focus();            
        }
    }


    return(
        <div>            
            <div className={`${Style.containerVehiculos} containerVehiculos`}>
                <div className={`${Style.fondo} row m-0`}>
                    <div className={`${Style.title} col-12 mt-4`}>
                        <h3>Nuevo Conductor</h3>
                    </div>
                    <div className={`${Style.formCar} col-12 mt-4`}>
                        <section className={`row`}>
                            <div className={`col-12`}>
                                <div className={`row`}>
                                    <label className={`${Style.asterisk} col-8`}>(los campos con (*) son obligatorios)</label>
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <div className={`row`}>
                                    <label className={`col-5 text-center`}>Nombre (*)</label>
                                    <input className={`col-6 inpPatente`} type="text" autoFocus onChange={(e)=>inputs(e)} value={form.nombre} name="nombre"/>
                                    {/* {!form.patente && error.patente && document.querySelector('.inpPatente') ? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <div className={`row`}>
                                    <label className={`col-5 text-center`}>Dirección (*)</label>
                                    <input className={`col-5 inpMarca`} type="text" onChange={(e)=>inputs(e)} value={form.direccion} name="direccion"/>
                                    {/* {!form.marca && error.marca && document.querySelector('.inpMarca') ? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-sm-5 col-md-4 col-lg-3 text-center`}>Nacionalidad (*)</label>
                                    <input className={`col-sm-6 col-md-7 col-lg-8 inpModelo`} type="text" onChange={(e)=>inputs(e)} value={form.nacionalidad} name="nacionalidad"/>
                                    {/* {!form.modelo && error.modelo && document.querySelector('.inpModelo') ? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-sm-6 col-md-5 col-lg-4 text-left`}>Fecha de Nacimiento (*)</label>
                                    <form className={`${classes.container} ${Style.inputFecha} col-7`} noValidate>
                                    <TextField
                                        id="date"
                                        label=""
                                        type="date"
                                        name="fechaNac"
                                        value={form.fechaNac}
                                        onChange={(e)=> inputs(e)}
                                        // defaultValue="2017-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </form>
                                    {/* <input className={`col-sm-5 col-md-6 col-lg-7 inpTipoVeh`} type="text" onChange={(e)=>inputs(e)} value={form.fechaNac} name="fechaNac"/> */}
                                    {/* {!form.tipoVeh && error.tipoVeh && document.querySelector('.inpTipoVeh')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-5 text-center`}>Email (*)</label>
                                    <input className={`col-6 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.email} name="email"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-5 text-center`}>Celular (*)</label>
                                    <input className={`col-5 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.cel} name="cel"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-3 text-center`}>Foto (*)</label>
                                    <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.foto} name="foto"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-3 text-center`}>Carne (*)</label>
                                    <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.carne} name="carne"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-3 text-center`}>Licencia (*)</label>
                                    <input className={`col-8 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.licencia} name="licencia"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            
                        </section>
                    </div>
                    <div className={`col-12 mt-4`}>
                        <div className={`${Style.buttons} row justify-content-center`}>
                            <Link to='/back_office/conductores' className={`${Style.first} col-3`}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</Link>
                            <a className={`${Style.second} col-3`} href="" onClick={ (e) => save(e) }><VscSave className={`${Style.iconSave}`} />Guardar</a>
                            <a className={`${Style.third} col-3`} href="" onClick={(e)=>clear(e)}><AiOutlineClear className={`${Style.iconClear}`}/>Limpiar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


