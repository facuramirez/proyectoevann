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

  let [error, setError] = useState({
    rut: "Error",
    name: "Error",
    last_name: "Error",
    address: "Error",
    birth_date: "Error",
    phone_number: "Error",
    phone_number2: "Error",
    email: "Error",
    nationality: "Error",
    inter_travels: "Error",
    license_number: "Error",
    foto: "Error",
    carnet: "Error",
    licencia: "Error",
    antecedentes: "Error",
    license_hoja: "Error",
    license_due_date: "Error",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
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

  const save = async (e) => {
    e.preventDefault();
    // console.log(form, "FORM");
    // console.log(error, "ERROR");

    // formData.append("user_data['rut']", form.rut);
    // formData.append("user_data['name']", form.name);
    // formData.append("user_data['last_name']", form.last_name);
    // formData.append("user_data['address']", form.address);
    // formData.append("user_data['birth_date']", form.birth_date);
    // formData.append("user_data['phone_number']", form.phone_number);
    // formData.append("user_data['phone_number2']", form.phone_number2);
    // formData.append("user_data['email']", form.email);

    // formData.append("driver_data['nationality']", form.nationality);
    // formData.append("driver_data['inter_travels']", form.inter_travels);
    // formData.append("driver_data['license_number']", form.license_number);

    // formData.append("files['foto']", form.foto);
    // formData.append("files['carnet']", form.carnet);
    // formData.append("files['licencia']", form.licencia);
    // formData.append("files['antecedentes']", form.antecedentes);
    // formData.append("files['license_hoja']", form.license_hoja);

    // formData.append("work_days['monday']", form.monday);
    // formData.append("work_days['tuesday']", form.tuesday);
    // formData.append("work_days['wednesday']", form.wednesday);
    // formData.append("work_days['thursday']", form.thursday);
    // formData.append("work_days['friday']", form.friday);
    // formData.append("work_days['saturday']", form.saturday);
    // formData.append("work_days['sunday']", form.sunday);

    let data = {
      user_data: {
        rut: form.rut,
        name: form.name,
        last_name: form.last_name,
        address: form.address,
        birth_date: form.birth_date,
        phone_number: form.phone_number,
        phone_number2: form.phone_number2,
        email: form.email,
      },
      driver_data: {
        nationality: form.nationality,
        inter_travels: form.inter_travels === "true" ? true : false,
        license_number: form.license_number,
        license_due_date: form.license_due_date,
      },
      files: {
        foto: form.foto,
        carnet: form.carnet,
        licencia: form.licencia,
        antecedentes: form.antecedentes,
        hoja: form.license_hoja,
      },
      work_days: {
        monday: form.monday,
        tuesday: form.tuesday,
        wednesday: form.wednesday,
        thursday: form.thursday,
        friday: form.friday,
        saturday: form.saturday,
        sunday: form.sunday,
      },
    };

    // formData.append("user_data", JSON.stringify(data.user_data));
    // formData.append("driver_data", JSON.stringify(data.driver_data));
    // formData.append("foto", form.foto);
    // formData.append("carnet", form.carnet);
    // formData.append("licencia", form.licencia);
    // formData.append("antecedentes", form.antecedentes);
    // formData.append("hoja", form.license_hoja);
    // formData.append("work_days", JSON.stringify(data.work_days));

    // LO SIGUIENTE REEMPLAZA A LO ANTERIOR
    for (let root_key in data) {
      let object = data[root_key];
      for (let child_key in object) {
        formData.append(root_key + "." + child_key, object[child_key]);
      }
    }

    // console.log(data, "DATAAAAAAAAAAAA");
    // console.log(form, "FORMM");
    // console.log(error, "ERROR");

    if (
      form.rut &&
      form.name &&
      form.last_name &&
      form.address &&
      form.birth_date &&
      form.phone_number &&
      form.email &&
      form.nationality &&
      form.inter_travels !== "-" &&
      form.license_number &&
      form.license_due_date &&
      form.foto &&
      form.carnet &&
      form.licencia &&
      form.antecedentes &&
      form.license_hoja &&
      !error.rut &&
      !error.name &&
      !error.last_name &&
      !error.address &&
      !error.birth_date &&
      !error.phone_number &&
      !error.email &&
      !error.nationality &&
      !error.inter_travels &&
      !error.license_number &&
      !error.foto &&
      !error.carnet &&
      !error.licencia &&
      !error.antecedentes &&
      !error.license_hoja &&
      (form.monday ||
        form.tuesday ||
        form.wednesday ||
        form.thursday ||
        form.friday ||
        form.saturday ||
        form.sunday)
    ) {
      await swal({
        title: "¿Continuar?",
        text: "¿Confirmar registro de conductor?",
        icon: "warning",
        buttons: ["NO", "SI"],
      }).then((response) => {
        if (response) {
          axios
            .post(`${process.env.REACT_APP_BACKEND}/drivers/`, formData, {
              headers: { "content-type": "multipart/form-data" },
            })
            .then(async (response) => {
              if (response) {
                await swal({
                  title: "Operación exitosa!",
                  text: "El conductor fue registrado correctamente",
                  icon: "success",
                  buttons: ["", "OK"],
                });
                history.push("/back_office/conductores");
              }
            })
            .catch((error) => {
              swal({
                title: "Error!",
                text: "No se pudo crear el conductor, por favor intentelo nuevamente mas tarde!",
                icon: "warning",
                buttons: ["", "OK"],
              });
              // history.push('/back_office/conductores');
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
                {/* {error.mail && form.mail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Introduza un correo válido</h5>
                                </div>
                                : null 
                            }
                            {!error.mail && !email.repeat && form.repeatMail ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts2} col-9`}>Debe repetir exactamente el correo colocado</h5>
                                </div>
                                : null                      
                            } */}
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
                {/* {error.clave && form.clave ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Mínimo 8 caracteres, una letra y un número</h5>
                                </div>
                                : null 
                            }
                            {!error.clave && !pass.repeat && form.repeatClave ?
                                <div className={`row justify-content-center`}>
                                    <h5 className={`${Style.alertTexts2} col-5`}>Debe repetir exactamente la clave colocada</h5>
                                </div>
                                : null                                
                            } */}
                {/* <div className={`row`}>
                                <h4 className={`${Style.admLabel} mt-md-2 mt-lg-2 col-4 col-sm-4 col-md-3 col-lg-3`}>Nombre Administrador</h4>
                                <input className={`${Style.inputLabel} mt-2 mt-sm-2 col-11 col-sm-11 col-md-3 col-lg-3`} type="text" name="admin" value={form.admin} onChange={(e)=> verifyAdmin(e)}/>
                                <h4 className={`${Style.dir} col-2 mt-md-2 mt-lg-2 text-end`}>Dirección</h4>
                                <input className={`${Style.inputDir} mt-2 mt-sm-2 col-11 col-sm-11 col-md-3 col-lg-3`} type="text" name="direccion" value={form.direccion} onChange={ (e)=> verifyData(e)}/>
                            </div>
                            {error.admin && form.admin ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Sólo letras (y espacios) sin números</h5>
                                </div>
                                : null 
                            } */}

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
                        Sólo números
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
                  <h4 className={`${Style.clave} col-2 mt-2 mt-md-2 mt-lg-2`}>
                    Nacionalidad
                  </h4>
                  <input
                    className={`${Style.claveInp} col-11 col-sm-11 col-md-4 col-lg-4 mt-1 fmt-md-1 mt-lg-1`}
                    type="text"
                    name="nationality"
                    onChange={(e) => verifyAdmin(e)}
                    value={form.nationality}
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