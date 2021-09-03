import { Link } from 'react-router-dom';
import Style from './Vehiculos.module.css';
import { useEffect } from 'react';

export default function Vehiculos() {

    useEffect( () => {
        window.scrollTo(0, 0);
    });

    return(
        <div>
            <div className={`${Style.containerVehiculos} row`}>
                <div className={`${Style.title} col-12`}>
                    <h3>Vehículos</h3>
                </div>
                <div className={`col-12`}>
                    <div className={`row justify-content-between`}>
                        <button className={`${Style.add} col-2`}>Nuevo</button>
                        <div className={`col-6`}>
                            <div className={`${Style.buttonsTwo} row justify-content-evenly`}>
                                <input className={`${Style.search} col-2`} type="text" placeholder="Buscar..."/>
                                <button className={`${Style.inactives} col-2`}>Ver inactivos</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-12`}>
                    Mostrar 10 por pagina
                </div>
                <div className={`col-12`}>
                    TABLA
                </div>
                <div className={`col-12`}>
                    Paginado
                </div>
            </div>            
        </div>
    )
}