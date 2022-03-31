import { useState, useEffect } from "react";
import Style from "./ViajesEmpresas.module.css";
import register from "../../img/register.jpg";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import LightSpeed from "react-reveal/LightSpeed";
import Reveal from "react-reveal/Reveal";
import axios from "axios";

export default function ViajesEmpresas() {
  const history = useHistory();
  const [step, setStep] = useState(1);

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
  });

  let [error, setError] = useState({
    origen: "Error",
    fecha: "Error",
    hora: "Error",
    destino: "Error",
  });

  const clear = (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");

    setForm({
      rut: "",
      name: "",
      last_name: "",
      address: "",
      birth_date: "",
      phone_number: "",
      phone_number2: "",
      email: "",
      nationality: "",
      inter_travels: "-",
      license_number: "",
      foto: "",
      carnet: "",
      licencia: "",
      antecedentes: "",
      license_hoja: "",
      license_due_date: "",
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });

    setError({
      rut: "",
      name: "",
      last_name: "",
      address: "",
      birth_date: "",
      phone_number: "",
      phone_number2: "",
      email: "",
      nationality: "",
      inter_travels: "",
      license_number: "",
      foto: "",
      carnet: "",
      licencia: "",
      antecedentes: "",
      license_hoja: "",
      license_due_date: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    });

    inputs[0].focus();
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
  };

  const verifyDays = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm({
      ...form,
      [name]: form[name] ? false : true,
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

  const verifyCel2 = (e) => {
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
    console.log(form, "form");
    console.log(error, "error");
  };

  const uploadFiles = (e) => {
    let name = e.target.name;
    let file = e.target.files[0];

    if (!file) {
      setError({ ...error, [name]: "Error" });
    } else {
      setError({ ...error, [name]: "" });
    }

    setForm({ ...form, [name]: file });
  };

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
    setStep(step + 1);
  };

  const back = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  return (
    <Fade>
      <div>
        <div className={`${Style.containerRegister} row`}>
          <div className={Style.form}></div>
          <div className={`${Style.formComplete}`}>
            <h1 className={`${Style.title}`}>Agendar Viaje</h1>
            <div className={Style.formRegister}>
              <div className={Style.titleForm}>
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
                          textDecoration: "underline",
                        }
                      : null
                  }
                >
                  Resumen
                </h4>
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
                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`}
                      type="text"
                      name="origen"
                      value={form.origen}
                      onChange={(e) => verifyAdmin(e)}
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
                      onChange={(e) => verifyCel(e)}
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
                    <input
                      className={`mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 mail`}
                      type="text"
                      name="destino"
                      onChange={(e) => verifyMail(e)}
                      value={form.destino}
                    />

                    {error.email && form.email ? (
                      <div className={`row`}>
                        <h5 className={`${Style.alertTexts} col-6`}>
                          Introduza un correo válido
                        </h5>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : step === 2 ? (
                <div className={`${Style.data}`}>
                  <div className={`row mt-3 mt-sm-3 mt-md-1 mt-lg-1`}>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-4 mt-1 mt-md-1 mt-lg-1`}
                    >
                      <select
                        className={`w-100 text-center`}
                        name="inter_travels"
                        value={form.inter_travels}
                        onChange={(e) => inputs(e)}
                      >
                        <option value="-" defaultValue>
                          Seleccionar persona
                        </option>
                        <option value={true}>Persona 1</option>
                        <option value={false}>Persona 2</option>
                      </select>
                    </div>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                    >
                      <section className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          name="monday"
                          onChange={(e) => verifyDays(e)}
                          value={form.monday}
                        />
                        <label style={{ marginLeft: "0.5rem" }}>
                          Aborda en origen
                        </label>
                      </section>
                    </div>

                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                      type="text"
                      name="origen"
                      value={form.origen}
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
                        name="inter_travels"
                        value={form.inter_travels}
                        onChange={(e) => inputs(e)}
                      >
                        <option value="-" defaultValue>
                          Seleccionar persona
                        </option>
                        <option value={true}>Persona 1</option>
                        <option value={false}>Persona 2</option>
                      </select>
                    </div>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                    >
                      <section className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          name="monday"
                          onChange={(e) => verifyDays(e)}
                          value={form.monday}
                        />
                        <label style={{ marginLeft: "0.5rem" }}>
                          Aborda en origen
                        </label>
                      </section>
                    </div>

                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                      type="text"
                      name="origen"
                      value={form.origen}
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
                        name="inter_travels"
                        value={form.inter_travels}
                        onChange={(e) => inputs(e)}
                      >
                        <option value="-" defaultValue>
                          Seleccionar persona
                        </option>
                        <option value={true}>Persona 1</option>
                        <option value={false}>Persona 2</option>
                      </select>
                    </div>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                    >
                      <section className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          name="monday"
                          onChange={(e) => verifyDays(e)}
                          value={form.monday}
                        />
                        <label style={{ marginLeft: "0.5rem" }}>
                          Aborda en origen
                        </label>
                      </section>
                    </div>

                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                      type="text"
                      name="origen"
                      value={form.origen}
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
                        name="inter_travels"
                        value={form.inter_travels}
                        onChange={(e) => inputs(e)}
                      >
                        <option value="-" defaultValue>
                          Seleccionar persona
                        </option>
                        <option value={true}>Persona 1</option>
                        <option value={false}>Persona 2</option>
                      </select>
                    </div>
                    <div
                      className={`col-11 col-sm-7 col-md-4 col-lg-3 mt-1 mt-md-1 mt-lg-1 text-center`}
                    >
                      <section className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          name="monday"
                          onChange={(e) => verifyDays(e)}
                          value={form.monday}
                        />
                        <label style={{ marginLeft: "0.5rem" }}>
                          Aborda en origen
                        </label>
                      </section>
                    </div>

                    <input
                      className={`mail mt-1 mt-sm-1 col-11 col-sm-7 col-md-3 col-lg-3`}
                      type="text"
                      name="origen"
                      value={form.origen}
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
                </div>
              ) : (
                <h1>step3</h1>
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
