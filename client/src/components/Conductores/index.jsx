import { Link } from "react-router-dom";
import Style from "./Conductores.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
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
import swal from "sweetalert";

export default function Conductores() {
  const dispatch = useDispatch();
  let conductores = useSelector((state) => state["conductores"]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/drivers/`)
      .then((response) => {
        dispatch(initialGetConductores(response.data));
        console.log(response.data, "conductores");
      })
      .catch((error) => {
        swal({
          title: "Error!",
          text: "No se pudieron obtener los conductores. Verifique su conexión o intente de nuevo mas tarde.",
          icon: "warning",
          buttons: ["", "OK"],
        });
      });
  }, []);

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  const pageNumbers = [];

  if (conductores.length > 0) {
    conductores = conductores.slice(indexOfFirstRegister, indexOfLastRegister);

    for (let i = 1; i <= Math.ceil(conductores.length / registerPerPage); i++) {
      pageNumbers.push(i);
    }
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

    conductores = conductores.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterConductores(conductores));
  };

  return (
    <div>
      <div className={`${Style.containerConductores} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0 flex-column`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Conductores</h3>
          </div>

          <button className={`${Style.add} col-2 mt-1`}>
            <Link to="/back_office/conductores/nuevo_conductor">
              <IoMdAddCircleOutline className={`${Style.iconAdd}`} />
              Nuevo
            </Link>
          </button>

          {conductores.length > 0 ? (
            <div>
              <div className="col-12">
                <div
                  className={`${Style.select} row mt-4 mb-3 justify-content-between`}
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
                    <thead className={`${Style.tableH}`}>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        {/* <th>Dirección</th>
                                        <th>Nacionalidad</th>
                                        <th>Fecha de Nacimiento</th> */}
                        {/* <th>Email</th> */}
                        <th>Celular</th>
                        <th>Aprobado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className={Style.tableB}>
                      {conductores.map((element, index) => (
                        <tr key={index}>
                          <td>{++index}</td>
                          <td>{element.user.name}</td>
                          {/* <td>{element.direccion}</td>
                                        <td>{element.nacionalidad}</td>
                                        <td>{element.fechaNac}</td> */}
                          {/* <td>{element.email}</td> */}
                          {/* <td>{element.estado}</td> */}
                          <td>{element.user.phone_number}</td>
                          <td>{element.is_approved ? "SI" : "NO"}</td>
                          <td
                            className={`${Style.buttons} d-flex justify-content-evenly`}
                          >
                            <a href="" onClick={(e) => editCar(e, element.id)}>
                              <TiEdit className={Style.edit} />
                            </a>
                            <a
                              href=""
                              onClick={(e) => deleteCar(e, element.id)}
                            >
                              <TiDeleteOutline className={Style.delete} />
                            </a>
                            {/* <a href="" onClick={(e)=>detailCar(e, element.id)}><FiUsers className={Style.details}/></a> */}
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
              </div>
            </div>
          ) : (
            <div>
              <br />
              <h1 className={`${Style.noCars} mt-4`}>
                No hay conductores para mostrar
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
