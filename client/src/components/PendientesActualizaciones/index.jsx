// @ts-nocheck
import { Link } from "react-router-dom";
import Style from "./PendientesActualizaciones.module.css";
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
import { editAssociated, pendings } from "../../globalState/Actions";
import axios from "../../axiosConfig";
import swal from "sweetalert";

export default function PendientesConductores() {
  const dispatch = useDispatch();
  let pending = useSelector((state) => state["pending"]);
  let history = useHistory();

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKOFFICE}/pendings/`)
      .then((response) => {
        dispatch(pendings(response.data));
      })
      .catch((error) => {
        swal({
          title: "Error!",
          text: "No se pudieron obtener los datos pendientes de actualización. Verifique su conexión o intente de nuevo mas tarde.",
          icon: "warning",
          buttons: ["", "OK"],
        });
      });
  }, []);

  let pendingData = pending.map((change) => {
    return {
      id: change.id,
      name: change.name,
      rut: change.rut,
      model: change.model,
      changeName: change.changes.map((changeOne) => Object.keys(changeOne)[0]),
      old: change.changes.map(
        (changeTwo, index) => changeTwo[Object.keys(changeTwo)[0]]["old"]
      ),
      new: change.changes.map(
        (changeThree, index) => changeThree[Object.keys(changeThree)[0]]["new"]
      ),
    };
  });

  let data = [];

  pendingData.forEach((key1, index) => {
    key1["changeName"].forEach((key2, index2) => {
      data.push({
        id: key1.id,
        name: key1.name,
        rut: key1.rut,
        model: key1.model,
        changeName: key2,
        old: key1["old"][index2],
        new: key1["new"][index2],
      });
    });
  });

  console.log(data, "pendingData");
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
    history.push("/back_office_administracion/pendientes_aprobacion/");
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
    await swal({
      title: "¿Seguro?",
      text: `¿Desea aprobar el siguiente cambio?: \n
      Usuario: ${data.name}
      Dato Actual: ${data.old}
      Dato nuevo: ${data.new}`,
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then((response) => {
      if (response) {
        axios
          .post(`${process.env.REACT_APP_BACKOFFICE}/pendings/${data.id}/`)
          .then((response) => {
            swal({
              title: "Operación exitosa!",
              text: `Actualización de datos realizada correctamente`,
              icon: "success",
            });
            history.push('/back_office_administracion/pendientes_aprobacion');
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
  }

  const back = (e) => {
    history.push("/back_office_administracion/pendientes_aprobacion");
  };

  return (
    <div>
      <div className={`${Style.containerPendientes} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Pendientes de Aprobación - Actualizaciones</h3>
          </div>
          {data.length > 0 ? (
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
                      <th>Usuario</th>
                      <th className={`${Style.nombre}`}>Rut</th>
                      <th>Modelo</th>
                      <th>Concepto</th>
                      <th>Viejo</th>
                      <th>Nuevo</th>
                      <th className={`${Style.acciones}`}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className={`${Style.tableB} col-12`}>
                    {data.map((element, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{element.name}</td>
                        <td>{element.rut}</td>
                        <td>{element.model}</td>
                        <td>{element.changeName}</td>
                        <td>{element.old}</td>
                        <td>{element.new}</td>
                        <td className={`${Style.buttons} d-flex justify-content-evenly`}>
                          <a onClick={(e)=>approve(e, element)}><FiUsers className={Style.conductores} /></a>
                        </td>
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
            <div>
              <br />
              <h1 className={`${Style.noConductores} mt-4`}>
                No hay actualizaciones pendientes
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
