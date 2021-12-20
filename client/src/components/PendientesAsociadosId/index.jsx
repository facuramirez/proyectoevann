import { Link, useParams, useHistory } from "react-router-dom";
import Style from "./PendientesAsociadosId.module.css";
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
  getDriver,
} from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import axios from "../../axiosConfig";
import { dataUser, getOwner } from "../../globalState/Actions";
import swal from "sweetalert";

export default function PendientesAsociadosId() {
  let history = useHistory();

  let asociado = useSelector((state) => state["owner"]);
  const dispatch = useDispatch();
  const { id } = useParams();

  let drivers = useSelector((state) => state["drivers"]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/owners/${id}/`)
      .then((response) => {
        dispatch(getOwner(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(asociado, "asociado");

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

  const approve = async (e) => {
    e.preventDefault();
    await swal({
      title: "¿Seguro?",
      text: `¿Desea aprobar a ${asociado.user.name} ${asociado.user.last_name} como asociado?`,
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then((response) => {
      if (response) {
        axios
          .post(`${process.env.REACT_APP_BACKEND}/owners/${id}/approve/`)
          .then((response) => {
            swal({
              title: "Operación exitosa!",
              text: `Acabas de aprobar a ${asociado.user.name} ${asociado.user.last_name} como asociado.`,
              icon: "success",
            });
          })
          .catch((error) => {
            swal({
              title: "Error!",
              text: "Lo siento, no se ha podido concretar la operación. Por favor intente nuevamente mas tarde.",
              icon: "warning",
            });
          });
      }
    });
  };

  const back = (e) => {
    history.push("/back_office_administracion/pendientes_aprobacion/asociados");
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
      {Object.keys(asociado).length > 0 ? (
        <div className={`${Style.containerMisDatosAdm} row containerVehiculos`}>
          <div className={`${Style.fondo} row m-0`}>
            <div className={`${Style.title} col-12 mt-2`}>
              <h3>
                Pendientes de Aprobación - Conductores - {asociado.user.name}{" "}
                {asociado.user.last_name}
              </h3>
            </div>

            <div>
              <div className={`${Style.menu} col-12 mt-4`}>
                <div className={`row justify-content-evenly`}>
                  <button
                    className={`${Style.add} col-2`}
                    onClick={(e) => approve(e)}
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={(e) => back(e)}
                    className={`${Style.add} col-2`}
                  >
                    Volver
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
              <label className={`${Style.datos}`}>
                {asociado.user.last_name}
              </label>

              <label className={`${Style.lbl}`}>Nombre:</label>
              <label className={`${Style.datos}`}>{asociado.user.name}</label>

              <label className={`${Style.lbl}`}>Rut:</label>
              <label className={`${Style.datos}`}>{asociado.user.rut}</label>

              <label className={`${Style.lbl}`}>Fecha de Nacimiento:</label>
              <label className={`${Style.datos}`}>
                {asociado.user.birth_date}
              </label>

              <label className={`${Style.lbl}`}>Dirección:</label>
              <label className={`${Style.datos}`}>
                {asociado.user.address}
              </label>

              <label className={`${Style.lbl}`}>Celular1:</label>
              <label className={`${Style.datos}`}>
                {asociado.user.phone_number}
              </label>

              <label className={`${Style.lbl}`}>Celular2:</label>
              <label className={`${Style.datos}`}>
                {asociado.user.phone_number2
                  ? asociado.user.phone_number2
                  : "-"}
              </label>

              <label className={`${Style.lbl}`}>Banco</label>
              <label className={`${Style.datos}`}>
                {asociado.bank_account.bank}
              </label>

              <label className={`${Style.lbl}`}>Tipo Cuenta</label>
              <label className={`${Style.datos}`}>
                {asociado.bank_account.type}
              </label>

              {/* <label className={`${Style.lbl}`}>Nacionalidad:</label>
              <label className={`${Style.datos}`}>
                {asociado.driver_data.nationality}
              </label>

              <label className={`${Style.lbl}`}>
                Viajes Interprovinciales:
              </label>
              <label className={`${Style.datos}`}>
                {asociado.driver_data.inter_travels ? "Sí" : "No"}
              </label>

              <label className={`${Style.lbl}`}>N° Licencia:</label>
              <label className={`${Style.datos}`}>
                {asociado.driver_data.license_number}
              </label>

              <label className={`${Style.lbl}`}>Nacionalidad:</label>
              <label className={`${Style.datos}`}>
                {asociado.driver_data.nationality}
              </label>

              <label className={`${Style.lbl}`}>Foto:</label>
              <label className={`${Style.datos}`}>
                <a href={`${asociado.files[0].foto}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Carnet:</label>
              <label className={`${Style.datos}`}>
                <a href={`${asociado.files[1].carnet}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Licencia:</label>
              <label className={`${Style.datos}`}>
                <a href={`${asociado.files[2].licencia}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Antecedentes:</label>
              <label className={`${Style.datos}`}>
                <a href={`${asociado.files[3].antecedentes}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Hoja:</label>
              <label className={`${Style.datos}`}>
                <a href={`${asociado.files[4].hoja}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label> */}
            </div>
          </div>
        </div>
      ) : (
        <div className={`${Style.containerMisDatosAdm} row containerVehiculos`}>
          <h1 className={`${Style.loading}`}>Cargando datos...</h1>
        </div>
      )}
    </div>
  );
}
