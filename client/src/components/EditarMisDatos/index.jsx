import { useState, useEffect } from "react";
import Style from "./EditarMisDatos.module.css";
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
import { useSelector } from "react-redux";
import axios from "../../axiosConfig";

export default function EditarMisDatos() {
  let user = useSelector((state) => state["user"]);
  let id = useSelector((state) => state["id"]);

  let [alldata, setAlldata] = useState({
    ready: false,
  });

  let history = useHistory();

  let inputRepeatEmail;
  let inputRepeatPass;

  let [form, setForm] = useState({
    // mail: '',
    // repeatMail: '',
    // clave: '',
    // repeatClave: '',
    admin: "",
    ape: "",
    direccion: "",
    fechaNac: "",
    cel1: "",
    cel2: "",
  });

  // =========== ESTE "USE EFFECT" ES PARA CUANDO FUNCIONE EL BACKEND ==========
  useEffect(() => {
    setForm({
      admin: user.name,
      ape: user.last_name,
      direccion: user.address,
      fechaNac: user.birth_date,
      cel1: user.phone_number,
      cel2: user.phone_number2,
    });
  }, []);
  // ========================================================================

  let [error, setError] = useState({
    // mail: '',
    // repeatMail: '',
    // clave: '',
    // repeatClave: '',
    admin: "",
    ape: "",
    direccion: "",
    fechaNac: "",
    cel1: "",
    cel2: "",
  });

  let [email, setEmail] = useState({
    valid: false,
    repeat: false,
  });

  // window.onload = function() {
  //     let repeat = document.querySelector('.repeatMail');
  //     let repeat2 = document.querySelector('.repeatPass');

  //     repeat.onpaste = (e) => {
  //         e.preventDefault();
  //         paste(repeat);
  //     }
  //     repeat2.onpaste = (e) => {
  //         e.preventDefault();
  //         paste(repeat2);
  //     }
  // }

  const verifyMail = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    inputRepeatEmail = document.querySelector(".repeatMail");
    inputRepeatPass = document.querySelector(".repeatPass");

    let repeat = document.querySelector(".repeatMail");
    let repeat2 = document.querySelector(".repeatPass");

    repeat.onpaste = (e) => {
      e.preventDefault();
      swal({
        title: "Acción inválida!",
        text: "Por favor repita su correo manualmente",
        icon: "warning",
      });
    };

    repeat2.onpaste = (e) => {
      e.preventDefault();
      swal({
        title: "Acción inválida!",
        text: "Por favor repita su clave manualmente",
        icon: "warning",
      });
    };

    // ================ PROCESO EMAIL, REPEAT EMAIL =====================
    // if(name==='mail'){
    //     if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)){
    //         setError({...error, [name]: 'Error'});
    //         setEmail({...email, valid: false});
    //         inputRepeatEmail.disabled = true;
    //     } else {
    //         setError({...error, [name]: ''});
    //         setEmail({...email, valid: true});
    //         inputRepeatEmail.disabled = false;
    //     }
    // }

    // =========================================================================
    // ================ PROCESO PASSWORD, REPEAT PASSWORD ======================
    // if(name==='clave'){
    //     let typedPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    //     if(!typedPass.test(value)){
    //         setError({...error, [name]: 'Error'});
    //         setPass({...pass, valid: false});
    //         console.log(error, 'invalido');
    //         inputRepeatPass.disabled = true;
    //     } else {
    //         setError({...error, [name]: ''});
    //         setPass({...pass, valid: true});
    //         console.log(error, 'VALIDO');
    //         inputRepeatPass.disabled = false;
    //     }
    // }

    setForm({
      ...form,
      [name]: value,
      // repeatMail: inputRepeatEmail.disabled ? '':inputRepeatEmail.value,
      // repeatClave: inputRepeatPass.disabled ? '':inputRepeatPass.value
    });

    if (
      !error.admin &&
      !error.ape &&
      !error.direccion &&
      !error.fechaNac &&
      !error.cel1 &&
      form.admin &&
      form.ape &&
      form.direccion &&
      form.fechaNac &&
      form.cel1
    ) {
      setAlldata({ ready: true });
    } else {
      setAlldata({ ready: false });
    }

    if (name === "repeatMail" || name === "repeatClave") validMail(e);
  };

  const verifyData = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (
      !error.admin &&
      !error.ape &&
      !error.direccion &&
      !error.fechaNac &&
      !error.cel1 &&
      form.admin &&
      form.ape &&
      form.direccion &&
      form.fechaNac &&
      form.cel1
    ) {
      setAlldata({ ready: true });
    } else {
      setAlldata({ ready: false });
    }

    setForm({ ...form, [name]: value });
  };

  const validMail = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let mail = form.mail;
    let clave = form.clave;

    // if(name==='repeatMail'){
    //     if(value === mail){
    //         setEmail({...email, repeat:true});
    //         setError({...error, [name]: ''});
    //     }else{
    //         setEmail({...email, repeat:false});
    //         setError({...error, [name]: 'Error'});
    //     }
    // }

    // if(name==='repeatClave'){
    //     if(value === clave){
    //         setPass({...pass, repeat:true});
    //         setError({...error, [name]: ''});
    //     }else{
    //         setPass({...pass, repeat:false});
    //         setError({...error, [name]: 'Error'});
    //     }
    // }

    if (
      !error.admin &&
      !error.ape &&
      !error.direccion &&
      !error.fechaNac &&
      !error.cel1 &&
      form.admin &&
      form.ape &&
      form.direccion &&
      form.fechaNac &&
      form.cel1
    ) {
      setAlldata({ ready: true });
    } else {
      setAlldata({ ready: false });
    }
  };

  let [pass, setPass] = useState({
    valid: false,
    repeat: false,
  });

  let [admin, setAdmin] = useState({
    valid: false,
  });

  const verifyAdmin = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (!/^[A-Za-z\s]+$/g.test(value)) {
      setAdmin({ ...admin, valid: false });
      setError({ ...error, [name]: "Error" });
    } else {
      setAdmin({ ...admin, valid: true });
      setError({ ...error, [name]: "" });
    }

    setForm({ ...form, [name]: value });

    if (
      !error.admin &&
      !error.ape &&
      !error.direccion &&
      !error.fechaNac &&
      !error.cel1 &&
      form.admin &&
      form.ape &&
      form.direccion &&
      form.fechaNac &&
      form.cel1
    ) {
      setAlldata({ ready: true });
    } else {
      setAlldata({ ready: false });
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
  // ===========================================================

  const save = async (e) => {
    e.preventDefault();
    let data = {
      name: form.admin,
      last_name: form.ape,
      address: form.direccion,
      birth_date: form.fechaNac,
      phone_number: parseInt(form.cel1),
      phone_number2: parseInt(form.cel2),
    };

    if (
      !error.admin &&
      !error.ape &&
      !error.direccion &&
      !error.fechaNac &&
      !error.cel1 &&
      form.admin &&
      form.ape &&
      form.direccion &&
      form.fechaNac &&
      form.cel1
    ) {
      await swal({
        title: "¿Continuar?",
        text: "¿Desea guardar los cambios?",
        icon: "warning",
        buttons: ["NO", "SI"],
      }).then(async (response) => {
        if (response) {
          await axios
            .patch(
              `${process.env.REACT_APP_BACKEND}/users/change_personal_data/`,
              data
            )
            .then(async (response) => {
              await swal({
                title: "Operación exitosa!",
                text: "El adminitrador fue editado correctamente!",
                icon: "success",
                buttons: ["", "OK"],
              });
              history.push("/back_office/mis_datos");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      swal({
        title: "Formulario incompleto!",
        text: "Por favor completa el formulario para poder editar los datos",
        icon: "error",
      });
    }
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

    let buttonSave = document.querySelector(".notActive");

    if (
      !error.mail &&
      !error.repeatMail &&
      !error.clave &&
      !error.repeatClave &&
      !error.admin &&
      !error.direccion &&
      !error.fechaNac &&
      !error.cel1 &&
      !error.cel2 &&
      form.mail &&
      form.repeatMail &&
      form.clave &&
      form.repeatClave &&
      form.admin &&
      form.direccion &&
      form.fechaNac &&
      form.cel1
    ) {
      modifyAllData(true);
      let button = document.querySelector(".notActive");
      console.log(alldata.ready, "ready");
      if (alldata.ready) button.disabled = false;
    } else {
      modifyAllData(false);
    }
  };

  const modifyAllData = (value) => {
    setAlldata((formPrev) => {
      return { ...formPrev, ready: value };
    });
  };

  const back = (e) => {
    e.preventDefault();
    history.push("/back_office/mis_datos");
    window.scrollTo(0, 0);
  };

  return (
    <Fade>
      <div>
        <div className={`${Style.containerEditarMisDatos} row`}>
          <div className={Style.form}></div>
          <div className={`${Style.formComplete}`}>
            <h1 className={`${Style.title} mt-4`}>Editar</h1>
            <div className={Style.formRegister}>
              <div className={Style.titleForm}>
                <h4 className={Style.titleEdit}>Editar Administrador</h4>
                <h5>Tu usuario es tu mail</h5>
              </div>

              <div className={`${Style.data}`}>
                {/* <div className={`row`}>
                                <h4 className={`col-1 mt-md-2 mt-lg-2`}>Mail</h4>
                                <input autoFocus className={`mail mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4`} type="text" name="mail" value={form.mail} onChange={(e)=> verifyMail(e)}/>
                                <h4 className={`${Style.repeatMailLabel} col-2 mt-md-2 mt-lg-2 text-sm-start text-md-center text-lg-end`}>Repetir Mail</h4>
                                <input className={`${Style.repeatMail} mt-1 mt-sm-1 col-11 col-sm-11 col-md-4 col-lg-4 repeatMail `} type="text" disabled name="repeatMail" value={form.repeatMail} onChange={(e)=> verifyMail(e)}/>
                            </div>
                            {error.mail && form.mail ?
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
                  <div className="col-md-6 col-lg-6">
                    <div className="row">
                      <h4
                        className={`${Style.admLabel} mt-md-2 mt-lg-2 col-4 col-sm-4 col-md-3 col-lg-3`}
                      >
                        Nombre
                      </h4>
                      <input
                        className={`${Style.inputLabel} mt-2 mt-sm-2 col-11 col-sm-11 col-md-8 col-lg-8`}
                        type="text"
                        name="admin"
                        value={form.admin}
                        onChange={(e) => verifyAdmin(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="row">
                      <h4
                        className={`${Style.admLabel} mt-md-2 mt-lg-2 col-4 col-sm-4 col-md-3 col-lg-3`}
                      >
                        Apellido
                      </h4>
                      <input
                        className={`${Style.inputLabel} mt-2 mt-sm-2 col-11 col-sm-11 col-md-8 col-lg-8`}
                        type="text"
                        name="ape"
                        value={form.ape}
                        onChange={(e) => verifyAdmin(e)}
                      />
                    </div>
                  </div>
                  {/* <h4 className={`${Style.dir} col-2 mt-md-2 mt-lg-2 text-end`}>Dirección</h4>
                                <input className={`${Style.inputDir} mt-2 mt-sm-2 col-11 col-sm-11 col-md-3 col-lg-3`} type="text" name="direccion" value={form.direccion} onChange={ (e)=> verifyData(e)}/> */}
                </div>
                {error.admin && form.admin ? (
                  <div className={`row`}>
                    <h5 className={`${Style.alertTexts} col-6`}>
                      Sólo letras (y espacios) sin números
                    </h5>
                  </div>
                ) : null}

                <div className={`row mt-0`}>
                  <div className="col-md-8 col-lg-6">
                    <div className="row">
                      <h4 className={`${Style.dir} col-md-3 col-lg-3`}>
                        Dirección
                      </h4>
                      <input
                        className={`${Style.inputDir} col-11 col-sm-11 col-md-8 col-lg-8`}
                        type="text"
                        name="direccion"
                        value={form.direccion}
                        onChange={(e) => verifyData(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className={`row`}>
                  <div className="col-md-12 col-lg-12 mt-0">
                    <div className="row">
                      <h4
                        className={`${Style.fechaNac} col-4 col-md-3 col-lg-3 mt-2`}
                      >
                        Fecha de Nacimiento
                      </h4>
                      <form
                        className={`${classes.container} ${Style.inputFecha} col-11 col-sm-11 col-md-5 col-lg-5 mt-sm-1 p-0 p-sm-0`}
                        noValidate
                      >
                        <TextField
                          id="date"
                          label=""
                          type="date"
                          name="fechaNac"
                          value={form.fechaNac}
                          onChange={(e) => verifyData(e)}
                          // defaultValue="2017-05-24"
                          className={`${Style.fechaNacField} ${classes.textField} mt-0`}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </form>
                    </div>
                  </div>
                  {/* <div className="col-md-6 col-lg-6 border">
                                    <h4 className={`${Style.dir} col-2 mt-md-2 mt-lg-2 text-end`}>Dirección</h4>
                                    <input className={`${Style.inputDir} mt-2 mt-sm-2 col-11 col-sm-11 col-md-3 col-lg-3`} type="text" name="direccion" value={form.direccion} onChange={ (e)=> verifyData(e)}/>
                                </div> */}
                  {/* <input className={`${Style.inputFecha} col-7`} type="text" /> */}
                </div>

                {/* <div className={`row`}>
                                <h4 className={`${Style.clave} col-1 mt-md-2 mt-lg-2`}>Clave</h4>
                                <input className={`${Style.claveInp} col-11 col-sm-11 col-md-3 col-lg-3 mt-md-1 mt-lg-1 pass`} type="password" name="clave" value={form.clave} onChange={(e)=> verifyMail(e)}/>
                                
                                <h4 className={`${Style.repeatPass} col-2 mt-2 mt-sm-2 mt-md-1 mt-lg-1 text-sm-start text-md-center text-lg-end`}>Repetir Clave</h4>
                                <input className={`${Style.repeatPassInp} col-11 col-sm-11 col-md-5 col-lg-5 mt-2 mt-sm-2 mt-md-1 mt-lg-1 repeatPass`} type="password" name="repeatClave" value={form.repeatClave} onChange={(e)=> verifyMail(e)}disabled/>
                            </div>
                            {error.clave && form.clave ?
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

                <div className={`${Style.cel} row mt-0`}>
                  <div className="col-md-6 col-lg-6">
                    <div className="row">
                      <h4 className={`col-md-3 col-lg-3`}>Celular1</h4>
                      <input
                        className={`${Style.celInp1} col-11 col-sm-11 col-md-8 col-lg-8`}
                        type="text"
                        name="cel1"
                        value={form.cel1}
                        onChange={(e) => verifyCel(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="row">
                      <h4 className={`${Style.cel2} col-md-3 col-lg-3`}>
                        Celular2
                      </h4>
                      <input
                        className={`${Style.celInp2} col-11 col-sm-11 col-md-8 col-lg-8`}
                        type="text"
                        name="cel2"
                        value={form.cel2}
                        onChange={(e) => verifyCel(e)}
                      />
                    </div>
                  </div>
                </div>
                {error.cel1 && form.cel1 && error.cel2 && form.cel2 ? (
                  <div className={`row`}>
                    <h5 className={`${Style.alertTexts} col-5`}>
                      Sólo números
                    </h5>
                    <h5 className={`${Style.alertTexts} col-5 text-left`}>
                      Sólo números
                    </h5>
                  </div>
                ) : error.cel1 && !error.cel2 ? (
                  <div className={`row`}>
                    <h5 className={`${Style.alertTexts} col-6`}>
                      Sólo números
                    </h5>
                  </div>
                ) : !error.cel1 && error.cel2 ? (
                  <div className={`row justify-content-center`}>
                    <h5 className={`${Style.alertTexts} col-6 text-center`}>
                      Sólo números
                    </h5>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={Style.containerSave}>
              <h5 className={`${alldata.ready ? "d-none" : null} `}>
                Complete el formulario para habilitar el botón...
              </h5>
              <div className={`${Style.buttons} row w-75`}>
                <div className="">
                  <button
                    className={`col-3 ${Style.back}`}
                    onClick={(e) => back(e)}
                  >
                    <FaArrowAltCircleLeft className={Style.iconBack} />
                    Volver
                  </button>
                </div>
                <div className="">
                  <button
                    className={`col-3 ${Style.save} notActive`}
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
