// @ts-nocheck
import { Link } from "react-router-dom";
import Style from "./PendientesVehiculos.module.css";
import Table from "react-bootstrap/Table";
import { FiUsers } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcSearch } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import {
  filterCars,
  editAssociated,
  earringCars,
} from "../../globalState/Actions";
import axios from "../../axiosConfig";
import swal from "sweetalert";
import Loader from "../Loader";
import { ImEye } from "react-icons/im";

export default function PendientesVehiculos() {
  const dispatch = useDispatch();
  let cars = useSelector((state) => state["earring_cars"]);
  let [loading, setLoading] = useState(true);

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;

  cars = cars.slice(indexOfFirstRegister, indexOfLastRegister);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(cars.length / registerPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // =====================================

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKOFFICE}/cars?is_approved=false`)
      .then((response) => {
        setLoading(false);
        dispatch(earringCars(response.data));
        console.log(response.data, "Cars Not Approved");
      })
      .catch((error) => {
        swal({
          title: "Error!",
          text: "No se pudieron obtener los vehículos. Verifique su conexión o intente de nuevo mas tarde.",
          icon: "warning",
          buttons: ["", "OK"],
        });
      });
    return () => {
      dispatch(earringCars([]));
    };
  }, []);
  // useEffect( () => {
  //     dispatch(initialGetCars(autos));
  // }, [autos])

  let history = useHistory();

  const editCar = (e, id) => {
    e.preventDefault();
    let asociado = cars.find((e) => e.id === id);
    dispatch(editAssociated(asociado));
    history.push("/back_office_administracion/asociados/editar");
  };

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
    history.push("/back_office_administracion/pendientes_aprobacion/viajes");
  };

  const dropBox = (e) => {
    e.preventDefault();

    let selectValue = parseInt(e.target.value);

    cars = cars.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterCars(cars));
  };

  const back = (e) => {
    history.push("/back_office_administracion/pendientes_aprobacion");
  };

  return (
    <div>
      <div className={`${Style.containerPendientes} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Pendientes de Aprobación - Vehículos</h3>
          </div>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : cars.length > 0 ? (
            <div className="col-12">
              <div
                className={`${Style.select} row mb-3 justify-content-between`}
              >
                <section className="col-12 col-sm-12 col-md-5 col-lg-5 mt-2 mt-sm-2 mt-md-4 mt-lg-4">
                  <div className="row">
                    <h6
                      className={`${Style.registers} col-6 col-sm-4 col-md-3 col-lg-3 pt-1 m-0 text-start`}
                    >
                      Registros por página
                    </h6>
                    <select
                      className={`${Style.regPag} dropBox col-3 col-sm-2 col-md-3 col-lg-3`}
                      onChange={(e) => dropBox(e)}
                    >
                      <option
                        value="5"
                        defaultValue
                        onChange={(e) => dropBox(e)}
                      >
                        5
                      </option>
                      <option value="10" onChange={(e) => dropBox(e)}>
                        10
                      </option>
                      <option value="20" onChange={(e) => dropBox(e)}>
                        20
                      </option>
                    </select>
                  </div>
                </section>
                <section
                  className={`${Style.divButtons} col-12 col-sm-12 col-md-7 col-lg-7 mt-3 mt-sm-3`}
                >
                  <div
                    className={`${Style.buttonsTwo} row justify-content-sm-start justify-content-md-center justify-content-lg-end`}
                  >
                    <input
                      autoFocus
                      className={`${Style.search} col-4 col-sm-4 col-md-2 col-lg-2`}
                      type="text"
                      placeholder="Buscar..."
                    />
                    <FcSearch
                      className={`${Style.searchIcon} col-5 col-sm-5 col-md-1 col-lg-1`}
                    />
                    {/* <button className={`${Style.inactives} col-5 col-sm-5 col-md-2 col-lg-2 mt-0 mt-sm-0 mt-md-0 mt-lg-0`}>Ver inactivos</button> */}
                  </div>
                </section>
              </div>

              <div className={`${Style.table} col-12`}>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr className={`${Style.tableH} col-12`}>
                      <th>#</th>
                      <th>Patente</th>
                      <th className={`${Style.nombre}`}>Marca</th>
                      <th className={`${Style.nombre}`}>Modelo</th>
                      <th className={`${Style.acciones}`}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className={`${Style.tableB} col-12`}>
                    {cars.map((element, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{element.patent}</td>
                        <td>{element.make}</td>
                        <td>{element.model}</td>
                        {/* <td>{element.direccion}</td>
                                        <td>{element.fechaNac}</td> */}
                        <td
                          className={`${Style.buttons} d-flex justify-content-evenly`}
                        >
                          <div>
                            {/* <Link to="/back_office_administracion/pendientes_aprobacion/vehiculos"><AiFillCar className={Style.car}/></Link> */}
                            <Link
                              to={`/back_office_administracion/pendientes_aprobacion/vehiculos/${element.id}`}
                            >
                              <ImEye className={Style.conductores} />
                            </Link>
                            {/* <a href="" onClick={(e)=>detailTravel(e, element.id)}><FaRoute className={Style.viajes}/></a> */}
                          </div>
                        </td>
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
          ) : cars.length === 0 ? (
            <div>
              <br />
              <h1 className={`${Style.noCars}`}>
                No hay vehículos para aprobar
              </h1>
            </div>
          ) : (
            <div>CARGANDO</div>
          )}
        </div>
      </div>
    </div>
  );
}
