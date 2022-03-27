// @ts-nocheck
import { Link } from "react-router-dom";
import Style from "./PendientesActualizacionesData.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initialGetCars,
  filterCars,
  initialGetConductores,
} from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import { ImEye } from "react-icons/im";
import { FaRoute } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  editAssociated,
  pendings,
  pendingData,
} from "../../globalState/Actions";
import axios from "../../axiosConfig";
import swal from "sweetalert";
import Loader from "../Loader";

export default function PendientesActualizacionesData() {
  const dispatch = useDispatch();
  let pending = useSelector((state) => state["pendingData"]);
  let history = useHistory();
  let [loading, setLoading] = useState(false);

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  pending = pending.slice(indexOfFirstRegister, indexOfLastRegister);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pending.length / registerPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // =====================================

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKOFFICE}/pendings/`)
  //     .then((response) => {
  //       setLoading(false);
  //       console.log(response.data);
  //       dispatch(pendings(response.data));
  //     })
  //     .catch((error) => {
  //       swal({
  //         title: "Error!",
  //         text: "No se pudieron obtener los datos pendientes de actualización. Verifique su conexión o intente de nuevo mas tarde.",
  //         icon: "warning",
  //         buttons: ["", "OK"],
  //       });
  //     });
  // }, []);

  // useEffect( () => {
  //     dispatch(initialGetCars(autos));
  // }, [autos])

  // const editCar = (e, id) => {
  //   e.preventDefault();
  //   let asociado = conductores.find((e) => e.id === id);
  //   dispatch(editAssociated(asociado));
  //   history.push("/back_office_administracion/asociados/editar");
  // };

  const deleteCar = (e, id) => {
    e.preventDefault();
    alert("Eliminando Car " + id);
  };

  const detailAsoc = (e, id) => {
    e.preventDefault();
    alert("Detalles Asociado " + id);
  };

  const detailCar = (e, id) => {
    e.preventDefault();
    alert("Detalles Car " + id);
  };

  const detailConductores = (e, id) => {
    e.preventDefault();
    alert("Detalles Conductores " + id);
  };

  const detailTravel = (e, id) => {
    e.preventDefault();
    // alert('Detalles Viaje ' +id);
    history.push("/back_office_administracion/pendientes_aprobacion");
  };

  const dropBox = (e) => {
    e.preventDefault();

    let selectValue = parseInt(e.target.value);

    pending = pending.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterCars(pending));
  };

  const approve = async (e, data) => {
    e.preventDefault();
    const id = data[0];
    console.log('DENTRO DE FUNCION');
    console.log(data, 'DATA');
    console.log(pending, 'pending');
    await swal({
      title: "¿Seguro?",
      text: `Los datos a modificar corresponden al asociado: \n 
      Nombre: ${data[1]}
      Rut: ${data[2]} \n
      ¿Confirmar operación?`,
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then((response) => {
      if (response) {
        axios
          .post(`${process.env.REACT_APP_BACKOFFICE}/pendings/${data.id}/approve/`)
          .then((response) => {
            swal({
              title: "Operación exitosa!",
              text: `Actualización de datos realizada correctamente`,
              icon: "success",
            });
            history.push("/back_office_administracion/pendientes_aprobacion");
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
    history.push(
      "/back_office_administracion/pendientes_aprobacion/actualizaciones"
    );
  };

  console.log(pending, "PENDING ACTUAL");

  return (
    <div>
      <div className={`${Style.containerPendientes} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Pendientes de Aprobación - Actualizaciones - Detalle</h3>
          </div>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : pending.length > 0 ? (
            <div className="col-12">
              <div
                className={`${Style.select} row mb-3 justify-content-between`}
              >
                <section className="col-12 col-sm-12 col-md-12 col-lg-12 mt-2 mt-sm-2 mt-md-4 mt-lg-4">
                  <div className="row justify-content-center">
                    <div className="col-lg-4">
                      <button
                        type="button"
                        onClick={(e) => approve(e, pending)}
                        className={`${Style.approve} btn btn-success`}
                      >
                        APROBAR
                      </button>
                    </div>
                    {/* <div className="col-lg-4">
                      <button
                        type="button"
                        onClick={(e) => back(e)}
                        className={`${Style.approve} btn btn-warning`}
                      >
                        VOLVER
                      </button>
                    </div> */}
                  </div>
                </section>
              </div>

              <div className={`${Style.table} col-12`}>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr className={`${Style.tableH} col-12`}>
                      <th>#</th>
                      <th>Cambio</th>
                      <th className={`${Style.nombre}`}>Actual</th>
                      <th>Nuevo</th>
                      {/* <th>Teléfono</th>
                      <th className={`${Style.acciones}`}>Acciones</th> */}
                    </tr>
                  </thead>
                  <tbody className={`${Style.tableB} col-12`}>
                    {pending.map((element, index) => (
                      (index > 2) &&
                      <tr key={index}>
                        <td>{index-2}</td>
                        <td>{element.changeName}</td>
                        <td>{element.old}</td>
                        <td>{element.new}</td>
                        {/* <td>{element.phone_number}</td>
                        <td
                          className={`${Style.buttons} d-flex justify-content-evenly`}
                        >
                          <a onClick={(e) => approve(e, element)}>
                            <FiUsers className={Style.conductores} />
                          </a>
                        </td> */}
                        {/* <td
                          className={`${Style.buttons} d-flex justify-content-evenly`}
                        >
                          <div>
                            <Link
                              to={`/back_office_administracion/pendientes_aprobacion/actualizaciones/${element.id}`}
                            >
                              <FiUsers className={Style.conductores} />
                            </Link>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className={`${Style.pagination} col-12`}>
                <ul className={`${Style.ulPagination}`}>
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`${Style.liElements}`}
                      onClick={(e) => paginate(e, number)}
                    >
                      <a href="">{number}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  onClick={(e) => back(e)}
                  className={`${Style.add} col-2`}
                >
                  Volver
                </button>
              </div>
            </div>
          ) : (
            pending.length === 0 && (
              <div>
                <br />
                <h1 className={`${Style.noConductores} mt-4`}>
                  No hay actualizaciones pendientes
                </h1>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
