import Style from './NavBar.module.css';
import evann from '../../img/evannImage.png';
import { Link } from 'react-router-dom';

export default function NavBar() {

    let url = window.location.href.includes('asociados');

    return(
        <div>
            <nav className={`${Style.navBar} navbar navbar-expand-lg navbar-light bg-light`}>
                <div className="container-fluid">
                    <Link to="/" className={Style.linkImg}>
                        <img src={evann} className={`${Style.imageEvann}`} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${Style.options} collapse navbar-collapse`} id="navbarSupportedContent">
                        {!url ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">                                                        
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Servicios</a>
                                </li>                            
                                <li className="nav-item">
                                    <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Contacto</a>
                                </li>
                                <Link to="/asociados" className={`${Style.link} nav-link`}>
                                    <li className="nav-item">
                                        Asociados
                                    </li>
                                </Link>                            
                            </ul>
                            :
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                                <Link to="/iniciarSesion" className={`${Style.linkLogin} nav-link`}>
                                    <li className="nav-item">
                                        Iniciar Sesión
                                    </li>
                                </Link>                            
                            </ul>                        
                        }
                    </div>
                    
                    </div>
                    
            </nav>
        </div>
    )
}