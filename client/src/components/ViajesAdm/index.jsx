import { useHistory } from "react-router-dom";
import Style from "./ViajesAdm.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { autos } from "./data";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookins } from "../../globalState/Actions";
import axios from "axios";
import Loader from "../Loader";

export default function ViajesAdm() {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let { bookins } = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TRIPS}/bookings/`)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        dispatch(getBookins(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let [form, setForm] = useState({
    nroViaje: "",
    cliente: "",
    fecha: "",
    distancia: "",
  });

  let [error, setError] = useState({
    nroViaje: "Error",
    cliente: "Error",
    fecha: "Error",
    distancia: "Error",
  });

  let cars = useSelector((state) => state["cars"]);

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  bookins = bookins.slice(indexOfFirstRegister, indexOfLastRegister);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(bookins.length / registerPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // =====================================

  // useEffect(() => {
  //   dispatch(initialGetCars(autos));
  // }, [autos]);

  const editCar = (e, id) => {
    e.preventDefault();
    history.push(`/back_office_administracion/usuarios/${id}`);
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

    bookins = bookins.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    // dispatch(filterCars(cars));
  };

  const inputs = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });

    if (value === "") {
      setError({
        ...error,
        [name]: "Error",
      });
    } else {
      setError({
        ...error,
        [name]: "",
      });
    }
    console.log(form, "form");
  };

  return (
    <div>
      <div className={`${Style.containerAdmUsuarios} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0 flex-column`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Viajes</h3>
          </div>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : bookins.length === 0 ? (
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
                      <th className={`${Style.nombreCompleto}`}>
                        Usuario
                      </th>
                      <th className={`${Style.email}`}>Viaje N°</th>
                      <th className={`${Style.cliente}`}>Distancia</th>
                      {/* <th>Teléfono</th> */}
                      <th className={`${Style.acciones}`}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className={`${Style.tableB}`}>
                    {bookins.map((element, index) => (
                      <tr key={index}>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        {/* <td>{element.rut}</td> */}
                        <td>{element.phone_number}</td>
                        <td
                          className={`${Style.buttons} d-flex justify-content-evenly`}
                        >
                          <a href="" onClick={(e) => editCar(e, element.id)}>
                            <TiEdit className={Style.edit} />
                          </a>
                          <a href="" onClick={(e) => deleteCar(e, element.id)}>
                            <TiDeleteOutline className={Style.delete} />
                          </a>
                          {/* <Link to="/back_office_administracion/usuarios/roles">
                            <RiLockPasswordLine className={Style.edit} />
                          </Link> */}
                          {/* <a href="" onClick={(e)=>deleteCar(e, element.id)}><TiDeleteOutline className={Style.delete}/></a>
                                            <a href="" onClick={(e)=>detailCar(e, element.id)}><FiUsers className={Style.details}/></a> */}
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
          ) : (
            <div>
              <br />
              <h1 className={`${Style.noCars} mt-4`}>
                No hay autos para mostrar
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
