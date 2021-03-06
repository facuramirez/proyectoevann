import { useState, useEffect } from "react";
import Style from "./ViajesEmpresas.module.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { FaArrowAltCircleLeft, FaHospitalAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import axios from "axios";
import { getUsersBusiness } from "../../globalState/Actions";
import { useDispatch, useSelector } from "react-redux";
import SelectOrigen from "./selectOrigen";
import SelectDestino from "./selectDestino";
import SelectAborda from "./selectAborda";
import { getPassengers } from "./getPassengers";

export default function ViajesEmpresas() {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueDestino, setSelectedValueDestino] = useState(null);
  const [selectedValueAborda, setSelectedValueAborda] = useState(null);
  const [currentPassengers, setCurrentPassengers] = useState(1);
  const [maxPassengers, setMaxPassengers] = useState(1);

  let [loading, setLoading] = useState(true);
  let { usersBusiness } = useSelector((state) => state);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TRIPS}/bookings/`)
      .then((response) => console.log(response, "RESPONSE"));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/companies/users/`)
      .then((response) => {
        setLoading(false);
        dispatch(getUsersBusiness(response.data));
        console.log(response.data, "USERS EN COMPANIES");
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
    setMaxPassengers(usersBusiness.length);
    console.log(usersBusiness.length, "sssss");
  }, [usersBusiness.length]);

  const handleChange = (value) => {
    setSelectedValue(value);
    setForm({ ...form, origen: value });
  };

  const handleChangeDestino = (value) => {
    setSelectedValueDestino(value);
    setForm({ ...form, destino: value });
  };

  const handleChangeAborda = (value, a) => {
    switch (a.name) {
      case "aborda_dir1":
        setForm({ ...form, dir1: value });
        break;
      case "aborda_dir2":
        setForm({ ...form, dir2: value });
        break;
      case "aborda_dir3":
        setForm({ ...form, dir3: value });
        break;
      case "aborda_dir4":
        setForm({ ...form, dir4: value });
        break;
      default:
        break;
    }
    console.log(value, "value");
    console.log(a, "e");
  };

  const setPage = (name) => {
    if (name === "previous" && current === 1) return setCurrent(1);
    if (name === "next" && current === 2) return setCurrent(2);

    if (name === "previous") return setCurrent((c) => c - 1);
    if (name === "next") return setCurrent((c) => c + 1);
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
  // ===========================================================

  let [form, setForm] = useState({
    origen: "",
    fecha: "",
    hora: "",
    destino: "",
    persona1: "",
    persona2: "",
    persona3: "",
    persona4: "",
    aborda1: false,
    aborda2: false,
    aborda3: false,
    aborda4: false,
    dir1: "",
    dir2: "",
    dir3: "",
    dir4: "",
  });

  let [error, setError] = useState({
    origen: "Error",
    fecha: "Error",
    hora: "Error",
    destino: "Error",
    persona1: "Error",
    persona2: "Error",
    persona3: "Error",
    persona4: "Error",
    aborda1: "Error",
    aborda2: "Error",
    aborda3: "Error",
    aborda4: "Error",
    dir1: "Error",
    dir2: "Error",
    dir3: "Error",
    dir4: "Error",
  });

  // const clear = (e) => {
  //   e.preventDefault();
  //   let inputs = document.querySelectorAll("input");

  //   setForm({
  //     rut: "",
  //     name: "",
  //     last_name: "",
  //     address: "",
  //     birth_date: "",
  //     phone_number: "",
  //     phone_number2: "",
  //     email: "",
  //     nationality: "",
  //     inter_travels: "-",
  //     license_number: "",
  //     foto: "",
  //     carnet: "",
  //     licencia: "",
  //     antecedentes: "",
  //     license_hoja: "",
  //     license_due_date: "",
  //     monday: false,
  //     tuesday: false,
  //     wednesday: false,
  //     thursday: false,
  //     friday: false,
  //     saturday: false,
  //     sunday: false,
  //   });

  //   setError({
  //     rut: "",
  //     name: "",
  //     last_name: "",
  //     address: "",
  //     birth_date: "",
  //     phone_number: "",
  //     phone_number2: "",
  //     email: "",
  //     nationality: "",
  //     inter_travels: "",
  //     license_number: "",
  //     foto: "",
  //     carnet: "",
  //     licencia: "",
  //     antecedentes: "",
  //     license_hoja: "",
  //     license_due_date: "",
  //     monday: "",
  //     tuesday: "",
  //     wednesday: "",
  //     thursday: "",
  //     friday: "",
  //     saturday: "",
  //     sunday: "",
  //   });

  //   inputs[0].focus();
  // };

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
  };

  const verifyDays = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let checked = e.target.checked;

    setForm({
      ...form,
      [name]: checked,
    });

    // if (value === "") {
    //   setError({
    //     ...error,
    //     [name]: "Error",
    //   });
    // } else {
    //   setError({
    //     ...error,
    //     [name]: "",
    //   });
    // }
  };

  const verifyRut = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let rut1 = document.getElementById("rut1").value;
    let rut2 = document.getElementById("rut2").value;

    if (name === "rut1") {
      if (/^\d*$/.test(parseInt(rut1)) && rut1 >= 6000000 && rut1 < 99000000) {
        setError({ ...error, rut: "" });
      } else {
        setError({ ...error, rut: "Error" });
      }
    }

    if (name === "rut2") {
      if (/^\d*$/.test(parseInt(rut2)) || rut2.toUpperCase() === "K") {
        setError({ ...error, rut: "" });
      } else {
        setError({ ...error, rut: "Error" });
      }
    }

    if (!rut1 && !rut2) {
      setError({ ...error, rut: "" });
    } else if (!rut1 || !rut2) {
      setError({ ...error, rut: "Error" });
    }

    let rutComplete = `${rut1}-${rut2}`;

    setForm({ ...form, rut: rutComplete });
    // console.log(error, 'error');
    // console.log(form, 'form');
  };

  const verifyData = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    // if(!form.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.banco) {
    //     setAlldata({ready: true})
    // } else {
    //     setAlldata({ready: false})
    // }

    if (!value) {
      setError({ ...error, [name]: "Error" });
    } else {
      setError({ ...error, [name]: "" });
    }

    setForm({ ...form, [name]: value });
  };

  const verifyMail = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    let mail = document.querySelector(".mail");
    // inputRepeatPass = document.querySelector('.repeatPass');

    // let repeat = document.querySelector('.repeatMail');
    // let repeat2 = document.querySelector('.repeatPass');

    mail.onpaste = (e) => {
      e.preventDefault();
      swal({
        title: "Acción inválida!",
        text: "Por favor coloque su correo manualmente",
        icon: "warning",
      });
    };

    // ================ PROCESO EMAIL, REPEAT EMAIL =====================
    if (name === "email") {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)) {
        setError({ ...error, [name]: "Error" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }

    setForm({
      ...form,
      [name]: value,
    });

    // if(!error.rut && !error.mail && !error.repeatMail && !error.admin && !error.ape && !error.direccion && !error.fechaNac && !error.cel1 && !error.cel2 && !error.cuenta && !error.tipo_cuenta && !error.banco && form.rut && form.mail && form.repeatMail && form.admin && form.ape && form.direccion && form.fechaNac && form.cel1 && form.cuenta && form.tipo_cuenta && form.banco) {
    //     setAlldata({ready: true})
    // } else {
    //     setAlldata({ready: false})
    // }
  };

  const verifyCel = (e) => {
    let number = e.target.value;
    let name = e.target.name;

    if (/^\d*$/.test(number)) {
      setError({ ...error, [name]: "" });
    } else {
      setError({ ...error, [name]: "Error" });
    }

    setForm({ ...form, [name]: number });
  };

  const verifyAdmin = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (!/^[A-Za-z\s]+$/g.test(value)) {
      setError({ ...error, [name]: "Error" });
    } else {
      setError({ ...error, [name]: "" });
    }
    setForm({ ...form, [name]: value });
  };

  // const uploadFiles = (e) => {
  //   let name = e.target.name;
  //   let file = e.target.files[0];

  //   if (!file) {
  //     setError({ ...error, [name]: "Error" });
  //   } else {
  //     setError({ ...error, [name]: "" });
  //   }

  //   setForm({ ...form, [name]: file });
  // };

  const [resume, setResume] = useState([]);

  useEffect(() => {
    console.log(form, "form");
    console.log(error, "error");
  }, [form]);

  let formData = new FormData();

  const insertFiles = (e) => {
    console.log(form, "form");
    console.log(form.foto, "FOTO");
    // formData.append('foto', form.foto);
    // formData.append('fileCarnet', form.carnet);
    // formData.append('fileLicencia', form.licencia);
    // formData.append('fileAntecedentes', form.antecedentes);
    // formData.append('fileLicense_Hoja', form.license_hoja);
    console.log(formData);
  };

  const next_save = async (e) => {
    e.preventDefault();
    console.log(form, "form");
    const dataPassengers = getPassengers(form, usersBusiness);
    console.log(dataPassengers, "QUIERO VER");
    let data = {
      origin: form.origen.label,
      // origin_coordinates: { latitude: 123.223, longitude: 123441.123 },
      date: form.fecha,
      hour: form.hora,
      destination: form.destino.label,
      // destination_coordinates: {
      //   latitude: 124.223,
      //   longitude: 123421.123,
      // },

      // passengers: [
      //   {
      //     traveler: 7,
      //     in_origin: form.aborda1,
      //     origin: !form.aborda1 ? form.dir1 : null,
      //     origin_coordinates: {
      //       latitude: !form.aborda1 ? 124.223 : null,
      //       longitude: !form.aborda1 ? 123421.123 : null,
      //     },
      //   },
      // ],

      passengers: dataPassengers,
      origin_id: form.origen.id,
      destination_id: form.destino.id,
    };
    console.log(data, "DATAAAA");
    if (step === 3) {
      return swal({
        title: "¿Guardar viaje?",
        text: "Por favor, confirme si desea guardar el viaje",
        icon: "warning",
        buttons: ["NO", "SI"],
      }).then(async (response) => {
        if (response) {
          await axios
            .post(`${process.env.REACT_APP_TRIPS}/bookings/`, data)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
        }
      });
    }
    setStep(step + 1);
  };

  const back = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  useEffect(() => {
    new window.google.maps.places.Autocomplete(
      document.getElementById("origen")
    );
    new window.google.maps.places.Autocomplete(
      document.getElementById("destino")
    );
    new window.google.maps.places.Autocomplete(
      document.getElementById("aborda1")
    );
    new window.google.maps.places.Autocomplete(
      document.getElementById("aborda2")
    );
    new window.google.maps.places.Autocomplete(
      document.getElementById("aborda3")
    );
    new window.google.maps.places.Autocomplete(
      document.getElementById("aborda4")
    );
    new window.google.maps.places.Autocomplete(
      document.getElementById("aborda5")
    );
    // console.log(window, 'WINDOW')
  }, [step]);

  //   function initMap() {
  //     var input = document.getElementById('clientAddress');
  //     var autocomplete = new google.maps.places.Autocomplete(input);
  //     autocomplete.addListener('place_changed', function() {
  //         var place = autocomplete.getPlace();
  //         document.getElementById('location-snap').
  //         innerHTML = place.formatted_address;
  //         document.getElementById('lat-span').
  //         innerHTML = place.geometry.location.lat();
  //         document.getElementById('lon-span').
  //         innerHTML = place.geometry.location.lng();
  //     });
  //  }

  const modifyPassengers = (e) => {
    const { name } = e.target;
    if (name === "menos") {
      if (currentPassengers > 1) {
        switch (currentPassengers) {
          case 2:
            setForm({ ...form, persona2: "", aborda2: false, dir2: "" });
            break;
          case 3:
            setForm({ ...form, persona3: "", aborda3: false, dir3: "" });
            break;
          case 4:
            setForm({ ...form, persona4: "", aborda4: false, dir4: "" });
            break;
          default:
            break;
        }
        setCurrentPassengers(currentPassengers - 1);
      }
    } else if (name === "mas") {
      if (currentPassengers < maxPassengers)
        setCurrentPassengers(currentPassengers + 1);
    }
  };

  return (
    <Fade>
      <div>
        <div className={`${Style.containerRegister} row`}>
          <div className={Style.form}></div>
          <div className={`${Style.formComplete}`}>
            <h1
              className={`${Style.title}`}
              style={step === 3 ? { marginTop: "3.2rem" } : null}
            >
              Agendar Viaje
            </h1>
            <div
              className={`${Style.formRegister}`}
              // style={step === 3 ? { minHeight: "400px" } : null}
            >
              <div
                className={`${Style.titleForm} ${Style.add_delete_passenger}`}
              >
                <div
                  style={
                    step !== 2
                      ? {
                          visibility: "hidden",
                        }
                      : null
                  }
                >
                  <button
                    className={Style.titleEdit}
                    style={{
                      borderRadius: "50px",
                      padding: "0px 10px 4px 10px",
                    }}
                    name="menos"
                    onClick={modifyPassengers}
                  >
                    -
                  </button>
                  <button
                    className={Style.titleEdit}
                    style={{
                      borderRadius: "50px",
                      padding: "0px 8px 4px 8px",
                      marginLeft: "5px",
                    }}
                    name="mas"
                    onClick={modifyPassengers}
                  >
                    +
                  </button>
                </div>
                <div>
                  <h4
                    className={Style.titleEdit}
                    style={
                      step === 1
                        ? {
                            backgroundColor: "rgb(54, 232, 210)",
                            color: "black",
                            boxShadow: "0px 0px 3px white",
                            textDecoration: "underline",
                          }
                        : null
                    }
                  >
                    Datos del Viaje
                  </h4>
                  <h4
                    className={Style.titleEdit}
                    style={
                      step === 2
                        ? {
                            backgroundColor: "rgb(54, 232, 210)",
                            color: "black",
                            boxShadow: "0px 0px 3px white",
                            textDecoration: "underline",
                          }
                        : null
                    }
                  >
                    Personas
                  </h4>
                  <h4
                    className={Style.titleEdit}
                    style={
                      step === 3
                        ? {
                            backgroundColor: "rgb(54, 232, 210)",
                            color: "black",
                            boxShadow: "0px 0px 3px white",
                            textDecoration: "underline",
                          }
                        : null
                    }
                  >
                    Resumen
                  </h4>
                </div>
                <div></div>
              </div>

              {step === 1 ? (
                <div className={`${Style.data}`}>
                  <div className={`row`}>
                    <h4
                      className={`${Style.lblname} col-1 mt-md-2 mt-lg-2`}
                      id="nombreLabel"
                    >
                      Origen:
                    </h4>
                    <div
                      className={`mail mt-0 col-11 col-sm-11 col-md-4 col-lg-4`}
                    >
                      <SelectOrigen
                        handleChange={handleChange}
                        selectedValue={selectedValue}
                      />
                    </div>
                    {/* <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`}
                      id="origen"
                      placeholder="Ingrese una dirección"
                      type="text"
                      name="origen"
                      value={form.origen}
                      onChange={(e) => verifyAdmin(e)}
                    /> */}
                    {/* 
                    {(error.name && form.name) ||
                    (error.last_name && form.last_name) ? (
                      <div className={`row d-none d-md-block d-lg-block`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Nombre y Apellido admiten sólo letras (y espacios) sin
                          números
                        </h5>
                      </div>
                    ) : null}

                    {error.name && form.name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                    {error.last_name && form.last_name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5
                          className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}
                        >
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null} */}
                  </div>

                  <div className={`row`}>
                    <h4
                      className={`${Style.fechaNac} col-10 col-md-1 col-lg-1 mt-2 mt-md-2 mt-lg-2`}
                    >
                      Fecha:
                    </h4>
                    <form
                      className={`${classes.container} ${Style.inputFecha} mt-sm-1 col-11 col-sm-11 col-md-5 col-lg-5`}
                      noValidate
                    >
                      <TextField
                        id="date"
                        label=""
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={(e) => verifyData(e)}
                        // defaultValue="2017-05-24"
                        className={`${Style.fechaNacField} ${classes.textField}`}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </form>
                  </div>

                  <div className={`row`}>
                    <h4
                      className={`${Style.hora} col-10 col-md-1 col-lg-1 mt-md-2 mt-lg-2 text-sm-start`}
                    >
                      Hora:
                    </h4>
                    <input
                      className={`${Style.time} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `}
                      type="time"
                      name="hora"
                      value={form.hora}
                      onChange={(e) => verifyData(e)}
                    />
                  </div>

                  <div className="d-none d-md-block d-lg-block">
                    {form.phone_number && error.phone_number ? (
                      <div className={`row`}>
                        <h5 className={`${Style.alertTexts} col-3`}>
                          Sólo números
                        </h5>
                      </div>
                    ) : null}
                  </div>

                  <div className={`row`}>
                    <h4 className={`col-1 mt-md-2 mt-lg-2`}>Destino:</h4>
                    <div
                      className={`mail mt-0 col-11 col-sm-11 col-md-4 col-lg-4`}
                    >
                      <SelectDestino
                        handleChangeDestino={handleChangeDestino}
                        selectedValueDestino={selectedValueDestino}
                      />
                    </div>
                    {/* <input
                      className={`mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 mail`}
                      id="destino"
                      placeholder="Ingrese una dirección"
                      type="text"
                      name="destino"
                      onChange={(e) => verifyData(e)}
                      value={form.destino}
                    /> */}
                    {/* 
                    {error.email && form.email ? (
                      <div className={`row`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Introduza un correo válido
                        </h5>
                      </div>
                    ) : null} */}
                  </div>
                </div>
              ) : step === 2 ? (
                <div className={`${Style.data}`}>
                  <div className={`row mt-3 mt-sm-3 mt-md-1 mt-lg-1`}>
                    {usersBusiness.map((item, i) => {
                      if (i + 1 <= currentPassengers)
                        return (
                          <>
                            {i + 1 <= currentPassengers && (
                              <div
                                className={`col-11 col-sm-7 col-md-4 col-lg-4 mt-1 mt-md-1 mt-lg-1`}
                              >
                                <select
                                  className={`w-100 text-center`}
                                  name={`persona${i + 1}`}
                                  value={form[`persona${i + 1}`]}
                                  onChange={(e) => inputs(e)}
                                >
                                  <option value="-" defaultValue>
                                    Seleccionar persona
                                  </option>
                                  {usersBusiness.map((userBusiness) => (
                                    <option value={userBusiness.rut}>
                                      {`${userBusiness.name} ${userBusiness.last_name}`}
                                    </option>
                                  ))}
                                  {/* <option value={"Persona 1"}>Persona 1</option>
                        <option value={"Persona 2"}>Persona 2</option>
                        <option value={"Persona 3"}>Persona 3</option>
                        <option value={"Persona 4"}>Persona 4</option> */}
                                </select>
                              </div>
                            )}
                            <div
                              className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                            >
                              <section className="d-flex justify-content-center">
                                <input
                                  type="checkbox"
                                  name={`aborda${i + 1}`}
                                  onChange={(e) => verifyDays(e)}
                                  value={form[`aborda${i + 1}`]}
                                  checked={
                                    form[`aborda${i + 1}`] ? true : false
                                  }
                                />
                                <label style={{ marginLeft: "0.5rem" }}>
                                  Aborda en origen
                                </label>
                              </section>
                            </div>

                            <div
                              className={`mail mt-0 col-11 col-sm-11 col-md-4 col-lg-4`}
                            >
                              <SelectAborda
                                id={i}
                                handleChangeAborda={handleChangeAborda}
                                selectedValueAborda={form?.[`dir${i + 1}`]}
                              />
                            </div>
                            {/* <input
                              className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                              type="text"
                              id={`aborda${i + 1}`}
                              name={`dir${i + 1}`}
                              value={form[`dir${i + 1}`]}
                              onChange={(e) => verifyAdmin(e)}
                              placeholder="Dirección..."
                            /> */}
                          </>
                        );
                    })}

                    {/* {(error.name && form.name) ||
                    (error.last_name && form.last_name) ? (
                      <div className={`row d-none d-md-block d-lg-block`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Nombre y Apellido admiten sólo letras (y espacios) sin
                          números
                        </h5>
                      </div>
                    ) : null}

                    {error.name && form.name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                    {error.last_name && form.last_name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5
                          className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}
                        >
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null} */}
                  </div>
                  {/* <div className={`row mt-4 mt-sm-4 mt-md-1 mt-lg-1`}>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-4 mt-1 mt-md-1 mt-lg-1`}
                    >
                      <select
                        className={`w-100 text-center`}
                        name="persona2"
                        value={form.persona2}
                        onChange={(e) => inputs(e)}
                      >
                        <option value="-" defaultValue>
                          Seleccionar persona
                        </option>
                        <option value={"Persona 1"}>Persona 1</option>
                        <option value={"Persona 2"}>Persona 2</option>
                        <option value={"Persona 3"}>Persona 3</option>
                        <option value={"Persona 4"}>Persona 4</option>
                      </select>
                    </div>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                    >
                      <section className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          name="aborda2"
                          onChange={(e) => verifyDays(e)}
                          value={form.aborda2}
                          checked={form.aborda2 ? true : false}
                        />
                        <label
                          style={{ marginLeft: "0.5rem", fontStyle: "normal" }}
                        >
                          Aborda en origen
                        </label>
                      </section>
                    </div>

                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                      type="text"
                      name="dir2"
                      value={form.dir2}
                      onChange={(e) => verifyAdmin(e)}
                      placeholder="Dirección..."
                    />

                    {(error.name && form.name) ||
                    (error.last_name && form.last_name) ? (
                      <div className={`row d-none d-md-block d-lg-block`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Nombre y Apellido admiten sólo letras (y espacios) sin
                          números
                        </h5>
                      </div>
                    ) : null}

                    {error.name && form.name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                    {error.last_name && form.last_name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5
                          className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}
                        >
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                  </div>
                  <div className={`row mt-4 mt-sm-4 mt-md-1 mt-lg-1`}>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-4 mt-1 mt-md-1 mt-lg-1`}
                    >
                      <select
                        className={`w-100 text-center`}
                        name="persona3"
                        value={form.persona3}
                        onChange={(e) => inputs(e)}
                      >
                        <option value="-" defaultValue>
                          Seleccionar persona
                        </option>
                        <option value={"Persona 1"}>Persona 1</option>
                        <option value={"Persona 2"}>Persona 2</option>
                        <option value={"Persona 3"}>Persona 3</option>
                        <option value={"Persona 4"}>Persona 4</option>
                      </select>
                    </div>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                    >
                      <section className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          name="aborda3"
                          onChange={(e) => verifyDays(e)}
                          value={form.aborda3}
                          checked={form.aborda3 ? true : false}
                        />
                        <label style={{ marginLeft: "0.5rem" }}>
                          Aborda en origen
                        </label>
                      </section>
                    </div>

                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                      type="text"
                      name="dir3"
                      value={form.dir3}
                      onChange={(e) => verifyAdmin(e)}
                      placeholder="Dirección..."
                    />

                    {(error.name && form.name) ||
                    (error.last_name && form.last_name) ? (
                      <div className={`row d-none d-md-block d-lg-block`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Nombre y Apellido admiten sólo letras (y espacios) sin
                          números
                        </h5>
                      </div>
                    ) : null}

                    {error.name && form.name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                    {error.last_name && form.last_name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5
                          className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}
                        >
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                  </div>
                  <div className={`row mt-4 mt-sm-4 mt-md-1 mt-lg-1`}>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-4 mt-1 mt-md-1 mt-lg-1`}
                    >
                      <select
                        className={`w-100 text-center`}
                        name="persona4"
                        value={form.persona4}
                        onChange={(e) => inputs(e)}
                      >
                        <option value="-" defaultValue>
                          Seleccionar persona
                        </option>
                        <option value={"Persona 1"}>Persona 1</option>
                        <option value={"Persona 2"}>Persona 2</option>
                        <option value={"Persona 3"}>Persona 3</option>
                        <option value={"Persona 4"}>Persona 4</option>
                      </select>
                    </div>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                    >
                      <section className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          name="aborda4"
                          onChange={(e) => verifyDays(e)}
                          value={form.aborda4}
                          checked={form.aborda4 ? true : false}
                        />
                        <label style={{ marginLeft: "0.5rem" }}>
                          Aborda en origen
                        </label>
                      </section>
                    </div>

                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                      type="text"
                      name="dir4"
                      value={form.dir4}
                      onChange={(e) => verifyAdmin(e)}
                      placeholder="Dirección..."
                    />

                    {(error.name && form.name) ||
                    (error.last_name && form.last_name) ? (
                      <div className={`row d-none d-md-block d-lg-block`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Nombre y Apellido admiten sólo letras (y espacios) sin
                          números
                        </h5>
                      </div>
                    ) : null}

                    {error.name && form.name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                    {error.last_name && form.last_name ? (
                      <div className={`row d-block d-md-none d-lg-none`}>
                        <h5
                          className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}
                        >
                          Sólo letras (y espacios) sin números
                        </h5>
                      </div>
                    ) : null}
                  </div> */}
                </div>
              ) : (
                <>
                  <div
                    className={`${Style.misDatos} mt-4 mb-4 mb-sm-0 mb-md-0 mb-lg-0`}
                  >
                    {current === 1 && (
                      <>
                        <label className={`${Style.lbl}`}>Origen:</label>
                        <label className={`${Style.datos}`}>
                          {form.origen.label ? (
                            form.origen.label
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              (completar formulario)
                            </span>
                          )}
                        </label>

                        <label className={`${Style.lbl}`}>Fecha:</label>
                        <label className={`${Style.datos}`}>
                          {form.fecha ? (
                            form.fecha
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              (completar formulario)
                            </span>
                          )}
                        </label>

                        <label className={`${Style.lbl}`}>Destino:</label>
                        <label className={`${Style.datos}`}>
                          {form.destino.label ? (
                            form.destino.label
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              (completar formulario)
                            </span>
                          )}
                        </label>

                        <label className={`${Style.lbl}`}>Hora:</label>
                        <label className={`${Style.datos}`}>
                          {form.hora ? (
                            form.hora
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              (completar formulario)
                            </span>
                          )}
                        </label>
                      </>
                    )}
                    {current === 2 && (
                      <div className={Style.containerStep2}>
                        {usersBusiness.map((item, i) => {
                          return (
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <label className={Style.numberPassenger}>
                                {i + 1}
                              </label>
                              <label
                                className={`${Style.lbl}`}
                                style={{
                                  fontWeight: "normal",
                                  fontStyle: "italic",
                                }}
                              >
                                {form[`persona${i + 1}`]
                                  ? form[`persona${i + 1}`]
                                  : "-"}
                              </label>
                              <label className={`${Style.datos}`}>
                                {form[`persona${i + 1}`] &&
                                form[`persona${i + 1}`] !== "-"
                                  ? form[`aborda${i + 1}`]
                                    ? "Aborda en origen: SI"
                                    : "Aborda en origen: NO"
                                  : "-"}
                              </label>
                              <label
                                className={`${Style.datos}`}
                                style={{
                                  fontWeight: "normal",
                                  fontStyle: "italic",
                                }}
                              >
                                {!form[`aborda${i + 1}`] &&
                                form[`persona${i + 1}`] !== "-" &&
                                form[`dir${i + 1}`]["label"]
                                  ? form[`dir${i + 1}`]["label"]
                                  : "-"}

                                {/* {form[`persona${i + 1}`] &&
                                form[`persona${i + 1}`] !== "-" &&
                                form[`aborda${i + 1}`] &&
                                form[`dir${i + 1}`]["label"]
                                  ? form[`dir${i + 1}`]["label"]
                                  : "-"} */}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* <label className={`${Style.lbl}`}>Apellido:</label>
                  <label className={`${Style.datos}`}>{user.last_name}</label>

                  <label className={`${Style.lbl}`}>Nombre:</label>
                  <label className={`${Style.datos}`}>{user.name}</label>

                  <label className={`${Style.lbl}`}>Rut:</label>
                  <label className={`${Style.datos}`}>{user.rut}</label>

                  <label className={`${Style.lbl}`}>Fecha de Nacimiento:</label>
                  <label className={`${Style.datos}`}>{user.birth_date}</label>

                  <label className={`${Style.lbl}`}>Dirección:</label>
                  <label className={`${Style.datos}`}>{user.address}</label>

                  <label className={`${Style.lbl}`}>Celular1:</label>
                  <label className={`${Style.datos}`}>
                    {user.phone_number}
                  </label>

                  <label className={`${Style.lbl}`}>Celular2:</label>
                  <label className={`${Style.datos}`}>
                    {user.phone_number2 ? user.phone_number2 : "-"}
                  </label> */}
                  </div>

                  <div className={Style.containerPagination}>
                    <span
                      className={Style.pagePagination}
                      onClick={() => setPage("previous")}
                    >
                      {"<"}
                    </span>
                    <span
                      className={Style.pagePagination}
                      onClick={() => setCurrent(1)}
                      style={
                        current === 1 ? { color: "rgb(54, 232, 210)" } : null
                      }
                    >
                      1
                    </span>
                    <span
                      className={Style.pagePagination}
                      onClick={() => setCurrent(2)}
                      style={
                        current === 2 ? { color: "rgb(54, 232, 210" } : null
                      }
                    >
                      2
                    </span>

                    <span
                      className={Style.pagePagination}
                      onClick={() => setPage("next")}
                    >
                      {">"}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className={Style.containerSave}>
              {/* <h5 className={`${Style.habilitar}`}>
                Complete el formulario para habilitar el botón...
              </h5> */}
              <div className={`${Style.buttons} row d-flex`}>
                <div className={`col-3`}>
                  <button
                    style={
                      step === 1
                        ? { backgroundColor: "darkRed", cursor: "not-allowed" }
                        : null
                    }
                    disabled={step === 1 ? true : false}
                    className={`${Style.back}`}
                    onClick={(e) => back(e)}
                  >
                    <FaArrowAltCircleLeft className={Style.iconBack} />
                    Volver
                  </button>
                </div>
                <div className={`col-3`}>
                  <button
                    className={`${Style.save} notActive`}
                    onClick={(e) => next_save(e)}
                  >
                    {step === 3 ? "Guardar" : "Siguiente"}
                  </button>
                </div>
                {/* <div className={`col-3`}>
                                <button className={`${Style.save} notActive`} onClick={()=>insertFiles()}>PROBANDO</button>
                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
