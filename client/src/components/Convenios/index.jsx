import { Link } from "react-router-dom";
import Style from "./Convenios.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { autos } from "./data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialGetCars, filterCars } from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import { ImEye } from "react-icons/im";
import { FaRoute } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { getConvenios } from "../../globalState/Actions";
import axios from "../../axiosConfig";
// import ReactExport  from 'react-data-export';
import { CSVLink } from "react-csv";
import Loader from "../Loader";

export default function Convenio() {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  // const ExcelFile = ReactExport.ExcelFile;
  // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  // const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/companies/`)
      .then((response) => {
        setLoading(false);
        dispatch(getConvenios(response.data));
        console.log(response.data, "CONVENIOS");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let ownersFilter;
  let convenios = useSelector((state) => state["convenios"]);

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  convenios = convenios.slice(indexOfFirstRegister, indexOfLastRegister);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(convenios.length / registerPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // =====================================

  useEffect(() => {
    dispatch(initialGetCars(convenios));
  }, []);

  let history = useHistory();

  const editCar = (e, id) => {
    e.preventDefault();
    //    let asociado = cars.find((e) => e.id === id);
    //    dispatch(editAssociated(asociado));
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
    history.push("/back_office_administracion/asociados/viajes");
  };

  const dropBox = (e) => {
    e.preventDefault();

    let selectValue = parseInt(e.target.value);

    ownersFilter = convenios.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterCars(ownersFilter));
  };

  // let data = convenios.map((owner) => {
  //   if (convenios.is_approved) return { ...convenios, is_approved: "SI" };
  //   else return { ...owner, is_approved: "NO" };
  // });

  // const headers = [
  //   { label: "Nombre", key: "user.name" },
  //   { label: "Apellido", key: "user.last_name" },
  //   { label: "¿Aprobado?", key: "is_approved" },
  //   { label: "Dirección", key: "user.address" },
  //   { label: "Fecha_de_Nacimiento", key: "user.birth_date" },
  //   { label: "Teléfono1", key: "user.phone_number" },
  //   { label: "Teléfono1", key: "user.phone_number2" },
  //   { label: "Banco", key: "bank_account.bank" },
  //   { label: "Tipo_Cuenta", key: "bank_account.type" },
  // ];

  // const csvReport = {
  //   filename: "Convenios.csv",
  //   headers: headers,
  //   data,
  // };

  const nuevoConvenio = (e) => {
    e.preventDefault();
    history.push("/back_office_administracion/convenios/nuevo_convenio");
  };

  return (
    <div>
      <div className={`${Style.containerConvenios} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Convenios</h3>
          </div>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : convenios.length > 0 ? (
            <div className="col-12">
              <div
                className={`${Style.select} row mt-4 mb-3 justify-content-between`}
              >
                <div className={`${Style.export}`}>
                  <button onClick={(e) => nuevoConvenio(e)}>Nuevo</button>
                </div>
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
                {convenios ? (
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr className={`${Style.tableH} col-12`}>
                        <th>Código de Convenio</th>
                        <th>Nombre de Fantasía</th>
                        <th className={`${Style.nombre}`}>Descripción de la Empresa</th>
                        {/* <th>Representante Legal</th> */}
                        {/* <th className={`${Style.acciones}`}>Repreentante Legal</th> */}
                      </tr>
                    </thead>
                    <tbody className={`${Style.tableB} col-12`}>
                      <tr>
                        {/* <td>{owner.user.rut}</td>
                          <td>{owner.user.name}</td>
                          <td>{owner.user.last_name}</td>
                          <td>{owner.is_approved ? "SI" : "NO"}</td> */}

                        <td>Código 123</td>
                        <td>Benitez Viajes S.R.L.</td>
                        <td>Empresa de Viajes</td>
                        

                        {/* <td
                            className={`${Style.buttons} d-flex justify-content-evenly`}
                          >
                            <div>
                              <a
                                href=""
                                onClick={(e) => editCar(e, owner.user.rut)}
                              >
                                <TiEdit className={Style.edit} />
                              </a>
                              <a
                                href=""
                                onClick={(e) => deleteCar(e, owner.user.rut)}
                              >
                                <TiDeleteOutline className={Style.delete} />
                              </a>
                              <a
                                href=""
                                onClick={(e) => detailAsoc(e, owner.user.rut)}
                              >
                                <ImEye className={Style.details} />
                              </a>
                              
                            </div>
                          </td> */}
                      </tr>
                    </tbody>
                  </Table>
                ) : null}
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
            <div className={`${Style.noConvenios}`}>
              <h1 className={`${Style.noCars} mt-4`}>
                No hay convenios dados de alta <br/> <h6>Haga click en "Nuevo" para dar de alta un nuevo convenio</h6>
              </h1>
              <div className={`${Style.export} mt-3`}>
                <button onClick={(e) => nuevoConvenio(e)}>Nuevo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
