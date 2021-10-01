import { Link } from 'react-router-dom';
import Style from './Asociados.module.css';
import Table from 'react-bootstrap/Table';
import { TiEdit, TiDeleteOutline } from 'react-icons/ti';
import { FiUsers } from 'react-icons/fi';
import { autos } from './data';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiFillCar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialGetCars, filterCars } from '../../globalState/Actions';
import { FcSearch } from 'react-icons/fc';
import { ImEye } from 'react-icons/im';
import { FaRoute } from 'react-icons/fa';


export default function Vehiculos({alto}) {
    const dispatch = useDispatch();
    let cars = useSelector( state => state['cars']);

    // ============== PAGINADO =============
    let [currentPage, setCurrentPage] = useState(1);
    let [registerPerPage, setRegisterPerPage] = useState(5);

    let indexOfLastRegister = currentPage * registerPerPage;
    let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
    cars = autos.slice(indexOfFirstRegister, indexOfLastRegister);

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(autos.length / registerPerPage) ; i++) {
        pageNumbers.push(i);
    }

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber)
    }

    // =====================================

    useEffect( () => {
        dispatch(initialGetCars(autos));
    }, [autos])

    const editCar = (e, id) => {
        e.preventDefault();
       alert('Editando Car ' + id);
    }

    const deleteCar = (e, id) => {
        e.preventDefault();
        alert('Eliminando Car ' +id);
    }

    const detailAsoc = (e, id) => {
        e.preventDefault();
        alert('Detalles Asociado ' +id);
    }

    const detailCar = (e, id) => {
        e.preventDefault();
        alert('Detalles Car ' +id);
    }

    const detailConductores = (e, id) => {
        e.preventDefault();
        alert('Detalles Conductores ' +id);
    }

    const detailTravel = (e, id) => {
        e.preventDefault();
        alert('Detalles Viaje ' +id);
    }
    
    const dropBox = (e) => {
        e.preventDefault();

        let selectValue = parseInt(e.target.value);
        
        cars = autos.slice(0, selectValue);
        setRegisterPerPage(selectValue);
        setCurrentPage(1);
        dispatch(filterCars(cars));
    }
    

    return(
        <div>
            <div className={`${Style.containerVehiculos} row containerVehiculos`}>
                <div className={`${Style.fondo} row m-0`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                        <h3>Asociados</h3>
                    </div>
                    {cars.length > 0 ?
                    <div>        
                    <div className={`${Style.menu} col-12 mt-4`}>
                        <div className={`row justify-content-between`}>
                            <button className={`${Style.add} col-2 invisible`}><Link to="/back_office_administracion/vehiculos/nuevo_auto"><IoMdAddCircleOutline className={`${Style.iconAdd}`}/>Nuevo</Link></button>
                            <div className={`col-6`}>
                                <div className={`${Style.buttonsTwo} row justify-content-end`}>
                                    <input autoFocus className={`${Style.search} col-2`} type="text" placeholder="Buscar..."/>
                                    <FcSearch className={`${Style.searchIcon} col-1`}/>
                                    <button className={`${Style.inactives} col-2`}>Ver inactivos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${Style.select} col-12`}>
                        <div className={`row mt-4 mb-3`}>                          
                            <h6 className={`${Style.registers} col-3 pt-1 m-0 text-start`}>Registros por página</h6>
                            <select className={`dropBox col-1`} onChange={(e)=>dropBox(e)}>
                                <option value="5" defaultValue onChange={(e)=>dropBox(e)}>5</option>
                                <option value="10" onChange={(e)=>dropBox(e)}>10</option>
                                <option value="20" onChange={(e)=>dropBox(e)}>20</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className={`${Style.table} col-12`}>     
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Mail</th>
                                    <th>Nombre</th>
                                    <th>Direccion</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map( (element, index) =>
                               
                                <tr key={index}>
                                    <td>{element.id}</td>
                                    <td>{element.mail}</td>
                                    <td>{element.nombre}</td>
                                    <td>{element.direccion}</td>
                                    <td>{element.fechaNac}</td>
                                    <td className={`${Style.buttons} d-flex justify-content-evenly`}>
                                        <a href="" onClick={(e)=>editCar(e, element.id)}><TiEdit className={Style.edit}/></a>
                                        <a href="" onClick={(e)=>deleteCar(e, element.id)}><TiDeleteOutline className={Style.delete}/></a>
                                        <a href="" onClick={(e)=>detailAsoc(e, element.id)}><ImEye className={Style.details}/></a>

                                        <a href="" onClick={(e)=>detailCar(e, element.id)}><AiFillCar className={Style.car}/></a>
                                        <Link to="/back_office/vehiculos/detalles"><FiUsers className={Style.conductores}/></Link>
                                        <a href="" onClick={(e)=>detailTravel(e, element.id)}><FaRoute className={Style.viajes}/></a>
                                    </td>
                                </tr>
                                )
                                
                                }
                            </tbody>
                        </Table>

                        {/* <table className={`${Style.table} table table-bordered mt-3`}>                                
                                <thead className={`${Style.tableHead}`}>                                
                                    <tr>
                                        <th>PATENTE</th>
                                        <th>MARCA</th>
                                        <th>MODELO</th>
                                        <th>TIPO VEHÍCULO</th>
                                        <th>OBSERVACIONES</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                            
                                <tbody className={`${Style.tableBody}`}>
                                    {
                                    cars.map( (reg, index) => 
                                        <tr key={index}>
                                            <td>{reg.patente}</td>
                                            <td>{reg.marca}</td>
                                            <td>{reg.modelo}</td>
                                            <td>{reg.tipo_veh}</td>
                                            <td>{reg.observaciones}</td>
                                            <td>
                                                <button className={`btn ${Style.button}`}>
                                                    Edit
                                                </button>
                                                <Link to={`/user${reg.id}`}>
                                                <button className={`btn ${Style.button} btn-warning`}>
                                                    View
                                                </button>
                                                </Link>

                                                <Link>
                                                    <button className={`btn ${Style.button} btn-danger`}>Delete</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )}                                    
                                </tbody>
                            </table> */}
                    </div>
                    <div className={`${Style.pagination} col-12`}>
                        <ul className={`${Style.ulPagination}`}>
                            {pageNumbers.map(number => (
                                <li key={number} className={`${Style.liElements}`} onClick={ (e) => paginate(e, number)}>
                                    <a href="">{number}</a>
                                </li>
                            ))}
                        </ul>
                    </div> 
                    </div>:<div>
                        <br/>   
                        <h1 className={`${Style.noCars} mt-4`}>No hay autos para mostrar</h1>
                        </div>}
                </div>
            </div>            
        </div>
    )
}