import { Link, useParams, useHistory } from "react-router-dom";
import Style from "./PendientesVehiculosId.module.css";
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
  getCar,
} from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import axios from "../../axiosConfig";
import { dataUser } from "../../globalState/Actions";
import swal from "sweetalert";
import { CardActions } from "@material-ui/core";

export default function PendientesVehiculosId() {
  let history = useHistory();

  let car = useSelector((state) => state["car"]);
  const dispatch = useDispatch();
  const { id } = useParams();

  let drivers = useSelector((state) => state["drivers"]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKOFFICE}/cars/${id}/`)
      .then((response) => {
        console.log(response.data, "ASDASDASDASDA");
        dispatch(getCar(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(car, "CARRRRRR");

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
      text: `¿Desea aprobar al vehículo ${car.patent}?`,
      icon: "warning",
      buttons: ["NO", "SI"],
    })
      .then((response) => {
        if (response) {
          axios
            .post(`${process.env.REACT_APP_BACKEND}/cars/${id}/approve/`)
            .then((response) => {
              swal({
                title: "Operación exitosa!",
                text: `Acabas de aprobar a ${car.patent}`,
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
          alert("Aprovando vehículo " + car.id);
        }
      })
      .catch((error) => {
        alert("Error al aprobar vehículo " + car.id);
      });
  };

  const back = (e) => {
    history.push(
      "/back_office_administracion/pendientes_aprobacion/conductores"
    );
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
      {Object.keys(car).length > 0 ? (
        <div className={`${Style.containerMisDatosAdm} row containerVehiculos`}>
          <div className={`${Style.fondo} row m-0`}>
            <div className={`${Style.title} col-12 mt-2`}>
              <h3>Pendientes de Aprobación - Conductores - {car.patent}</h3>
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

              <label className={`${Style.lbl}`}>Patente:</label>
              <label className={`${Style.datos}`}>{car.patent}</label>

              <label className={`${Style.lbl}`}>Equipaje:</label>
              <label className={`${Style.datos}`}>{car.baggage}</label>

              <label className={`${Style.lbl}`}>Empresa:</label>
              <label className={`${Style.datos}`}>
                {car.bussines ? "SI" : "NO"}
              </label>

              <label className={`${Style.lbl}`}>Eventos:</label>
              <label className={`${Style.datos}`}>
                {car.events ? "SI" : "NO"}
              </label>

              <label className={`${Style.lbl}`}>Familia:</label>
              <label className={`${Style.datos}`}>
                {car.family ? "SI" : "NO"}
              </label>

              <label className={`${Style.lbl}`}>Kilometraje:</label>
              <label className={`${Style.datos}`}>{car.mileage}</label>

              <label className={`${Style.lbl}`}>Asientos:</label>
              <label className={`${Style.datos}`}>{car.seating}</label>

              <label className={`${Style.lbl}`}>Tipo:</label>
              <label className={`${Style.datos}`}>
                {car.type === "SD" ? "Sedan" : "Van"}
              </label>

              <label className={`${Style.lbl}`}>Año:</label>
              <label className={`${Style.datos}`}>{car.year}</label>

              {/* <label className={`${Style.lbl}`}>
                Viajes Interprovinciales:
              </label>
              <label className={`${Style.datos}`}>
                {car.driver_data.inter_travels ? "Sí" : "No"}
              </label>

              <label className={`${Style.lbl}`}>N° Licencia:</label>
              <label className={`${Style.datos}`}>
                {car.driver_data.license_number}
              </label> */}

              {/* <label className={`${Style.lbl}`}>Nacionalidad:</label>
              <label className={`${Style.datos}`}>
                {CardActions.driver_data.nationality}
              </label> */}

              {/* <label className={`${Style.lbl}`}>Foto:</label>
              <label className={`${Style.datos}`}>
                <a href={`${car.files[0].foto}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Carnet:</label>
              <label className={`${Style.datos}`}>
                <a href={`${driver.files[1].carnet}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Licencia:</label>
              <label className={`${Style.datos}`}>
                <a href={`${driver.files[2].licencia}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Antecedentes:</label>
              <label className={`${Style.datos}`}>
                <a href={`${driver.files[3].antecedentes}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label>

              <label className={`${Style.lbl}`}>Hoja:</label>
              <label className={`${Style.datos}`}>
                <a href={`${driver.files[4].hoja}`}>
                  <i>Ver/Descargar imagen</i>
                </a>
              </label> */}

              {/* <label className={`${Style.lbl}`}>Seguro:</label>
              <label className={`${Style.datos}`}>
                <a href={`${driver.files[5].seguro}`}>
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
