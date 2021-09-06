import Style from './NewCarForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { VscSave } from 'react-icons/vsc';
import { AiOutlineClear } from 'react-icons/ai';
import swal from 'sweetalert';

export default function NewCarForm(){
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

    const save = (e) => {
        e.preventDefault();
        if(form.patente && form.marca && form.modelo && form.tipoVeh && form.observaciones && !error.patente && !error.marca && !error.modelo && !error.tipoVeh && !error.obervaciones){
            swal({
                title: 'Operación exitosa!',
                text: 'El vehículo fue creado correctamente',
                icon: 'success'
              })
        } else {
            swal({
                title: 'Error!',
                text: 'El formulario debe estar completo para poder guardarlo',
                icon: 'error'
              })
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
                        <section className={`row`}>
                            <div className={`col-12`}>
                                <div className={`row`}>
                                    <label className={`col-2 text-center`}>Patente</label>
                                    <input className={`inpPatente col-9`} type="text" autoFocus onChange={(e)=>inputs(e)} value={form.patente} name="patente"/>
                                    {!form.patente && error.patente && document.querySelector('.inpPatente') ? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    }
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-2 text-center`}>Marca</label>
                                    <input className={`col-9 inpMarca`} type="text" onChange={(e)=>inputs(e)} value={form.marca} name="marca"/>
                                    {!form.marca && error.marca && document.querySelector('.inpMarca') ? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    }
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-2 text-center`}>Modelo</label>
                                    <input className={`col-9 inpModelo`} type="text" onChange={(e)=>inputs(e)} value={form.modelo} name="modelo"/>
                                    {!form.modelo && error.modelo && document.querySelector('.inpModelo') ? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    }
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-2 text-center`}>Tipo Vehículo</label>
                                    <input className={`col-9 inpTipoVeh`} type="text" onChange={(e)=>inputs(e)} value={form.tipoVeh} name="tipoVeh"/>
                                    {!form.tipoVeh && error.tipoVeh && document.querySelector('.inpTipoVeh')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    }
                                </div>
                            </div>
                            <div className={`col-12 mt-2`}>
                                <div className={`row`}>
                                    <label className={`col-2 text-center`}>Observaciones</label>
                                    <input className={`col-9 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/>
                                    {!form.observaciones && error.observaciones && document.querySelector('.inpObs')? 
                                        <h5 className={`${Style.alerts}`}>Campo obligatorio</h5>
                                        :null
                                    }
                                </div>
                            </div>
                            
                        </section>
                    </div>
                    <div className={`col-12 mt-4`}>
                        <div className={`${Style.buttons} row justify-content-center`}>
                            <Link to='/back_office' className={`${Style.first} col-3`}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</Link>
                            <a className={`${Style.second} col-3`} href="" onClick={ (e) => save(e) }><VscSave className={`${Style.iconSave}`} />Guardar</a>
                            <a className={`${Style.third} col-3`} href="" onClick={(e)=>clear(e)}><AiOutlineClear className={`${Style.iconClear}`}/>Limpiar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}


