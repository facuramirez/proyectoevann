import { Link } from 'react-router-dom';
import Style from './ConductoresDetail.module.css';
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
import { useHistory } from 'react-router-dom';

export default function ConductoresDetail() {

    let history = useHistory();

    useEffect( () => {

    },[])

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
    
    // ================ SELECT ALL ===============================
    const [todos, setTodos] = useState(false);
    let checkUnit = document.querySelectorAll('#checkUnit');

    const selectAll = (e) => {
        let checkAll = document.getElementById('checkAll');
        let checkUnit = document.querySelectorAll('#checkUnit');
        // let checkAll = e.target.checked;
        
        if(checkAll.checked){
            // setTodos(true);
            checkUnit.forEach((element)=>{
                element.checked = true;
            })            
        } else {
            checkUnit.forEach((element)=>{
                element.checked = false;
            })            
        }
    }
    
    
    
    useEffect( () => {
        
    },[drivers])
    
    
    if(checkUnit){
        if(todos) {
            drivers = drivers.map((element) => {
                return {...element, asignacion:true}
            })
            drivers.forEach((element)=>{
                return (element['asignacion'].checked, 'EACH CHECKED');
            })
            
        } else {
            drivers = drivers.map((element) => {
                return {...element, asignacion:false}
            })
            drivers.forEach((element)=>{
                return (element['asignacion'].checked === false, 'EACH NO CHECKED');
            })    
        }
    }
    
    const back = (e) => {
        e.preventDefault();
        history.push('/back_office_administracion/usuarios');
    }

    // =============================================================    

    return(
        <div>
            <div className={`${Style.containerDetail} row containerVehiculos`}>
                <div className={`${Style.fondo} row m-0`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                        <h3>Asignación de Roles</h3>
                        <p>Usuario: "XXXXX"</p>
                    </div>
                    {drivers.length > 0 ?
                    <div>
                    
                    <div className={`${Style.select} col-12 col-md-12 col-lg-12`}>
                        <div className={`${Style.buttonsTwo} row mt-4`}>        
                            <div className={`col-12 col-md-7 col-lg-7 text-end`}>
                                <div className={`${Style.divRegisters} row`}>
                                    <label className={`${Style.registers} col-7 col-md-6 col-lg-6 pt-1 m-0`}>Registros por página</label>
                                    <div className={`${Style.divSelect} col-3 col-md-4 col-lg-4 text-start`}>                                    
                                        <select className={`dropBox`} onChange={(e)=>dropBox(e)}>
                                            <option value="5" defaultValue onChange={(e)=>dropBox(e)}>5</option>
                                            <option value="10" onChange={(e)=>dropBox(e)}>10</option>
                                            <option value="20" onChange={(e)=>dropBox(e)}>20</option>
                                        </select>
                                    </div>
                                    <label className={`${Style.selectLbl} col-7 col-md-6 col-lg-6 mt-1`}>Seleccionar todos</label>
                                    <input className={`${Style.selectInp} col-3 col-md-4 col-lg-4 mt-1`} type="checkbox" id="checkAll" onClick={(e)=>selectAll(e)}/>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-5">
                                <input autoFocus className={`${Style.search} col-3 col-md-2 col-lg-4 mt-3 mt-md-0 mt-lg-0`} type="text" placeholder="Buscar..."/>
                                <FcSearch className={`${Style.searchIcon} col-2 col-md-1 col-lg-1 mt-3 mt-md-0 mt-lg-0`}/>
                                <button className={`${Style.back} col-3 col-md-12 col-lg-12 mt-2 mt-sm-1 mt-md-1 mt-lg-1`} onClick={(e)=>back(e)}>Volver</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`${Style.table} col-12 mt-3`}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Roles</th>
                                    <th>Asignación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers.map( (element, index) =>
                                <tr key={index}>
                                    <td>{element.id}</td>
                                    <td>{element.conductor}</td>
                                    <td className={`${Style.buttons} d-flex justify-content-evenly`}>
                                        <input className={`${Style.checkboxs}`} type="checkbox" id="checkUnit" />
                
                                    </td>
                                </tr>
                                )                                
                                }
                            </tbody>
                        </Table>

                        
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