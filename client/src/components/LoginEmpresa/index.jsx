import { useState, useEffect } from "react";
import Style from "./LoginEmpresa.module.css";
import register from "../../img/register.jpg";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import axios from "axios";
import { dataUser, getId } from "../../globalState/Actions";
import { useDispatch } from "react-redux";
import { Button } from "antd";

export default function LoginEmpresa() {
  let history = useHistory();
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let [form, setForm] = useState({
    mail: "",
    clave: "",
  });

  let [error, setError] = useState({
    mail: "",
    clave: "",
  });

  let [email, setEmail] = useState({
    valid: false,
    repeat: false,
  });

  const verifyMail = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    // ================ PROCESO EMAIL, REPEAT EMAIL =====================
    if (name === "mail") {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)) {
        setError({ ...error, [name]: "Error" });
        setEmail({ ...email, valid: false });
      } else {
        setError({ ...error, [name]: "" });
        setEmail({ ...email, valid: true });
      }
    }

    // =========================================================================
    // ================ PROCESO PASSWORD, REPEAT PASSWORD ======================
    if (name === "clave") {
      let typedPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!typedPass.test(value)) {
        setError({ ...error, [name]: "Error" });
        setPass({ ...pass, valid: false });
      } else {
        setError({ ...error, [name]: "" });
        setPass({ ...pass, valid: true });
      }
    }

    setForm({
      ...form,
      [name]: value,
    });

    if (!error.mail && !error.clave && form.mail && form.clave) {
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

    if (!/^[A-Za-z]+$/g.test(value)) {
      setAdmin({ ...admin, valid: false });
      setError({ ...error, [name]: "Error" });
      console.log("novalido");
    } else {
      setAdmin({ ...admin, valid: true });
      setError({ ...error, [name]: "" });
      console.log("VALIDO");
    }

    setForm({ ...form, [name]: value });

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
      setAlldata({ ready: true });
    } else {
      setAlldata({ ready: false });
    }
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

  let [alldata, setAlldata] = useState({
    ready: false,
  });

  // ===================== ESTO ES SOLO FRONTEND ========================================
  // const login = async (e) => {
  //     e.preventDefault();

  //     history.push('/back_office_administracion/mis_datos');
  //     swal({
  //         title: 'Bienvenido a Evann!',
  //         text: 'Que disfrutes tu estadía en la página',
  //         icon: 'success',
  //         timer: 2000
  //     })
  // }
  // ==============================================================================

  // =================== ESTO FUNCIONA CON BACKEND =========================
  const login = async (e) => {
    e.preventDefault();
    // history.push("/back_office_empresas/mis_datos");
    setLoading(true);
    // TODO: lo siguiente es para ingresar al BackOffice una vez que esten las rutas
    let data = {
      username: form.mail,
      password: form.clave,
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND}/companies/login/`, data)
      .then(async (response) => {
        dispatch(getId(response.data.user.id));
        axios.defaults.headers.common["Authorization"] =
          "Token " + response["data"]["token"];
        await axios
          .get(`${process.env.REACT_APP_BACKEND}/users/info/`)
          .then((response) => {
            setLoading(false);
            dispatch(dataUser(response.data));
            history.push("/back_office_empresas/mis_datos");
            swal({
              title: "Bienvenido a Evann-Empresas!",
              text: "Que disfrutes tu recorrido por aquí!",
              icon: "success",
              timer: 2000,
            });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        swal({
          title: "Datos Incorrectos!",
          text: "El correo y/o la contraseña no son válidos",
          icon: "warning",
          timer: 2500,
        });
      });
  };
  // ==================================================================================

  const back = (e) => {
    e.preventDefault();
    history.push("/");
    window.scrollTo(0, 0);
  };

  return (
    <Fade>
      <div>
        <div className={Style.containerRegister}>
          {/* <img src={register} className={Style.registerOne}/> */}
          <div className={Style.form}></div>
          <div className={`${Style.formComplete} row`}>
            <h1
              className={`${Style.title} col-12 mt-5 mt-sm-5 mt-md-5 mt-lg-5`}
            >
              Iniciar Sesión
            </h1>

            <div
              className={`${Style.formRegister} row p-3 mt-3 mt-sm-3 mt-md-3 mt-lg-3`}
            >
              <div
                className={`${Style.titleForm} col-12 col-sm-12 col-md-12 col-lg-12`}
              >
                <div className={`row`}>
                  <h3
                    className={`${Style.iniciar} d-none d-sm-block d-md-block d-lg-block col-12 col-md-12 col-lg-12`}
                  >
                    Iniciar sesión - Empresa
                  </h3>
                  {/* <h3 className={`${Style.iniciar} d-block d-sm-none d-md-none d-lg-none col-12 col-md-12 col-lg-12`}>Administración</h3> */}
                  {/* <h5
                    className={`${Style.parragraph} col-12 col-md-12 col-lg-12`}
                  >
                    Tu usuario es tu mail
                  </h5> */}
                </div>
              </div>

              <div className={`${Style.data} col-12 col-md-12 col-lg-12`}>
                <div className={`row`}>
                  <h4 className={`col-2 col-sm-2 col-md-2 col-lg-2`}>
                    Usuario
                  </h4>
                  <input
                    autoFocus
                    className={`${Style.mailInp} mail col-12 col-sm-9 col-md-9 col-lg-9 mt-1 mt-sm-1 mt-md-0 mt-lg-0`}
                    type="text"
                    name="mail"
                    value={form.mail}
                    onChange={(e) => verifyMail(e)}
                  />
                </div>
                {error.mail && form.mail ? (
                  <div className={`row`}>
                    <h5 className={`${Style.alertTexts} col-6`}>
                      Introduza un correo válido
                    </h5>
                  </div>
                ) : null}
                <div className={`row`}>
                  <h4 className={`col-2 col-sm-2 col-md-2 col-lg-2`}>Clave</h4>
                  <input
                    className={`${Style.claveInp} col-12 col-sm-9 col-md-9 col-lg-9 mt-1 mt-sm-1 mt-md-0 mt-lg-0 pass`}
                    type="password"
                    name="clave"
                    value={form.clave}
                    onChange={(e) => verifyMail(e)}
                  />
                </div>
                <span className={Style.here}>
                  ¿Olvidaste tu contraseña? click{" "}
                  <Link to="/administracion/recuperar_contraseña">Aquí</Link>
                </span>
                {/* {error.clave && form.clave ?
                                <div className={`row`}>
                                    <h5 className={`${Style.alertTexts} col-6`}>Mínimo 8 caracteres, una letra y un número</h5>
                                </div>
                                : null 
                            }                             */}
              </div>
              <div
                className={`${Style.containerSave} col-11 col-sm-11 col-md-11 col-lg-11 mt-3 mt-sm-4 mt-md-5 mt-lg-5`}
              >
                <div
                  className={`${Style.buttons} row justify-content-center align-items-center`}
                >
                  <button
                    className={`col-3 col-md-3 col-lg-3 ${Style.back}`}
                    onClick={(e) => back(e)}
                  >
                    <FaArrowAltCircleLeft className={Style.iconBack} />
                    Volver
                  </button>
                  {/* <button
                    className={`col-3 col-md-3 col-lg-3 ${Style.save}`}
                    onClick={(e) => login(e)}
                  >
                    Ingresar
                  </button> */}
                  <Button
                    className={`col-3 col-md-3 col-lg-3 ${Style.save}`}
                    onClick={(e) => login(e)}
                    loading={loading ? true : false}
                    style={
                      loading
                        ? { backgroundColor: "rgba(55, 55, 55, 1)" }
                        : { width: 'fit-content !important'}
                    }
                    disabled={loading ? true : false}
                  >
                    {loading ? "Ingresando" : "Ingresar"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
