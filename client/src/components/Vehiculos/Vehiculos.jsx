import { Link } from 'react-router-dom';
import Style from './Vehiculos.module.css';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';


export default function Vehiculos() {

    useEffect( () => {
        window.scrollTo(0, 0);
    });

    let cars = [{
        patente: 'abc123',
        marca: 'Ford',
        modelo: 'Fiesta',
        tipo_veh: 'Auto',
        observaciones: 'Nuevo'
    }];

    return(
        <div>
            <div className={`${Style.containerVehiculos} row`}>
                <div className={`${Style.fondo} row m-0`}>
                    <div className={`${Style.title} col-12 mt-2`}>
                        <h3>Vehículos</h3>
                    </div>                        
                    <div className={`${Style.menu} col-12 mt-3`}>
                        <div className={`row justify-content-between`}>
                            <button className={`${Style.add} col-2`}>Nuevo</button>
                            <div className={`col-6`}>
                                <div className={`${Style.buttonsTwo} row justify-content-end`}>
                                    <input className={`${Style.search} col-2`} type="text" placeholder="Buscar..."/>
                                    <button className={`${Style.inactives} col-2`}>Ver inactivos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${Style.select} col-12`}>
                        <div className={`row mt-4 mb-3`}>
                            <h6 className={`${Style.registers} col-3 pt-1 m-0 text-start`}>Registros por página</h6>
                            <select className={`col-1`}>
                                <option value="value1" selected>5</option>
                                <option value="value2">10</option>
                                <option value="value3">20</option>
                            </select>
                        </div>
                    </div>
                    <div className={`${Style.table} col-12`}>     
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Patente</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Tipo vehículo</th>
                                    <th>Observaciones</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>ABC123</td>
                                    <td>Ford</td>
                                    <td>Fiesta</td>
                                    <td>Auto</td>
                                    <td>Modelo 2018</td>
                                    <td>botones...</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>AKT561</td>
                                    <td>Chevrolet</td>
                                    <td>Corsa</td>
                                    <td>Auto</td>
                                    <td>Modelo 2016</td>
                                    <td>botones...</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>ABC123</td>
                                    <td>Renault</td>
                                    <td>Megane</td>
                                    <td>Auto</td>
                                    <td>Modelo 2021</td>
                                    <td>botones...</td>
                                </tr>
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
                        Paginado
                    </div> 
                </div>
            </div>            
        </div>
    )
}