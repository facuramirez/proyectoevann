import { Link } from 'react-router-dom';
import Style from './AdmUsuarios.module.css';
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
import { RiLockPasswordLine } from 'react-icons/ri';


export default function Viajes() {

    let [form, setForm] = useState({
        nroViaje: '',
        cliente: '',
        fecha: '',
        distancia: ''
    });

    let [error, setError] = useState({
        nroViaje: 'Error',
        cliente: 'Error',
        fecha: 'Error',
        distancia: 'Error'
    });

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
       alert('Viaje cliente ' + id);
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
    

    return(
        <div>
            <div className={`${Style.containerVehiculos} row containerVehiculos`}>
                <div className={`${Style.fondo} row m-0 flex-column`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                        <h3>Administración de Usuarios</h3>
                    </div>
                    {cars.length > 0 ?
                    <div className="col-12">                        
                        <div className={`${Style.select} row mt-4 mb-3 justify-content-between`}>
                            <section className="col-12 col-sm-12 col-md-5 col-lg-5 mt-2 mt-sm-2 mt-md-4 mt-lg-4">
                                <div className="row">
                                    <h6 className={`${Style.registers} col-6 col-sm-4 col-md-3 col-lg-3 pt-1 m-0 text-start`}>Registros por página</h6>
                                    <select className={`${Style.regPag} dropBox col-3 col-sm-2 col-md-3 col-lg-3`} onChange={(e)=>dropBox(e)}>
                                        <option value="5" defaultValue onChange={(e)=>dropBox(e)}>5</option>
                                        <option value="10" onChange={(e)=>dropBox(e)}>10</option>
                                        <option value="20" onChange={(e)=>dropBox(e)}>20</option>
                                    </select>
                                </div>
                            </section>
                            <section className={`${Style.divButtons} col-12 col-sm-12 col-md-7 col-lg-7 mt-3 mt-sm-3`}>   
                                <div className={`${Style.buttonsTwo} row justify-content-sm-start justify-content-md-center justify-content-lg-end`}>
                                    <input autoFocus className={`${Style.search} col-4 col-sm-4 col-md-2 col-lg-2`} type="text" placeholder="Buscar..."/>
                                    <FcSearch className={`${Style.searchIcon} col-5 col-sm-5 col-md-1 col-lg-1`}/>
                                    <button className={`${Style.inactives} col-5 col-sm-5 col-md-2 col-lg-2 mt-0 mt-sm-0 mt-md-0 mt-lg-0`}>Ver inactivos</button>
                                </div>                                
                            </section>
                        </div>
                    
                    <div className={`${Style.table} col-12`}>     
                        <Table striped bordered hover variant="dark">
                            <thead className={`${Style.tableH}`}>
                                <tr>
                                    <th>#</th>
                                    <th>Nro Viaje</th>
                                    <th className={`${Style.cliente}`}>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Distancia</th>
                                    <th className={`${Style.acciones}`}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className={`${Style.tableB}`}>
                                {cars.map( (element, index) =>
                               
                                <tr key={index}>
                                    <td>{element.id}</td>
                                    <td>{element.nroViaje}</td>
                                    <td>{element.cliente}</td>
                                    <td>{element.fecha}</td>
                                    <td>{element.distancia}</td>
                                    <td className={`${Style.buttons} d-flex justify-content-evenly`}>
                                        <a href="" onClick={(e)=>editCar(e, element.id)}><TiEdit className={Style.edit}/></a>
                                        <a href="" onClick={(e)=>deleteCar(e, element.id)}><TiDeleteOutline className={Style.delete}/></a>
                                        <Link to="/back_office_administracion/usuarios/detalles"><RiLockPasswordLine className={Style.edit}/></Link>
                                        {/* <a href="" onClick={(e)=>deleteCar(e, element.id)}><TiDeleteOutline className={Style.delete}/></a>
                                        <a href="" onClick={(e)=>detailCar(e, element.id)}><FiUsers className={Style.details}/></a> */}
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