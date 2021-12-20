import { Link } from "react-router-dom";
import Style from "./MisDatosAdm.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { conductores } from "./data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initialGetConductores,
  filterConductores,
} from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import axios from "../../axiosConfig";
import { dataUser } from "../../globalState/Actions";

export default function MisDatosAdm() {
  let user = useSelector((state) => state["user"]);

  const dispatch = useDispatch();
  let drivers = useSelector((state) => state["drivers"]);

  // useEffect( () => {
  //     axios.get(`${process.env.REACT_APP_BACKEND}/users/info`)
  //     .then(response => {
  //         console.log(response.data, 'MIS DATOS ADM INFO USER');
  //     })
  //     .catch(error => {
  //         console.log(error);
  //     })
  // }, [])

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  drivers = conductores.slice(indexOfFirstRegister, indexOfLastRegister);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(conductores.length / registerPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // =====================================

  // useEffect( () => {
  //     dispatch(initialGetConductores(conductores));
  // }, [conductores])

  const editCar = (e, id) => {
    e.preventDefault();
    alert("Editando car " + id);
  };

  const deleteCar = (e, id) => {
    e.preventDefault();
    alert("Eliminando car " + id);
  };

  const detailCar = (e, id) => {
    e.preventDefault();
    alert("Detalles car " + id);
  };

  const dropBox = (e) => {
    e.preventDefault();

    let selectValue = parseInt(e.target.value);

    drivers = conductores.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterConductores(drivers));
  };

  return (
    <div>
      <div className={`${Style.containerMisDatosAdm} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Mis Datos</h3>
          </div>

          <div>
            <div className={`${Style.menu} col-12 mt-4`}>
              <div className={`row justify-content-between`}>
                <button className={`${Style.add} col-2`}>
                  <Link to="/back_office_administracion/mis_datos/editar">
                    <IoMdAddCircleOutline className={`${Style.iconAdd}`} />
                    Editar
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${Style.misDatos} mt-4 mb-4 mb-sm-0 mb-md-0 mb-lg-0`}
          >
            {/* <label className={`${Style.lbl}`}>Apellido:</label>
                        <label className={`${Style.datos}`}>Gonzalez</label>
                    
                        <label className={`${Style.lbl}`}>Nombre:</label>
                        <label className={`${Style.datos}`}>Pablo</label>
                    
                        <label className={`${Style.lbl}`}>Rut:</label>
                        <label className={`${Style.datos}`}>7647897</label>
                    
                        <label className={`${Style.lbl}`}>Fecha de Nacimiento:</label>
                        <label className={`${Style.datos}`}>1980-07-12</label>

                        <label className={`${Style.lbl}`}>Dirección:</label>
                        <label className={`${Style.datos}`}>Av.San Martin 487</label>
                    
                        <label className={`${Style.lbl}`}>Celular1:</label>
                        <label className={`${Style.datos}`}>984968375</label>
                    
                        <label className={`${Style.lbl}`}>Celular2:</label>
                        <label className={`${Style.datos}`}>987573244</label> */}

            <label className={`${Style.lbl}`}>Apellido:</label>
            <label className={`${Style.datos}`}>{user.last_name}</label>

            <label className={`${Style.lbl}`}>Nombre:</label>
            <label className={`${Style.datos}`}>{user.name}</label>

            <label className={`${Style.lbl}`}>Rut:</label>
            <label className={`${Style.datos}`}>{user.rut}</label>

            <label className={`${Style.lbl}`}>Fecha de Nacimiento:</label>
            <label className={`${Style.datos}`}>{user.birth_date}</label>

            <label className={`${Style.lbl}`}>Dirección:</label>
            <label className={`${Style.datos}`}>{user.address}</label>

            <label className={`${Style.lbl}`}>Celular1:</label>
            <label className={`${Style.datos}`}>{user.phone_number}</label>

            <label className={`${Style.lbl}`}>Celular2:</label>
            <label className={`${Style.datos}`}>
              {user.phone_number2 ? user.phone_number2 : "-"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
