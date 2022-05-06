import { useState, useEffect } from "react";
import Style from "./UsuariosEmpresasNuevo.module.css";
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

export default function UsuariosEmpresasNuevo() {
  let history = useHistory();

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
    rut: "",
    name: "",
    last_name: "",
    address: "",
    birth_date: "",
    phone_number: "",
    phone_number2: "",
    email: "",
  });

  let [error, setError] = useState({
    rut: "Error",
    name: "Error",
    last_name: "Error",
    address: "Error",
    birth_date: "Error",
    phone_number: "Error",
    phone_number2: "Error",
    email: "Error",
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
  };

  const verifyData = (e) => {
    let value = e.target.value;
    let name = e.target.name;

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

  };

  const verifyCel = (e) => {
    let number = e.target.value;
    let name = e.target.name;

    if (/^\d*$/.test(number) && number.length > 8) {
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

  const save = async (e) => {
    e.preventDefault();
    console.log(form);

    if (
      form.rut &&
      form.name &&
      form.last_name &&
      form.address &&
      form.birth_date &&
      form.phone_number &&
      form.email &&
      !error.rut &&
      !error.name &&
      !error.last_name &&
      !error.address &&
      !error.birth_date &&
      !error.phone_number &&
      !error.email
    ) {
      await swal({
        title: "¿Continuar?",
        text: "¿Confirmar registro de usuario?",
        icon: "warning",
        buttons: ["NO", "SI"],
      }).then((response) => {
        if (response) {
          axios
            .post(`${process.env.REACT_APP_BACKEND}/companiers/users/`, form)
            .then(async (response) => {
              if (response) {
                await swal({
                  title: "Operación exitosa!",
                  text: "El usuario fue registrado correctamente",
                  icon: "success",
                  buttons: ["", "OK"],
                });
                history.push("/back_office_empresas/usuarios");
              }
            })
            .catch((error) => {
              swal({
                title: "Error!",
                text: "No se pudo crear el usuario, por favor intentelo nuevamente mas tarde!",
                icon: "warning",
                buttons: ["", "OK"],
              });
              history.push("/back_office_empresas/usuarios");
            });
        }
      });
    } else {
      await swal({
        title: "Advertencia!",
        text: "Por favor complete los campos obligatorios antes de guardar",
        icon: "warning",
      });
      document.getElementById("nombreLabel").focus();
    }
  };

  const back = (e) => {
    e.preventDefault();
    history.push("/back_office_empresas/usuarios");
  };

  return (
    <Fade>
      <div>
        <div className={`${Style.containerRegister} row`}>
          <div className={Style.form}></div>
          <div className={`${Style.formComplete}`}>
            <h1 className={`${Style.title} mt-4`}>Nuevo Usuario</h1>
            <div className={Style.formRegister}>
              <div className={Style.titleForm}>
                <h4 className={Style.titleEdit}>Completar formulario</h4>
                {/* <h5>Tu usuario es tu mail</h5> */}
              </div>

              <div className={`${Style.data}`}>
                <div className={`row`}>
                  <h4 className={`col-12 col-md-3 col-lg-1`}>Rut (*)</h4>
                  <input
                    autoFocus
                    className={`mail col-4 col-sm-3 col-md-3 col-lg-3 text-center mt-1 mt-md-0 mt-lg-0`}
                    type="text"
                    name="rut1"
                    id="rut1"
                    onChange={(e) => verifyRut(e)}
                  />
                  &nbsp;&nbsp;&nbsp;-
                  <input
                    className={`mail col-1 col-sm-1 col-md-1 col-lg-1 text-center mt-1 mt-md-0 mt-lg-0`}
                    type="text"
                    name="rut2"
                    id="rut2"
                    onChange={(e) => verifyRut(e)}
                    maxLength="1"
                  />
                  {error.rut && form.rut ? (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        El formato permitido es 0000000-0 / 0000000-K
                      </h5>
                    </div>
                  ) : null}
                </div>
                <div className={`row`}>
                  <h4
                    className={`${Style.lblname} col-1 mt-md-2 mt-lg-2`}
                    id="nombreLabel"
                  >
                    Nombre
                  </h4>
                  <input
                    className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => verifyAdmin(e)}
                  />
                  <h4
                    className={`${Style.lbl_last_name} col-1 mt-md-2 mt-lg-2`}
                    id="nombreLabel"
                  >
                    Apellido
                  </h4>
                  <input
                    className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-5 col-lg-5`}
                    type="text"
                    name="last_name"
                    value={form.last_name}
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
                  {error.last_name && form.last_name ? (
                    <div className={`row d-block d-md-none d-lg-none`}>
                      <h5
                        className={`${Style.alertTexts} col-12 col-md-6 col-lg-6`}
                      >
                        Sólo letras (y espacios) sin números
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
                  <h4 className={`${Style.lblDireccion} col-1 mt-md-2 mt-lg-2`}>
                    Dirección
                  </h4>
                  <input
                    className={`${Style.inpDireccion} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `}
                    type="text"
                    name="address"
                    onChange={(e) => verifyData(e)}
                    value={form.address}
                  />
                  <h4
                    className={`${Style.fechaNac} col-10 col-md-3 col-lg-3 mt-2 mt-md-2 mt-lg-2`}
                  >
                    Fecha de Nacimiento
                  </h4>
                  <form
                    className={`${classes.container} ${Style.inputFecha} mt-sm-1 p-0 p-sm-0 col-11 col-sm-11 col-md-3 col-lg-3`}
                    noValidate
                  >
                    <TextField
                      id="date"
                      label=""
                      type="date"
                      name="birth_date"
                      value={form.birth_date}
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
                    className={`${Style.lbl_cel1} col-1 mt-md-2 mt-lg-2 text-sm-start`}
                  >
                    Celular1
                  </h4>
                  <input
                    className={`${Style.inpt_cel1} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `}
                    type="text"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={(e) => verifyCel(e)}
                    minLength="9"
                  />
                  <h4
                    className={`${Style.lbl_cel2} col-1 mt-md-2 mt-lg-2 text-sm-start`}
                  >
                    Celular2
                  </h4>
                  <input
                    className={`${Style.inpt_cel2} mt-1 mt-sm-1 col-11 col-sm-11 col-md-5 col-lg-5 repeatMail `}
                    type="text"
                    name="phone_number2"
                    value={form.phone_number2}
                    onChange={(e) => verifyCel2(e)}
                  />
                </div>

                <div className="d-none d-md-block d-lg-block">
                  {form.phone_number && error.phone_number ? (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-3`}>
                        Sólo números (mínimo 9 dígitos)
                      </h5>
                    </div>
                  ) : null}
                  {/* {form.phone_number2 && error.phone_number2 ? (
                    <div className={`row justify-content-center`}>
                      <h5 className={`${Style.alertTexts} col-3 text-center`}>
                        Sólo números
                      </h5>
                    </div>
                  ) : null} */}
                </div>

                <div className={`row`}>
                  <h4 className={`col-1 mt-md-2 mt-lg-2`}>Email</h4>
                  <input
                    className={`mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 mail`}
                    type="text"
                    name="email"
                    onChange={(e) => verifyMail(e)}
                    value={form.email}
                  />
                  {/* <h4 className={`${Style.clave} col-2 mt-2 mt-md-2 mt-lg-2`}>
                    Nacionalidad
                  </h4>
                  <input
                    className={`${Style.claveInp} col-11 col-sm-11 col-md-4 col-lg-4 mt-1 fmt-md-1 mt-lg-1`}
                    type="text"
                    name="nationality"
                    onChange={(e) => verifyAdmin(e)}
                    value={form.nationality}
                  /> */}
                  {error.email && form.email ? (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        Introduza un correo válido
                      </h5>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={Style.containerSave}>
              <h5 className={`${Style.habilitar}`}>
                Complete el formulario para habilitar el botón...
              </h5>
              <div className={`${Style.buttons} row`}>
                <div className={`col-3`}>
                  <button className={`${Style.back}`} onClick={(e) => back(e)}>
                    <FaArrowAltCircleLeft className={Style.iconBack} />
                    Volver
                  </button>
                </div>
                <div className={`col-3`}>
                  <button
                    className={`${Style.save} notActive`}
                    onClick={(e) => save(e)}
                  >
                    Guardar
                  </button>
                </div>
                {/* <div className={`col-3`}>
                                <button className={`${Style.save} notActive`} onClick={()=>insertFiles()}>PROBANDO</button>
                            </div> */}
              </div>
            </div>
          </div>
          {/* <div className={`${Style.formComplete}`}>
                    <h1 className={`${Style.title}`}>Múevete con Evann</h1>
                    <div className={Style.contentDescription}>
                        <span className={Style.description}>Súmate al servicio de transporte de personas con el standard más alto del país. Regístra tus datos e ingresa tus automóviles y conductores para que seas parte de nuestro selectro grupo
                        </span>                        
                            <a href="" className={Style.linkRegister}><Link to="/asociados/register">REGÍSTRATE</Link></a>                        
                        <span className={Style.here}>Si ya te registraste, ingresá <a href="#">Aquí</a></span>
                    </div>
                    <div className={Style.info}>
                        <div className={Style.box}>
                            <h3>Más ingresos</h3>
                            <p className={Style.textBox}>Gana mas conduciento con nuestra frecuencia de viajes y recibe los mejores beneficios por tu servicio.</p>    
                        </div>
                        <div className={Style.box}>
                            <h3>Nuestra App</h3>
                            <p className={Style.textBox}>Se tu propio jefe, tendrás siempre información actualizada respecto de tus viajes, tarifas trayectos, etc.</p>    
                        </div>
                        <div className={Style.box}>
                            <h3>Pasajeros Vip</h3>
                            <p className={Style.textBox}>Conduce para los más exigentes y exclusivos pasajeros y empresas de nuestro país.</p>
                        </div>
                    </div>            
                                   
                </div>                     */}
        </div>
      </div>
    </Fade>
  );
}
