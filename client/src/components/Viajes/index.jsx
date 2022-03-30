import { Link } from "react-router-dom";
import Style from "./Viajes.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { autoss } from "./data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialGetCars, filterCars } from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import { ImEye } from "react-icons/im";
// import { moment } from "moment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { CSVLink } from "react-csv";

export default function Viajes() {
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

  const dispatch = useDispatch();
  let cars;
  let [autos, setAutos] = useState([]);
  const [filter, setFilter] = useState({
    desde: "",
    hasta: "",
  });

  // ============== PAGINADO =============
  let [currentPage, setCurrentPage] = useState(1);
  let [registerPerPage, setRegisterPerPage] = useState(5);

  let indexOfLastRegister = currentPage * registerPerPage;
  let indexOfFirstRegister = indexOfLastRegister - registerPerPage;
  cars = autos.slice(indexOfFirstRegister, indexOfLastRegister);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(autos.length / registerPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // =====================================

  useEffect(() => {
    setAutos(autoss);
  }, []);

  const editCar = (e, id) => {
    e.preventDefault();
    alert("Viaje cliente " + id);
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

    cars = autos.slice(0, selectValue);
    setRegisterPerPage(selectValue);
    setCurrentPage(1);
    dispatch(filterCars(cars));
  };

  cars = cars.sort((a, b) => {
    const as = a.fecha.split("-");
    const ad = new Date(as[0], as[1] - 1, as[2]);
    const bs = b.fecha.split("-");
    const bd = new Date(bs[0], bs[1] - 1, bs[2]);
    return ad - bd;
  });

  // useEffect(() => {

  //   cars = cars.sort((a, b) => {
  //     const as = a.fecha.split("-");
  //     const ad = new Date(as[2], as[1] - 1, as[0]);
  //     const bs = b.fecha.split("-");
  //     const bd = new Date(bs[2], bs[1] - 1, bs[0]);
  //     return ad - bd;
  //   });
  // }, [cars]);

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

  // ====== MATERIAL UI (Calendario Fecha de Nacimiento) =======
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();
  // =============================================================

  const filterDate = (e) => {
    if (!filter.desde || !filter.hasta) {
      return swal({
        title: "Campos incompletos!",
        text: "Por favor primero complete los campos del filtro.",
        icon: "warning",
        // timer: 3000,
        // buttons: ['OK']
      });
    }

    let desde = filter.desde.split("-");
    desde = new Date(desde[0], desde[1] - 1, desde[2]);

    let hasta = filter.hasta.split("-");
    hasta = new Date(hasta[0], hasta[1] - 1, hasta[2]);

    cars = autoss.map((car) => {
      let dateCar = car.fecha.split("-");
      dateCar = new Date(dateCar[0], dateCar[1] - 1, dateCar[2]);

      if (dateCar > desde && dateCar < hasta) return car;
    });

    cars = cars.filter((car) => car !== undefined);
    setAutos(cars);
  };

  const dates = (e) => {
    e.preventDefault();
    let name = e.target.name;
    setFilter({ ...filter, [name]: e.target.value });
  };

  // useEffect(() => {
  //   if(filter.desde === "1900-01-01") {
  //     let filterButton = document.getElementsByClassName('filtrar');
  //     filterButton.trig
  //   }
  // }, [filter]);

  const headers = [
    { label: "Nombre", key: "id" },
    { label: "Apellido", key: "asociado" },
    { label: "¿Aprobado?", key: "conductor" },
    { label: "Dirección", key: "fecha" },
    { label: "Fecha_de_Nacimiento", key: "distancia" },
  ];

  const csvReport = {
    filename: "Viajes.csv",
    headers: headers,
    data: cars,
  };

  const filterReset = (e) => {
    let hoy = new Date();
  
    let dia = hoy.getDate();
    let mes = hoy.getMonth() + 1;
    let año = hoy.getFullYear();
    if(mes.toString().length === 1) mes = `0${mes.toString()}`;
    hoy = `${año}-${mes}-${dia}`;

    setFilter({ desde: "1900-01-01", hasta: hoy });
  };

  return (
    <div>
      <div className={`${Style.containerViajes} row containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-2`}>
            <h3>Viajes</h3>
          </div>

          <div className="col-12">
            <div className={`${Style.select} row mb-3 justify-content-between`}>
              <section className="col-12 col-sm-12 col-md-5 col-lg-5 mt-2 mt-sm-2 mt-md-4 mt-lg-4">
                <div className={`${Style.firstLine}`}>
                  <div>
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
                  <div className={`${Style.export}`}>
                    <CSVLink {...csvReport}>Exportar a Excel</CSVLink>
                  </div>
                </div>

                {/* <div className="row mt-2">
                    <h6
                      className={`${Style.registers} col-6 col-sm-4 col-md-3 col-lg-3 pt-1 m-0 text-start`}
                    >
                      Filtrar por fecha
                    </h6>
                  </div> */}

                <div className={`${Style.divDesde} row mt-3`}>
                  <h6
                    className={`${Style.registers} ${Style.filter} col-6 col-sm-4 col-md-3 col-lg-3 pt-1 m-0 text-start`}
                  >
                    * desde:
                  </h6>

                  <form
                    className={`${classes.container} ${Style.inputFecha} mt-sm-1 p-0 p-sm-0 col-11 col-sm-11 col-md-3 col-lg-3`}
                    noValidate
                  >
                    <TextField
                      id="date"
                      label=""
                      type="date"
                      name="desde"
                      value={filter.desde}
                      onChange={(e) => dates(e)}
                      // defaultValue="2017-05-24"
                      className={`${Style.fechaNacField} ${classes.textField}`}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                  <div className={Style.filtrar}>
                    <button
                      className={`${Style.buttonFiltrar} btn btn-dark filtrar`}
                      onClick={(e) => filterDate(e)}
                    >
                      Filtrar
                    </button>
                  </div>
                  <div className={Style.resetFilter}>
                    <button
                      className={`${Style.buttonResetear} btn btn-dark`}
                      onClick={(e) => filterReset(e)}
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>

                <div className="row mt-2">
                  <h6
                    className={`${Style.registers} ${Style.filter} ${Style.hasta} col-6 col-sm-4 col-md-3 col-lg-3 pt-1 m-0 text-start`}
                  >
                    * hasta:
                  </h6>

                  <form
                    className={`${classes.container} ${Style.inputFecha} mt-sm-1 p-0 p-sm-0 col-11 col-sm-11 col-md-3 col-lg-3`}
                    noValidate
                  >
                    <TextField
                      id="date"
                      label=""
                      type="date"
                      name="hasta"
                      value={filter.hasta}
                      onChange={(e) => dates(e)}
                      // defaultValue="2017-05-24"
                      className={`${Style.fechaNacField} ${classes.textField}`}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </div>
              </section>
              {/* <section
                className={`${Style.divButtons} col-12 col-sm-12 col-md-7 col-lg-7 mt-3 mt-sm-3`}
              > */}
              {/* <div
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
                </div> */}
              {/* </section> */}
            </div>

            {cars.length > 0 ? (
              <div style={{ minHeight: "50vh" }}>
                <div className={`${Style.table} col-12`}>
                  <Table striped bordered hover variant="dark">
                    <thead className={Style.tableH}>
                      <tr>
                        <th>#</th>
                        <th className={Style.asociado}>Asociado</th>
                        <th>Conductor</th>
                        <th>Fecha</th>
                        <th>Distancia</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className={Style.tableB}>
                      {cars.map((element, index) => (
                        <tr key={index}>
                          <td>{element.id}</td>
                          <td>{element.asociado}</td>
                          <td>{element.conductor}</td>
                          <td>{element.fecha}</td>
                          <td>{element.distancia}</td>
                          <td
                            className={`${Style.buttons} d-flex justify-content-evenly`}
                          >
                            <a
                              href=""
                              onClick={(e) => detailCar(e, element.id)}
                            >
                              <ImEye className={Style.edit} />
                            </a>
                            {/* <a href="" onClick={(e)=>deleteCar(e, element.id)}><TiDeleteOutline className={Style.delete}/></a>
                                        <a href="" onClick={(e)=>detailCar(e, element.id)}><FiUsers className={Style.details}/></a> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* <table className={`${Style.table} table table-bordered mt-3`}>                                
                                <thead className={`${Style.tableHead}`}>                                
                                    <tr>
                                        <th>PATENTE</th>
                                        <th>MARCA</th>
                                        <th>MODELO</th>
                                        <th>TIPO VEHÍCULO</th>
                                        <th>OBSERVACIONES</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                            
                                <tbody className={`${Style.tableBody}`}>
                                    {
                                    cars.map( (reg, index) => 
                                        <tr key={index}>
                                            <td>{reg.patente}</td>
                                            <td>{reg.marca}</td>
                                            <td>{reg.modelo}</td>
                                            <td>{reg.tipo_veh}</td>
                                            <td>{reg.observaciones}</td>
                                            <td>
                                                <button className={`btn ${Style.button}`}>
                                                    Edit
                                                </button>
                                                <Link to={`/user${reg.id}`}>
                                                <button className={`btn ${Style.button} btn-warning`}>
                                                    View
                                                </button>
                                                </Link>

                                                <Link>
                                                    <button className={`btn ${Style.button} btn-danger`}>Delete</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )}                                    
                                </tbody>
                            </table> */}
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
              <div style={{ minHeight: "50vh" }}>
                <br />
                <h1 className={`${Style.noCars} mt-4`}>
                  No hay autos para mostrar
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// : (
//   <div>
//     <br />
//     <h1 className={`${Style.noCars} mt-4`}>
//       No hay autos para mostrar
//     </h1>
//   </div>
// )}
