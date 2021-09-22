import Style from './NewCarForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { VscSave } from 'react-icons/vsc';
import { AiOutlineClear } from 'react-icons/ai';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';



export default function NewCarForm(){
    let history = useHistory();

    let [form, setForm] = useState({
        patente: '',
        marca: '',
        modelo: '',
        tipoVeh: '',
        observaciones: ''
    });

    let [error, setError] = useState({
        patente: 'Error',
        marca: 'Error',
        modelo: 'Error',
        tipoVeh: 'Error',
        observaciones: 'Error'
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
            patente: '',
            marca: '',
            modelo: '',
            tipoVeh: '',
            observaciones: ''
        })

        setError({
            patente: 'Error',
            marca: 'Error',
            modelo: 'Error',
            tipoVeh: 'Error',
            observaciones: 'Error'
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
        if(form.patente && form.marca && form.modelo && form.tipoVeh && !error.patente && !error.marca && !error.modelo && !error.tipoVeh){
            await swal({
                title: 'Operación exitosa!',
                text: 'El vehículo fue creado correctamente',
                icon: 'success',
                buttons: [''],
                timer: 2000
              })
            history.push('/back_office');
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
                        <h3>Nuevo Vehículo</h3>
                    </div>
                    <div className={`${Style.formCar} col-12 mt-4`}>
                        <section className={`row justify-content-center m-auto`}>
                            <div className={`col-12`}>
                                <div className={`row`}>
                                    <label className={`${Style.asterisk} col-8`}>(los campos con (*) son obligatorios)</label>
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-4 text-center`}>Patente (*)</label>
                                    <input className={`inpPatente col-7`} type="text" autoFocus onChange={(e)=>inputs(e)} value={form.patente} name="patente"/>
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-3 text-center`}>Marca (*)</label>
                                    <input className={`col-8 inpMarca`} type="text" onChange={(e)=>inputs(e)} value={form.marca} name="marca"/>
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-4 text-center`}>Modelo (*)</label>
                                    <input className={`col-7 inpModelo`} type="text" onChange={(e)=>inputs(e)} value={form.modelo} name="modelo"/>
                                    {/* {!form.modelo && error.modelo && document.querySelector('.inpModelo') ? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-5`}>Tipo Vehículo (*)</label>
                                    <input className={`col-6 inpTipoVeh`} type="text" onChange={(e)=>inputs(e)} value={form.tipoVeh} name="tipoVeh"/>
                                    {/* {!form.tipoVeh && error.tipoVeh && document.querySelector('.inpTipoVeh')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-7`}>Capacidad Pasajeros(*)</label>
                                    <input className={`col-4 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-7 text-center`}>Capacidad Equipaje(*)</label>
                                    <input className={`col-4 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-4 text-center`}>Año (*)</label>
                                    <input className={`col-7 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-6 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-4 text-center`}>Kilometraje (*)</label>
                                    <input className={`col-7 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-4 text-center`}>Última revisión técnica (*)</label>
                                    <input className={`col-7 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/>
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-4 text-center`}>Líneas de negocio (*)</label>
                                    <div className={`${Style.radioButtons} row col-7`}>
                                        <div className={`${Style.lines} col-4 text-center`}>
                                            <input className={`text-center mt-1`} type="radio" name="options" value="Empresa" />
                                            <label className={`${Style.labelRadio}`}>Empresa</label>
                                        </div>
                                        <div className={`${Style.lines} col-4 text-center`}>
                                            <input className={`text-center mt-1`} type="radio" name="options" value="Familiar" />
                                            <label className={`${Style.labelRadio}`}>Familiar</label>
                                        </div>
                                        <div className={`${Style.lines} col-4 text-center`}>
                                            <input className={`text-center mt-1`} type="radio" name="options" value="Eventos" />
                                            <label className={`${Style.labelRadio}`}>Eventos</label>
                                        </div>
                                    </div>
                                    {/* <input className={`col-7 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/> */}
                                    {/* {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    } */}
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-3 text-center`}>Documentos (*)</label>
                                    <div className={`${Style.docs} col-8`}>
                                        <div className={`${Style.docsDivs}`}>
                                            <label className={`${Style.labelDocs}`}>Permiso de Circulación (*)</label>
                                            <label className={`${Style.labelDocs} mt-2`}>Seguro Responsabilidad Civil (*)</label>
                                            <label className={`${Style.labelDocs} mt-2`}>Permiso de Circulación (*)</label>
                                            
                                        </div>
                                        <div className={`${Style.docsDivs}`}>
                                            <button className={`${Style.upButtons}`}>Subir</button>
                                            <button className={`${Style.upButtons}`}>Subir</button>
                                            <button className={`${Style.upButtons}`}>Subir</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-3 text-center`}>Fotos Vehículo (*)</label>
                                    <div className={`${Style.docs} col-8`}>
                                        <div className={`${Style.docsDivs}`}>
                                            <label className={`${Style.labelDocs}`}>Frente (*)</label>
                                            <label className={`${Style.labelDocs} mt-2`}>Lateral (*)</label>
                                            <label className={`${Style.labelDocs} mt-2`}>Atrás (*)</label>
                                            
                                        </div>
                                        <div className={`${Style.docsDivs}`}>
                                            <button className={`${Style.upButtons}`}>Subir</button>
                                            <button className={`${Style.upButtons}`}>Subir</button>
                                            <button className={`${Style.upButtons}`}>Subir</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </section>
                    </div>
                    <div className={`col-12 mt-4`}>
                        <div className={`${Style.buttons} row justify-content-center`}>
                            <Link to='/back_office/vehiculos' className={`${Style.first} col-3`}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</Link>
                            <a className={`${Style.second} col-3`} href="" onClick={ (e) => save(e) }><VscSave className={`${Style.iconSave}`} />Guardar</a>
                            <a className={`${Style.third} col-3`} href="" onClick={(e)=>clear(e)}><AiOutlineClear className={`${Style.iconClear}`}/>Limpiar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


