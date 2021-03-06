import { Link } from "react-router-dom";
import Style from "./UsuariosEmpresas.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initialGetConductores,
  filterConductores,
  getUsersBusiness,
} from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import axios from "../../axiosConfig";
import swal from "sweetalert";
import Loader from "../Loader";

export default function UsuariosEmpresas() {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let { usersBusiness } = useSelector((state) => state);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/companies/users/`)
      .then((response) => {
        setLoading(false);
        dispatch(getUsersBusiness(response.data));
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

  useEffect(() => {
    console.log(usersBusiness, "usersBusiness");
  }, [usersBusiness]);

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  const pageNumbers = [];

  if (usersBusiness.length > 0) {
    usersBusiness = usersBusiness.slice(
      indexOfFirstRegister,
      indexOfLastRegister
    );

    for (
      let i = 1;
      i <= Math.ceil(usersBusiness.length / registerPerPage);
      i++
    ) {
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

    usersBusiness = usersBusiness.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterConductores(usersBusiness));
  };

  return (
    <div>
      <div className={`${Style.containerConductores} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0 flex-column`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Usuarios</h3>
          </div>

          <button className={`${Style.add} col-2 mt-1`}>
            <Link to="/back_office_empresas/usuarios/nuevo_usuario">
              <IoMdAddCircleOutline className={`${Style.iconAdd}`} />
              Nuevo
            </Link>
          </button>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : usersBusiness.length > 0 ? (
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
                  {/* <section
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
                      
                    </div>
                  </section> */}
                </div>

                <div className={`${Style.table} col-12`}>
                  <Table striped bordered hover variant="dark">
                    <thead className={`${Style.tableH}`}>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Rut</th>
                        <th>Telefono</th>
                      </tr>
                    </thead>
                    <tbody className={Style.tableB}>
                      {usersBusiness.map((user, index) => (
                        <tr key={index}>
                          <td>{++index}</td>
                          {/* <td>{element.user.name}</td>
                          <td>{element.user.phone_number}</td>
                          <td>{element.is_approved ? "SI" : "NO"}</td>
                          <td>{element.is_approved ? "SI" : "NO"}</td> */}

                          <td>{user.name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.rut}</td>
                          <td>{user.phone_number}</td>

                          {/* <td
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
              </div>
            </div>
          ) : (
            <div>
              <br />
              <h1 className={`${Style.noCars} mt-4`}>
                No hay usuarios dados de alta
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
