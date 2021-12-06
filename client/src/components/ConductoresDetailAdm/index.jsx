import { Link } from 'react-router-dom';
import Style from './ConductoresDetailAdm.module.css';
import Table from 'react-bootstrap/Table';
import { TiEdit, TiDeleteOutline } from 'react-icons/ti';
import { FiUsers } from 'react-icons/fi';
import { conductores, detalle } from './data';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiFillCar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialGetConductores, filterConductores } from '../../globalState/Actions';
import { FcSearch } from 'react-icons/fc';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

export default function ConductoresDetailAdm() {
    let history = useHistory();
    const dispatch = useDispatch();
    let drivers = useSelector( state => state['drivers']);

    // ============== PAGINADO =============
    let [currentPage, setCurrentPage] = useState(1);
    let [registerPerPage, setRegisterPerPage] = useState(5);

    let indexOfLastRegister = currentPage * registerPerPage;
    let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
    drivers = conductores.slice(indexOfFirstRegister, indexOfLastRegister);

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(conductores.length / registerPerPage) ; i++) {
        pageNumbers.push(i);
    }

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber)
    }

    // =====================================

    // useEffect( () => {
    //     dispatch(initialGetConductores(conductores));
    // }, [conductores])

    const editCar = (e, id) => {
        e.preventDefault();
       alert('Editando car ' + id);
    }

    const deleteCar = (e, id) => {
        e.preventDefault();
        alert('Eliminando car ' +id);
    }

    const detailCar = (e, id) => {
        e.preventDefault();
        alert('Detalles car ' +id);
    }

    const dropBox = (e) => {
        e.preventDefault();

        let selectValue = parseInt(e.target.value);
        
        drivers = conductores.slice(0, selectValue);
        setRegisterPerPage(selectValue);
        setCurrentPage(1);
        dispatch(filterConductores(drivers));
    }
    
    const approve = (e) => {
        e.preventDefault();
        alert('Auto aprobado!');
    }

    const back = (e) => {
        e.preventDefault();
        history.push('/back_office_administracion/pendientes_aprobacion/conductores');
        window.scrollTo(0, 0);
    }

    return(
        <div>
            <div className={`${Style.containerRoles} row containerVehiculos`}>
                <div className={`${Style.fondo} row m-0`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                        <h3>Asociado "XXX" - Conductor "XXX" </h3>
                    </div>                   
                    
                    <div>        
                        <div className={`${Style.menu} col-12 mt-4`}>
                            <div className={`${Style.buttonsDetalle} row`}>
                                {/* <button className={`${Style.add} col-2`}><Link to="/back_office/mis_datos/editar"><IoMdAddCircleOutline className={`${Style.iconAdd}`}/>Editar</Link></button> */}
                                <div className={`${Style.divBack}`}>
                                    <button className={`${Style.back} col-3`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />
                                        Volver
                                    </button>
                                </div>
                                <div className={`${Style.divApprove}`}>
                                    <button type="button" onClick={(e)=> approve(e)} 
                                        className={`${Style.approve} btn btn-success`}>
                                        APROBAR
                                    </button>
                                </div>    
                            </div>
                        </div>
                    </div>

                    <div className={`${Style.misDatos} mt-4 mb-4 mb-sm-0 mb-md-0 mb-lg-0`}>                            
                        <label className={`${Style.lbl}`}>Nombre</label>
                        <label className={`${Style.datos}`}>{detalle.nombre}</label>
                    
                        <label className={`${Style.lbl}`}>Dirección</label>
                        <label className={`${Style.datos}`}>{detalle.direccion}</label>
                    
                        <label className={`${Style.lbl}`}>Nacionalidad</label>
                        <label className={`${Style.datos}`}>{detalle.nacionalidad}</label>
                    
                        <label className={`${Style.lbl}`}>Fecha de Nacimiento</label>
                        <label className={`${Style.datos}`}>{detalle.fechaNac}</label>
                    
                        <label className={`${Style.lbl}`}>Email</label>
                        <label className={`${Style.datos}`}>{detalle.mail}</label>
                    
                        <label className={`${Style.lbl}`}>Celular</label>
                        <label className={`${Style.datos}`}>{detalle.cel}</label>
                    
                        <label className={`${Style.lbl}`}>Foto</label>
                        <label className={`${Style.datos}`}>{detalle.foto}</label>

                        <label className={`${Style.lbl}`}>Carne</label>
                        <label className={`${Style.datos}`}>{detalle.carne}</label>

                        <label className={`${Style.lbl}`}>Licencia</label>
                        <label className={`${Style.datos}`}>{detalle.licencia}</label>
                    </div>
                </div>
            </div>            
        </div>
    )
}