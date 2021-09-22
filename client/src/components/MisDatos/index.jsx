import { Link } from 'react-router-dom';
import Style from './MisDatos.module.css';
import Table from 'react-bootstrap/Table';
import { TiEdit, TiDeleteOutline } from 'react-icons/ti';
import { FiUsers } from 'react-icons/fi';
import { conductores } from './data';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiFillCar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialGetConductores, filterConductores } from '../../globalState/Actions';
import { FcSearch } from 'react-icons/fc';

export default function MisDatos() {

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

    useEffect( () => {
        dispatch(initialGetConductores(conductores));
    }, [conductores])

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
    

    return(
        <div>
            <div className={`${Style.containerVehiculos} row containerVehiculos`}>
                <div className={`${Style.fondo} row m-0`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                        <h3>Mis Datos</h3>
                    </div>                   
                    
                    <div>        
                        <div className={`${Style.menu} col-12 mt-4`}>
                            <div className={`row justify-content-between`}>
                                <button className={`${Style.add} col-2`}><Link to="/back_office/mis_datos/editar"><IoMdAddCircleOutline className={`${Style.iconAdd}`}/>Editar</Link></button>
                                
                            </div>
                        </div>
                    </div>

                    <div className={`${Style.misDatos} mt-4`}>
                        <section>
                            <label>Mail:</label>
                            <label>Clave:</label>
                            <label>Nombre:</label>
                            <label>Dirección:</label>
                            <label>Fecha de Nacimiento:</label>
                            <label>Celular1:</label>
                            <label>Celular2:</label>
                        </section>
                        <section>
                            <label className={`${Style.datos}`}>pablo@gmail.com</label>
                            <label className={`${Style.datos}`}>***************</label>
                            <label className={`${Style.datos}`}>Pablo Mendez</label>
                            <label className={`${Style.datos}`}>Av.San Martin 123</label>
                            <label className={`${Style.datos}`}>10/05/1982</label>
                            <label className={`${Style.datos}`}>+54351756453</label>
                            <label className={`${Style.datos}`}>-</label>
                        </section>                        
                    </div>


                    
                </div>
            </div>            
        </div>
    )
}