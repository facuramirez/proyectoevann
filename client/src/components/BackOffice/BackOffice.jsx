import Style from './BackOffice.module.css';
import { Link } from 'react-router-dom';
import Vehiculos from '../Vehiculos/Vehiculos';

export default function BackOffice() {
    return(
        <div>
            <div className={`${Style.containerBackOffice} row m-0`}>
                <section className={`${Style.menuBar} col-lg-3`}>
                <div className={`row`}>
                        <div className={`${Style.welcome} col-12 align-self-center`}>
                            <h3>Bienvenido Facundo!</h3>
                        </div>
                        <div className={Style.menuOptions}>
                            <div className={`${Style.options} col-12`}>
                                Mis Datos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Choferes
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Vehículos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Viajes
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Facturación y Pagos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Reclamos
                            </div>
                            <div className={`${Style.options} col-12`}>
                                Alertas
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`${Style.details} col-lg-9`}>
                    <div className={`row`}>
                        <div className={`${Style.close} col-12`}>
                            <Link to="/">Cerrar Sesión</Link>
                        </div>
                        <div className={`${Style.pageOffice} col-12`}>
                            <div className={`row`}>
                                <Vehiculos />
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}