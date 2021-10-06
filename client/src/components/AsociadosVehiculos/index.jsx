import { Link } from 'react-router-dom';
import Style from './AsociadosVehiculos.module.css';
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

export default function VehiculosAsociados({alto}) {
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
        
        cars = autos.slice(0, selectValue);
        setRegisterPerPage(selectValue);
        setCurrentPage(1);
        dispatch(filterCars(cars));
    }
    

    return(
        <div>
            <div className={`${Style.containerVehiculos} row containerVehiculos`}>
                <div className={`${Style.fondo} row m-0 flex-column`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                            <h3>Vehículos</h3>
                        </div>
                        
                        {/* <button className={`${Style.add} col-2 mt-1`}><Link to="/back_office/vehiculos/nuevo_auto"><IoMdAddCircleOutline className={`${Style.iconAdd}`}/>Nuevo</Link></button> */}
                        
                        {cars.length > 0 ?
                        <div className="col-12">                        
                            <div className={`${Style.select} row mt-4 mb-3 justify-content-between`}>
                                <section className="col-12 col-md-5 col-lg-5 mt-1">
                                    <div className="row">                      
                                        <h6 className={`${Style.registers} col-7 col-md-3 col-lg-3 pt-1 m-0 text-start`}>Registros por página</h6>
                                        <select className={`dropBox col-2 col-md-3 col-lg-3`} onChange={(e)=>dropBox(e)}>
                                            <option value="5" defaultValue onChange={(e)=>dropBox(e)}>5</option>
                                            <option value="10" onChange={(e)=>dropBox(e)}>10</option>
                                            <option value="20" onChange={(e)=>dropBox(e)}>20</option>
                                        </select>
                                    </div>
                                </section>
                                <section className={`${Style.divButtons} col-12 col-md-7 col-lg-7 `}>   
                                    <div className={`${Style.buttonsTwo} row justify-content-start justify-content-md-center justify-content-lg-end`}>
                                        <input autoFocus className={`${Style.search} col-md-2 col-lg-2`} type="text" placeholder="Buscar..."/>
                                        <FcSearch className={`${Style.searchIcon} col-md-1 col-lg-1`}/>
                                        <button className={`${Style.inactives} col-md-2 col-lg-2`}>Ver inactivos</button>
                                    </div>                                
                                </section>
                            </div>
                    
                    <div className={`${Style.table} col-12`}>     
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Patente</th>
                                    {/* <th>Marca</th> */}
                                    <th>Modelo</th>
                                    {/* <th>Tipo vehículo</th>
                                    <th>Observaciones</th> */}
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map( (element, index) =>
                               
                                <tr key={index}>
                                    <td>{element.id}</td>
                                    <td>{element.patente}</td>
                                    {/* <td>{element.marca}</td> */}
                                    <td>{element.modelo}</td>
                                    {/* <td>{element.tipo_veh}</td> */}
                                    {/* <td>{element.observaciones}</td> */}
                                    <td className={`${Style.buttons} d-flex justify-content-evenly`}>
                                        {/* <a href="" onClick={(e)=>editCar(e, element.id)}><TiEdit className={Style.edit}/></a>
                                        <a href="" onClick={(e)=>deleteCar(e, element.id)}><TiDeleteOutline className={Style.delete}/></a> */}
                                        <Link to="/back_office/vehiculos/detalles"><ImEye className={Style.details}/></Link>
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