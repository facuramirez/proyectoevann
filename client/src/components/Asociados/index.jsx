import { Link } from "react-router-dom";
import Style from "./Asociados.module.css";
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
import { getOwners } from "../../globalState/Actions";
import axios from "../../axiosConfig";
// import ReactExport  from 'react-data-export';
import { CSVLink } from "react-csv";
import Loader from "../Loader";

export default function Asociados() {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  // const ExcelFile = ReactExport.ExcelFile;
  // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  // const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/owners/`)
      .then((response) => {
        setLoading(false);
        dispatch(getOwners(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let ownersFilter;
  let owners = useSelector((state) => state["owners"]);  

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  owners = owners.slice(indexOfFirstRegister, indexOfLastRegister);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(owners.length / registerPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // =====================================

  useEffect(() => {
    dispatch(initialGetCars(owners));
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
    history.push(`/back_office_administracion/asociados/${id}`);
  };

  const dropBox = (e) => {
    e.preventDefault();

    let selectValue = parseInt(e.target.value);

    ownersFilter = owners.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterCars(ownersFilter));
  };

  let data = owners.map(owner => {
    if(owner.is_approved) return {...owner, is_approved:'SI'};
    else return {...owner, is_approved:'NO'};
  })

  const headers = [
    { label: "Nombre", key: "user.name" },
    { label: "Apellido", key: "user.last_name" },
    { label: "¿Aprobado?", key: "is_approved"},
    { label: "Dirección", key: "user.address" },
    { label: "Fecha_de_Nacimiento", key: "user.birth_date" },
    { label: "Teléfono1", key: "user.phone_number" },
    { label: "Teléfono1", key: "user.phone_number2" },
    { label: "Banco", key: "bank_account.bank" },
    { label: "Tipo_Cuenta", key: "bank_account.type" },
  ];

  const csvReport = {
    filename: "Asociados.csv",
    headers: headers,
    data,
  };

  return (
    <div>
      <div className={`${Style.containerAsociados} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Asociados</h3>
          </div>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : owners.length > 0 ? (
            <div className="col-12">
              <div
                className={`${Style.select} row mt-4 mb-3 justify-content-between`}
              >
                <div className={`${Style.export}`}>
                  <CSVLink {...csvReport}>Exportar a Excel</CSVLink>
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
                {owners ? (
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr className={`${Style.tableH} col-12`}>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th className={`${Style.nombre}`}>Apellido</th>
                        {/* <th>Direccion</th>
                                        <th>Fecha de Nacimiento</th> */}
                        <th>¿Aprobado?</th>
                        <th className={`${Style.acciones}`}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className={`${Style.tableB} col-12`}>
                      {owners.map((owner, index) => (
                        <tr key={index}>
                          <td>{owner.user.rut}</td>
                          <td>{owner.user.name}</td>
                          <td>{owner.user.last_name}</td>
                          <td>{owner.is_approved ? 'SI':'NO'}</td>
                          {/* <td>{element.direccion}</td>
                                        <td>{element.fechaNac}</td> */}
                          <td
                            className={`${Style.buttons} d-flex justify-content-evenly`}
                          >
                            <div>
                              {/* <a
                                href=""
                                onClick={(e) => editCar(e, owner.user.rut)}
                              >
                                <TiEdit className={Style.edit} />
                              </a> */}
                              <a
                                href=""
                                onClick={(e) => deleteCar(e, owner.user.rut)}
                              >
                                <TiDeleteOutline className={Style.delete} />
                              </a>
                              <a
                                href=""
                                onClick={(e) => detailAsoc(e, owner.id)}
                              >
                                <ImEye className={Style.details} />
                              </a>
                              {/* <Link to="/back_office_administracion/asociados/vehiculos"><AiFillCar className={Style.car}/></Link>
                                                <Link to="/back_office_administracion/asociados/conductores"><FiUsers className={Style.conductores}/></Link>
                                                <a href="" onClick={(e)=>detailTravel(e, element.id)}><FaRoute className={Style.viajes}/></a> */}
                            </div>
                          </td>
                        </tr>
                      ))}
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
            <div>
              <br />
              <h1 className={`${Style.noCars} mt-4`}>
                No hay asociados para mostrar
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
