import { Link } from 'react-router-dom';
import Style from './ConductoresDetailAdm.module.css';
import Table from 'react-bootstrap/Table';
import { TiEdit, TiDeleteOutline } from 'react-icons/ti';
import { FiUsers } from 'react-icons/fi';
import { roles } from './data';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiFillCar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialGetConductores, filterConductores } from '../../globalState/Actions';
import { FcSearch } from 'react-icons/fc';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

export default function ConductoresDetailAdm() {

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
    drivers = roles.slice(indexOfFirstRegister, indexOfLastRegister);

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(roles.length / registerPerPage) ; i++) {
        pageNumbers.push(i);
    }

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber)
    }

    // =====================================

    useEffect( () => {
        dispatch(initialGetConductores(roles));
    }, [roles])

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
        
        drivers = roles.slice(0, selectValue);
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
    

    // =============================================================
    
    const save = async (e) => {
        e.preventDefault();        
            await swal({
                title: 'Roles asignados con éxito!',
                text: ' ',
                icon: 'success',
                timer: 2000,
                buttons: ['']
            })      
    }

    const back = (e) => {
        e.preventDefault();
        history.push('/back_office_administracion/usuarios');
        window.scrollTo(0, 0);
    }

    return(
        <div>
            <div className={`${Style.containerVehiculos} row containerVehiculos`}>
                <div className={`${Style.fondo} row m-0`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                        <h3>Asignación de roles</h3>
                        <p>Usuario: "XXXXX"</p>
                    </div>
                    {drivers.length > 0 ?
                    <div>
                    
                    {/* <div className={`${Style.select} col-12`}>
                        <div className={`${Style.buttonsTwo} row justify-content-center mt-4 mb-3`}>                            
                            <h6 className={`${Style.registers} col-3 pt-1 m-0 text-start`}>Registros por página</h6>
                            <select className={`dropBox col-1`} onChange={(e)=>dropBox(e)}>
                                <option value="5" defaultValue onChange={(e)=>dropBox(e)}>5</option>
                                <option value="10" onChange={(e)=>dropBox(e)}>10</option>
                                <option value="20" onChange={(e)=>dropBox(e)}>20</option>
                            </select>
                            <div className={`${Style.selectAll} col-4`}>
                                <label >Seleccionar todos</label>
                                <input type="checkbox" id="checkAll" onClick={(e)=>selectAll(e)}/>
                            </div>
                            <input autoFocus className={`${Style.search} col-2`} type="text" placeholder="Buscar..."/>
                            <FcSearch className={`${Style.searchIcon} col-1`}/>                            
                        </div>
                    </div> */}
                    
                    <div className={`${Style.table} col-12 mt-5`}>     
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Rol</th>
                                    <th>Asignación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers.map( (element, index) =>
                                <tr key={index}>
                                    <td>{element.id}</td>
                                    <td>{element.rol}</td>
                                    <td className={`${Style.buttons} d-flex justify-content-evenly`}>
                                        <input className={`${Style.checkboxs}`} type="checkbox" id="checkUnit" />
                                        {/* 
                                        
                                        defaultChecked={element['asignacion'] ? true:false}

                                        <a href="" onClick={(e)=>editCar(e, element.id)}><TiEdit className={Style.edit}/></a>
                                        <a href="" onClick={(e)=>deleteCar(e, element.id)}><TiDeleteOutline className={Style.delete}/></a> */}
                                        {/* <a href="" onClick={(e)=>detailCar(e, element.id)}><FiUsers className={Style.details}/></a> */}
                                    </td>
                                </tr>
                                )                                
                                }
                            </tbody>
                        </Table>
                       
                    </div>
                    <div className={`${Style.buttons} col-12 mt-3`}>
                        
                        <button className={`col-3 ${Style.back}`} onClick={(e)=>back(e)}><FaArrowAltCircleLeft className={Style.iconBack} />Volver</button>
                        <button className={`col-3 mx-auto ${Style.save} notActive`} onClick={(e)=>save(e)}>Guardar</button>
                        
                        {/* <ul className={`${Style.ulPagination}`}>
                            {pageNumbers.map(number => (
                                <li key={number} className={`${Style.liElements}`} onClick={ (e) => paginate(e, number)}>
                                    <a href="">{number}</a>
                                </li>
                            ))}
                        </ul> */}

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