import { useState, useEffect } from "react";
import Style from "./ConveniosNuevo.module.css";
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

export default function NewConductor() {
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    company_name: "",
    company_rut1: "",
    company_rut2: "",
    company_rut: "",
    company_businessName: "",
    company_legal_r_name: "",
    company_legal_r_rut1: "",
    company_legal_r_rut2: "",
    company_legal_r_rut: "",
    company_address: "",
    company_dia: "",
    company_metodo: "",
    user_rut1: "",
    user_rut2: "",
    user_rut: "",
    user_name: "",
    user_lastName: "",
    user_address: "",
    user_birthday: "",
    user_phoneOne: "",
    user_phoneTwo: "",
    user_email: "",
    convenio_inicio: "",
    convenio_fin: "",
  });

  let [error, setError] = useState({
    company_name: "Error",
    company_rut1: "Error",
    company_rut2: "Error",
    company_rut: "Error",
    company_businessName: "Error",
    company_legal_r_name: "Error",
    company_legal_r_rut1: "Error",
    company_legal_r_rut2: "Error",
    company_legal_r_rut: "Error",
    company_address: "Error",
    company_dia: "Error",
    company_metodo: "Error",
    user_rut1: "Error",
    user_rut2: "Error",
    user_rut: "Error",
    user_name: "Error",
    user_lastName: "Error",
    user_address: "Error",
    user_birthday: "Error",
    user_phoneOne: "Error",
    user_phoneTwo: "Error",
    user_email: "Error",
    convenio_inicio: "Error",
    convenio_fin: "Error",
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

    if (
      ((name.includes("company_dia") || name.includes("company_metodo")) &&
        value === "-") ||
      value === ""
    ) {
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
    let rut1 = document.getElementById("company_rut1").value;
    let rut2 = document.getElementById("company_rut2").value;

    if (name === "company_rut1") {
      if (
        /^\d*$/.test(rut1) &&
        parseInt(rut1) >= 6000000 &&
        parseInt(rut1) <= 99000000
      ) {
        setError({ ...error, company_rut: "" });
      } else {
        setError({ ...error, company_rut: "Error" });
      }
    }

    if (name === "company_rut2") {
      if (/^\d*$/.test(parseInt(rut2)) || rut2.toUpperCase() === "K") {
        setError({ ...error, company_rut: "" });
      } else {
        setError({ ...error, company_rut: "Error" });
      }
    }

    if (!rut1 && !rut2) {
      setError({ ...error, company_rut: "" });
    } else if (!rut1 || !rut2) {
      setError({ ...error, company_rut: "Error" });
    }

    let rutComplete = `${rut1}-${rut2}`;

    setForm({ ...form, company_rut: rutComplete });
    // console.log(error, 'error');
    // console.log(form, 'form');
  };

  const verifyRut2 = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let rut1 = document.getElementById("company_legal_r_rut1").value;
    let rut2 = document.getElementById("company_legal_r_rut2").value;

    if (name === "company_legal_r_rut1") {
      if (
        /^\d*$/.test(rut1) &&
        parseInt(rut1) >= 6000000 &&
        parseInt(rut1) <= 99000000
      ) {
        setError({ ...error, company_legal_r_rut: "" });
      } else {
        setError({ ...error, company_legal_r_rut: "Error" });
      }
    }

    if (name === "company_legal_r_rut2") {
      if (/^\d*$/.test(parseInt(rut2)) || rut2.toUpperCase() === "K") {
        setError({ ...error, company_legal_r_rut: "" });
      } else {
        setError({ ...error, company_legal_r_rut: "Error" });
      }
    }

    if (!rut1 && !rut2) {
      setError({ ...error, company_legal_r_rut: "" });
    } else if (!rut1 || !rut2) {
      setError({ ...error, company_legal_r_rut: "Error" });
    }

    let rutComplete = `${rut1}-${rut2}`;

    setForm({ ...form, company_legal_r_rut: rutComplete });
    // console.log(error, 'error');
    // console.log(form, 'form');
  };

  const verifyRut3 = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let rut1 = document.getElementById("user_rut1").value;
    let rut2 = document.getElementById("user_rut2").value;

    if (name === "user_rut1") {
      if (
        /^\d*$/.test(rut1) &&
        parseInt(rut1) >= 6000000 &&
        parseInt(rut1) <= 99000000
      ) {
        setError({ ...error, user_rut: "" });
      } else {
        setError({ ...error, user_rut: "Error" });
      }
    }

    if (name === "user_rut2") {
      if (/^\d*$/.test(parseInt(rut2)) || rut2.toUpperCase() === "K") {
        setError({ ...error, user_rut: "" });
      } else {
        setError({ ...error, user_rut: "Error" });
      }
    }

    if (!rut1 && !rut2) {
      setError({ ...error, user_rut: "" });
    } else if (!rut1 || !rut2) {
      setError({ ...error, user_rut: "Error" });
    }

    let rutComplete = `${rut1}-${rut2}`;

    setForm({ ...form, user_rut: rutComplete });
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

  let user_mail;

  const verifyMail = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    user_mail = document.querySelector(".user_email");
    console.log(user_mail);
    console.log(value);
    // inputRepeatPass = document.querySelector('.repeatPass');

    // let repeat = document.querySelector('.repeatMail');
    // let repeat2 = document.querySelector('.repeatPass');

    user_mail.onpaste = (e) => {
      e.preventDefault();
      swal({
        title: "Acción inválida!",
        text: "Por favor coloque su correo manualmente",
        icon: "warning",
      });
    };

    // ================ PROCESO EMAIL, REPEAT EMAIL =====================
    if (name === "user_email") {
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

  const save = async (e) => {
    e.preventDefault();

    let data = {
      company_data: {
        name: form.company_name,
        rut: form.company_rut,
        business_name: form.company_businessName,
        legal_representative_name: form.company_legal_r_name,
        legal_representative_rut: form.company_legal_r_rut,
        address: form.company_address,
        payment_day: form.company_dia,
        payment_method: form.company_metodo,
      },
      user_data: {
        rut: form.user_rut,
        name: form.user_name,
        last_name: form.user_lastName,
        address: form.user_address,
        birth_date: form.user_birthday,
        phone_number: form.user_phoneOne,
        phone_number2: form.user_phoneTwo,
        email: form.user_email,
      },
      agreement: {
        convenio_inicio: form.convenio_inicio,
        convenio_fin: form.convenio_fin,
      },
    };

    console.log(error, "ERRROR");
    console.log(form, "FORM");
    console.log(data, "DATA CONVENIO");

    if (
      form.company_name &&
      form.company_rut &&
      form.company_businessName &&
      form.company_legal_r_name &&
      form.company_legal_r_rut &&
      form.company_address &&
      form.company_dia !== "-" &&
      form.company_metodo !== "-" &&
      form.user_rut &&
      form.user_name &&
      form.user_lastName &&
      form.user_address &&
      form.user_birthday &&
      form.user_phoneOne &&
      form.user_phoneTwo &&
      form.user_email &&
      form.convenio_inicio &&
      form.convenio_fin &&
      !error.company_name &&
      !error.company_rut &&
      !error.company_businessName &&
      !error.company_legal_r_name &&
      !error.company_legal_r_rut &&
      !error.company_address &&
      !error.company_dia !== "-" &&
      !error.company_metodo !== "-" &&
      !error.user_rut &&
      !error.user_name &&
      !error.user_lastName &&
      !error.user_address &&
      !error.user_birthday &&
      !error.user_phoneOne &&
      !error.user_phoneTwo &&
      !error.user_email &&
      !error.convenio_inicio &&
      !error.convenio_fin
    ) {
      await swal({
        title: "¿Continuar?",
        text: "¿Confirmar registro de convenio?",
        icon: "warning",
        buttons: ["NO", "SI"],
      }).then((response) => {
        if (response) {
          axios
            .post(`${process.env.REACT_APP_BACKEND}/companies/`, data)
            .then(async (response) => {
              if (response) {
                await swal({
                  title: "Operación exitosa!",
                  text: "El convenio fue registrado correctamente",
                  icon: "success",
                  buttons: ["", "OK"],
                });
                history.push("/back_office_administracion/convenios");
              }
            })
            .catch((error) => {
              swal({
                title: "Error!",
                text: "No se pudo crear el convenio, por favor intentelo nuevamente mas tarde!",
                icon: "warning",
                buttons: ["", "OK"],
              });
              history.push("/back_office_administracion/convenios");
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
    history.push("/back_office_administracion/convenios");
  };

  return (
    <Fade>
      <div>
        <div className={`${Style.containerNuevoConvenio} row`}>
          <div className={Style.form}></div>
          <div className={`${Style.formComplete}`}>
            <h1 className={`${Style.title} mt-4`}>Nuevo Convenio</h1>
            <div className={Style.formRegister}>
              <div className={Style.titleForm}>
                <h4 className={Style.titleEdit}>Completar formulario</h4>
                <h5>Tu usuario es tu mail</h5>
              </div>

              <div className={`${Style.data}`}>
                <div className={`row`}>
                  <h3
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      textAlign: "center",
                    }}
                    className={`${Style.lblname} col-12 mt-md-2 mt-lg-2`}
                    id="nombreLabel"
                  >
                    DATOS DE LA EMPRESA
                  </h3>
                </div>
                <div className={`row`}>
                  <h4
                    className={`${Style.lblname} col-12 mt-md-2 mt-lg-2`}
                    id="nombreLabel"
                  >
                    Nombre de Fantasía (*)
                  </h4>
                  <input
                    className={`col-11 mt-1`}
                    type="text"
                    name="company_name"
                    value={form.company_name}
                    onChange={(e) => verifyAdmin(e)}
                  />
                  {error.company_name && form.company_name && (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        Sólo letras (y espacios) sin números
                      </h5>
                    </div>
                  )}
                </div>
                <div className={`row`}>
                  <h4 className={`col-12`}>Rut (*)</h4>
                  <input
                    autoFocus
                    className={`mail col-4 text-center mt-1`}
                    type="text"
                    name="company_rut1"
                    id="company_rut1"
                    onChange={(e) => verifyRut(e)}
                  />
                  &nbsp;&nbsp;&nbsp;-
                  <input
                    className={`mail col-1 text-center mt-1`}
                    type="text"
                    name="company_rut2"
                    id="company_rut2"
                    onChange={(e) => verifyRut(e)}
                    maxLength="1"
                  />
                  {error.company_rut && form.company_rut ? (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        El formato permitido es 0000000-0 / 0000000-K
                      </h5>
                    </div>
                  ) : null}
                </div>

                <div className={`row`}>
                  <h4
                    className={`${Style.lblname} col-11 mt-md-1 mt-lg-1`}
                    id="nombreLabel"
                  >
                    Nombre de Empresa (*)
                  </h4>
                  <input
                    className={`mail mt-1 col-11`}
                    type="text"
                    name="company_businessName"
                    value={form.company_businessName}
                    onChange={(e) => verifyAdmin(e)}
                  />
                  {error.company_businessName && form.company_businessName && (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        Sólo letras (y espacios) sin números
                      </h5>
                    </div>
                  )}
                </div>
                <div className={`row`}>
                  <h4
                    className={`${Style.lblname} col-11 mt-1`}
                    id="nombreLabel"
                  >
                    Nombre Representante Legal (*)
                  </h4>
                  <input
                    className={`mail mt-1 col-11`}
                    type="text"
                    name="company_legal_r_name"
                    value={form.company_legal_r_name}
                    onChange={(e) => verifyAdmin(e)}
                  />
                  {error.company_legal_r_name && form.company_legal_r_name && (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        Sólo letras (y espacios) sin números
                      </h5>
                    </div>
                  )}
                </div>
                <div className={`row`}>
                  <h4 className={`col-12`}>Rut (*)</h4>
                  <input
                    autoFocus
                    className={`mail col-4 text-center mt-1`}
                    type="text"
                    name="company_legal_r_rut1"
                    id="company_legal_r_rut1"
                    onChange={(e) => verifyRut2(e)}
                  />
                  &nbsp;&nbsp;&nbsp;-
                  <input
                    className={`mail col-1 text-center mt-1`}
                    type="text"
                    name="company_legal_r_rut2"
                    id="company_legal_r_rut2"
                    onChange={(e) => verifyRut2(e)}
                    maxLength="1"
                  />
                  {error.company_legal_r_rut && form.company_legal_r_rut ? (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        El formato permitido es 0000000-0 / 0000000-K
                      </h5>
                    </div>
                  ) : null}
                </div>

                <div className={`row`}>
                  <h4 className={`${Style.lblDireccion} col-11 mt-1`}>
                    Dirección (*)
                  </h4>
                  <input
                    className={`${Style.inpDireccion} mt-1 col-11 repeatMail `}
                    type="text"
                    name="company_address"
                    onChange={(e) => verifyData(e)}
                    value={form.company_address}
                  />
                  {/* <h4
                    className={`${Style.fechaNac} col-10 col-md-3 col-lg-3 mt-2 mt-md-2 mt-lg-2`}
                  ></h4> */}
                </div>

                <div className={`row`}>
                  <h4 className={`col-11 mt-1`}>Plazo de pago (*)</h4>
                  <div className={`col-5 mt-1`}>
                    <select
                      className={`w-100`}
                      name="company_dia"
                      value={form.company_dia}
                      onChange={(e) => inputs(e)}
                    >
                      <option value="-" defaultValue>
                        -
                      </option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                    </select>
                  </div>
                </div>

                {/* <div className={`row`}>
                  <h4 className={`col-12 mt-1`}>Método de pago (*)</h4>
                  <div className={`col-5 mt-1`}>
                    <select
                      className={`w-100`}
                      name="company_metodo"
                      value={form.company_metodo}
                      onChange={(e) => inputs(e)}
                    >
                      <option value="-" defaultValue>
                        -
                      </option>
                      <option value="1">1</option>
                    </select>
                  </div>
                </div> */}

                <div className={`row`}>
                  <h3
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      textAlign: "center",
                    }}
                    className={`${Style.lblname} col-12 mt-md-2 mt-lg-2`}
                    id="nombreLabel"
                  >
                    DATOS DEL USUARIO
                  </h3>
                </div>
                <div className={`row`}>
                  <h4 className={`col-12`}>Rut (*)</h4>
                  <input
                    autoFocus
                    className={`mail col-4 text-center mt-1`}
                    type="text"
                    name="user_rut1"
                    id="user_rut1"
                    onChange={(e) => verifyRut3(e)}
                  />
                  &nbsp;&nbsp;&nbsp;-
                  <input
                    className={`mail col-1 text-center mt-1`}
                    type="text"
                    name="user_rut2"
                    id="user_rut2"
                    onChange={(e) => verifyRut3(e)}
                    maxLength="1"
                  />
                  {error.user_rut && form.user_rut ? (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        El formato permitido es 0000000-0 / 0000000-K
                      </h5>
                    </div>
                  ) : null}
                </div>

                <div className={`row`}>
                  <h4
                    className={`${Style.lblname} col-12 mt-1`}
                    id="nombreLabel"
                  >
                    Nombre: (*)
                  </h4>
                  <input
                    className={`mail mt-1 col-11`}
                    type="text"
                    name="user_name"
                    value={form.user_name}
                    onChange={(e) => verifyAdmin(e)}
                  />
                  {error.user_name && form.user_name && (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        Sólo letras (y espacios) sin números
                      </h5>
                    </div>
                  )}
                </div>

                <div className={`row`}>
                  <h4
                    className={`${Style.lblname} col-11 mt-1`}
                    id="nombreLabel"
                  >
                    Apellido: (*)
                  </h4>
                  <input
                    className={`mail col-11 mt-1`}
                    type="text"
                    name="user_lastName"
                    value={form.user_lastName}
                    onChange={(e) => verifyAdmin(e)}
                  />
                  {error.user_lastName && form.user_lastName && (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        Sólo letras (y espacios) sin números
                      </h5>
                    </div>
                  )}
                </div>

                <div className={`row`}>
                  <h4 className={`${Style.lblDireccion} col-12 mt-1`}>
                    Dirección (*)
                  </h4>
                  <input
                    className={`${Style.inpDireccion} mt-1 col-11 repeatMail `}
                    type="text"
                    name="user_address"
                    onChange={(e) => verifyData(e)}
                    value={form.user_address}
                  />
                  <h4 className={`${Style.fechaNac} col-12 mt-2`}>
                    Fecha de Nacimiento: (*)
                  </h4>
                  <form
                    className={`${classes.container} ${Style.inputFecha} mt-2 p-0 p-sm-0 col-3`}
                    noValidate
                  >
                    <TextField
                      id="date"
                      label=""
                      type="date"
                      name="user_birthday"
                      value={form.user_birthday}
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
                  <h4 className={`${Style.lbl_cel1} col-11 mt-1 text-sm-start`}>
                    Celular1 (*)
                  </h4>
                  <input
                    className={`${Style.inpt_cel1} mt-1 col-5 repeatMail `}
                    type="text"
                    name="user_phoneOne"
                    value={form.user_phoneOne}
                    onChange={(e) => verifyCel(e)}
                  />
                  {error.user_phoneOne && form.user_phoneOne && (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-11`}>
                        Sólo números
                      </h5>
                    </div>
                  )}
                  <h4 className={`${Style.lbl_cel2} col-11 mt-1 text-sm-start`}>
                    Celular2
                  </h4>
                  <input
                    className={`${Style.inpt_cel2} mt-1 col-5 repeatMail `}
                    type="text"
                    name="user_phoneTwo"
                    value={form.user_phoneTwo}
                    onChange={(e) => verifyCel2(e)}
                  />
                  {error.user_phoneTwo && form.user_phoneTwo && (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-11`}>
                        Sólo números
                      </h5>
                    </div>
                  )}
                </div>

                <div className={`row`}>
                  <h4 className={`col-11`}>Email (*)</h4>
                  <input
                    className={`user_email col-11 mt-1`}
                    type="text"
                    name="user_email"
                    value={form.user_email}
                    onChange={(e) => verifyMail(e)}
                  />
                  {error.user_email && form.user_email ? (
                    <div className={`row`}>
                      <h5 className={`${Style.alertTexts} col-6`}>
                        Introduza un correo válido
                      </h5>
                    </div>
                  ) : null}
                </div>

                <div className={`row`}>
                  <h3
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      textAlign: "center",
                    }}
                    className={`${Style.lblname} col-12 mt-md-2 mt-lg-2`}
                    id="nombreLabel"
                  >
                    DATOS DEL CONVENIO
                  </h3>
                </div>

                <div className="row">
                  <h4 className={`${Style.fechaNac} col-12 mt-2`}>
                    Fecha de Inicio: (*)
                  </h4>
                  <form
                    className={`${classes.container} ${Style.inputFecha} mt-2 p-0 p-sm-0 col-3`}
                    noValidate
                  >
                    <TextField
                      id="date"
                      label=""
                      type="date"
                      name="convenio_inicio"
                      value={form.convenio_inicio}
                      onChange={(e) => verifyData(e)}
                      // defaultValue="2017-05-24"
                      className={`${Style.fechaNacField} ${classes.textField}`}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </div>

                <div className="row">
                  <h4 className={`${Style.fechaNac} col-12 mt-2`}>
                    Fecha de Vigencia: (*)
                  </h4>
                  <form
                    className={`${classes.container} ${Style.inputFecha} mt-2 p-0 p-sm-0 col-3`}
                    noValidate
                  >
                    <TextField
                      id="date"
                      label=""
                      type="date"
                      name="convenio_fin"
                      value={form.convenio_fin}
                      onChange={(e) => verifyData(e)}
                      // defaultValue="2017-05-24"
                      className={`${Style.fechaNacField} ${classes.textField}`}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
