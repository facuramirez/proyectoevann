import Style from "./NewCarForm.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";
import { AiOutlineClear } from "react-icons/ai";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function NewCarForm() {
  let history = useHistory();

  let [form, setForm] = useState({
    circulacion: "",
    responsabilidad: "",
    seg_terceros: "",
    decreto: "",
    revision_tecnica: "",
    principal: "",
    foto1: "",
    foto2: "",
    patent: "",
    type: "",
    baggage: "",
    mileage: "",
    seating: "",
    year: "",
    technical_review: "",
    business: false,
    family: false,
    events: false,
    make: "",
    model: "",
  });

  let [error, setError] = useState({
    circulacion: "Error",
    responsabilidad: "Error",
    seg_terceros: "Error",
    decreto: "Error",
    revision_tecnica: "Error",
    principal: "Error",
    foto1: "Error",
    foto2: "Error",
    patent: "Error",
    type: "Error",
    baggage: "Error",
    mileage: "Error",
    seating: "Error",
    year: "Error",
    technical_review: "Error",
    business: "Error",
    family: "Error",
    events: "Error",
    make: "Error",
    model: "Error",
  });

  const clear = (e) => {
    e.preventDefault();
    // let inputs = document.querySelectorAll('input');
    // inputs.forEach( (input) => {
    //     input.value = '';
    // });
    // inputs[0].focus();
    let inputs = document.querySelectorAll("input");

    setForm({
      circulacion: "",
      responsabilidad: "",
      seg_terceros: "",
      decreto: "",
      revision_tecnica: "",
      principal: "",
      foto1: "",
      foto2: "",
      patent: "",
      type: "",
      baggage: "",
      mileage: "",
      seating: "",
      year: "",
      technical_review: "",
      business: false,
      family: false,
      events: false,
      make: "",
      model: "",
    });

    setError({
      circulacion: "Error",
      responsabilidad: "Error",
      seg_terceros: "Error",
      decreto: "Error",
      revision_tecnica: "Error",
      principal: "Error",
      foto1: "Error",
      foto2: "Error",
      patent: "Error",
      type: "Error",
      baggage: "Error",
      mileage: "Error",
      seating: "Error",
      year: "Error",
      technical_review: "Error",
      business: "Error",
      family: "Error",
      events: "Error",
      make: "Error",
      model: "Error",
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
    console.log(form, "form");
  };

  let formData = new FormData();

  const save = async (e) => {
    e.preventDefault();
    console.log(form);

    let data = {
      files: {
        decreto: form.decreto,
        permiso: form.circulacion,
        revision: form.revision_tecnica,
        seguro_res: form.responsabilidad,
        seguro_ter: form.seg_terceros,
      },
      pictures: {
        picture_1: form.principal,
        picture_2: form.foto1,
        picture_3: form.foto2,
      },
      patent: form.patent,
      type: form.type,
      baggage: form.baggage,
      mileage: form.mileage,
      seating: form.seating,
      year: form.year,
      technical_review: form.technical_review,
      business: form.business,
      family: form.family,
      events: form.events,
      make: 1,
      model: 1,
    };

    // RESTO
    formData.append("patent", data.patent);
    formData.append("type", data.type);
    formData.append("baggage", data.baggage);
    formData.append("mileage", data.mileage);
    formData.append("seating", data.seating);
    formData.append("year", data.year);
    formData.append("technical_review", data.technical_review);
    formData.append("business", data.business);
    formData.append("family", data.family);
    formData.append("events", data.events);
    formData.append("make", data.make);
    formData.append("model", data.model);

    // ARCHIVOS
    formData.append("pictures.picture_1", data.pictures.picture_1);
    formData.append("pictures.picture_2", data.pictures.picture_2);
    formData.append("pictures.picture_3", data.pictures.picture_3);

    formData.append("files.decreto_80", data.files.decreto);
    formData.append("files.permiso", data.files.permiso);
    formData.append("files.revision", data.files.revision);
    formData.append("files.seguro_responsabilidad", data.files.seguro_res);
    formData.append("files.seguro_terceros", data.files.seguro_ter);

    // formData.append("foto", form.foto);
    // formData.append("carnet", form.carnet);
    // formData.append("licencia", form.licencia);
    // formData.append("antecedentes", form.antecedentes);
    // formData.append("hoja", form.license_hoja);
    // formData.append("work_days", JSON.stringify(data.work_days));

    if (
      form.circulacion &&
      form.responsabilidad &&
      form.seg_terceros &&
      form.decreto &&
      form.principal &&
      form.foto1 &&
      form.foto2 &&
      form.patent &&
      form.type !== "-" &&
      form.baggage &&
      form.mileage &&
      form.seating !== "-" &&
      form.year &&
      form.technical_review &&
      (form.business || form.family || form.events) &&
      form.make &&
      form.model
    ) {
      await swal({
        title: "¿Continuar?",
        text: "¿Confirmar registro de vehículo?",
        icon: "warning",
        buttons: ["NO", "SI"],
      }).then((response) => {
        if (response) {
          axios
            .post(`${process.env.REACT_APP_BACKOFFICE}/cars/`, formData, {
              headers: { "content-type": "multipart/form-data" },
            })
            .then(async (response) => {
              if (response) {
                await swal({
                  title: "Operación exitosa!",
                  text: "El vehículo fue registrado correctamente",
                  icon: "success",
                  buttons: ["", "OK"],
                });
                history.push("/back_office/vehiculos");
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

      //   await swal({
      //     title: "Operación exitosa!",
      //     text: "El vehículo fue creado correctamente",
      //     icon: "success",
      //     buttons: [""],
      //     timer: 2000,
      //   });
      //   history.push("/back_office/vehiculos");

      // } else {
      //   await swal({
      //     title: "Advertencia!",
      //     text: "Por favor complete los campos obligatorios antes de guardar",
      //     icon: "warning",
      //   });
      //   document.querySelector("#marca").focus();
      // }
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

  const uploadFiles = (e) => {
    let name = e.target.name;
    let file = e.target.files[0];

    setForm({ ...form, [name]: file });
  };

  const checkLines = (e) => {
    const value = e.target.checked;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <div className={`${Style.containerVehiculos} containerVehiculos`}>
        <div className={`${Style.fondo} row m-0`}>
          <div className={`${Style.title} col-12 mt-4`}>
            <h3>Nuevo Vehículo</h3>
          </div>
          <div className={`${Style.formCar} col-11 mt-4`}>
            <section className={`row justify-content-center m-auto`}>
              <div className={`col-12`}>
                <div className={`row`}>
                  <label className={`${Style.asterisk} col-12 text-left`}>
                    (los campos con (*) son obligatorios)
                  </label>
                </div>
              </div>
              <div className={`col-sm-12 col-md-12 col-lg-12 mt-2`}>
                <div className={`row`}>
                  <label
                    className={`col-sm-3 col-md-2 col-lg-2 text-start`}
                    id="patent"
                  >
                    Patente (*)
                  </label>
                  <input
                    className={`col-sm-9 col-md-4 col-lg-4 inpMarca`}
                    type="text"
                    onChange={(e) => inputs(e)}
                    value={form.patent}
                    name="patent"
                  />
                </div>
              </div>
              <div className={`col-sm-12 col-md-12 col-lg-12 mt-2`}>
                <div className={`row`}>
                  <label
                    className={`col-sm-3 col-md-2 col-lg-2 text-start`}
                    id="marca"
                  >
                    Marca (*)
                  </label>
                  <input
                    className={`col-sm-9 col-md-4 col-lg-4 inpMarca`}
                    type="text"
                    onChange={(e) => inputs(e)}
                    value={form.make}
                    name="make"
                  />
                  <label
                    className={`mt-2 mt-sm-2 mt-md-0 mt-lg-0 col-sm-3 col-md-2 col-lg-2 text-start text-md-start text-lg-start`}
                  >
                    Modelo (*)
                  </label>
                  <input
                    className={`mt-sm-2 mt-md-0 mt-lg-0 col-sm-9 col-md-4 col-lg-4 inpModelo`}
                    type="text"
                    onChange={(e) => inputs(e)}
                    value={form.model}
                    name="model"
                  />
                </div>
              </div>
              <div className={`col-sm-12 col-md-12 col-lg-12 mt-2`}>
                <div className={`row`}>
                  <label className={`col-sm-4 col-md-3 col-lg-3`}>
                    Tipo Vehículo (*)
                  </label>
                  <select
                    className={`col-sm-8 col-md-3 col-lg-3 mt-1 mt-md-0 mt-lg-0 inpTipoVeh`}
                    name="type"
                    onChange={(e) => inputs(e)}
                    value={form.type}
                  >
                    <option value="-">-</option>
                    <option value="SD">Sedan</option>
                    <option value="VA">Van</option>
                  </select>
                  <label
                    className={`${Style.cantPas} mt-2 mt-sm-2 mt-md-0 mt-lg-0 col-sm-3 col-md-2 col-lg-2 text-start text-md-start text-lg-start`}
                  >
                    Pasajeros (*)
                  </label>
                  <select
                    className={`col-sm-9 col-md-4 col-lg-4 mt-2 mt-md-0 mt-lg-0 inpTipoVeh`}
                    name="seating"
                    onChange={(e) => inputs(e)}
                    value={form.seating}
                  >
                    <option value="-">-</option>
                    <option value="1">1 pasajero</option>
                    <option value="2">2 pasajeros</option>
                    <option value="3">3 pasajeros</option>
                    <option value="4">4 pasajeros</option>
                    <option value="5">5 pasajeros</option>
                  </select>
                  {/* <input className={`col-lg-4 inpObs`} type="text" onChange={(e)=>inputs(e)} value={form.observaciones} name="observaciones"/> */}
                </div>
              </div>

              <div className={`col-sm-12 col-md-12 col-lg-12 mt-2`}>
                <div className={`row`}>
                  <label className={`col-sm-3 col-md-2 col-lg-2 text-start`}>
                    Equipaje (*)
                  </label>
                  <input
                    className={`col-sm-9 col-md-4 col-lg-4 inpObs`}
                    type="text"
                    onChange={(e) => inputs(e)}
                    value={form.baggage}
                    name="baggage"
                  />
                  <label
                    className={`mt-2 mt-sm-2 mt-md-0 mt-lg-0 col-sm-3 col-md-2 col-lg-2 text-start text-md-start text-lg-start`}
                  >
                    Año (*)
                  </label>
                  <input
                    className={`mt-sm-2 mt-md-0 mt-lg-0 col-sm-9 col-md-4 col-lg-4 inpObs`}
                    type="text"
                    onChange={(e) => inputs(e)}
                    value={form.year}
                    name="year"
                  />
                </div>
              </div>
              <div className={`col-sm-12 col-md-12 col-lg-12 mt-2`}>
                <div className={`row`}>
                  <label
                    className={`${Style.kilometrajeLabel} col-sm-4 col-md-2 col-lg-2 text-start`}
                  >
                    Kilometraje (*)
                  </label>
                  <input
                    className={`col-sm-8 col-md-2 col-lg-3 inpObs`}
                    type="text"
                    onChange={(e) => inputs(e)}
                    value={form.mileage}
                    name="mileage"
                  />
                  <label
                    className={`col-sm-5 col-md-4 col-lg-3 text-start mt-2 mt-sm-2 mt-md-0 mt-lg-0`}
                  >
                    Última revisión técnica (*)
                  </label>
                  <form
                    className={`${classes.container} ${Style.inputFecha} mt-1 mt-sm-2 mt-md-0 mt-lg-0 col-6 col-sm-4 col-md-3 col-lg-3`}
                    noValidate
                  >
                    <TextField
                      id="date"
                      label=""
                      type="date"
                      name="fechaNac"
                      onChange={(e) => inputs(e)}
                      value={form.technical_review}
                      name="technical_review"
                      // defaultValue="2017-05-24"
                      className={`${classes.textField} text-center`}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </div>
              </div>
              <div className={`col-sm-12 col-md-12 col-lg-12 mt-2`}>
                <div className={`row`}>
                  <label
                    className={`${Style.lineaNegocio} col-12 col-sm-12 col-md-4 col-lg-4 text-start`}
                  >
                    Líneas de negocio (*)
                  </label>
                  <div className={`col-12 col-sm-6 col-md-5 col-lg-5`}>
                    <div
                      className={`${Style.checkBox} row d-none d-sm-flex d-md-flex d-lg-flex`}
                    >
                      <div
                        className={`${Style.lines} col-4 col-sm-4 col-md-4 col-lg-4`}
                      >
                        <input
                          className={`text-center`}
                          type="checkbox"
                          name="business"
                          value={form.business}
                          onChange={(e) => checkLines(e)}
                        />
                        <label className={`${Style.labelRadio}`}>Empresa</label>
                      </div>
                      <div
                        className={`${Style.lines} col-4 col-sm-4 col-md-4 col-lg-4`}
                      >
                        <input
                          className={`text-center`}
                          type="checkbox"
                          name="family"
                          value={form.family}
                          onChange={(e) => checkLines(e)}
                        />
                        <label className={`${Style.labelRadio}`}>
                          Familiar
                        </label>
                      </div>
                      <div
                        className={`${Style.lines} col-4 col-sm-4 col-md-4 col-lg-4`}
                      >
                        <input
                          className={`text-center`}
                          type="checkbox"
                          name="events"
                          value={form.events}
                          onChange={(e) => checkLines(e)}
                        />
                        <label className={`${Style.labelRadio}`}>Eventos</label>
                      </div>
                    </div>
                  </div>
                  <div className={`col-12 col-sm-12 col-md-8 col-lg-8 mt-1`}>
                    <div
                      className={`${Style.checkBox} row d-flex d-sm-none d-md-none d-lg-none`}
                    >
                      <div className={`${Style.lines} col-4`}>
                        <input
                          className={`${Style.inputRadio}`}
                          type="checkbox"
                          name="business"
                          value={form.business}
                        />
                        <label className={`${Style.labelRadio}`}>Empresa</label>
                      </div>
                      <div className={`${Style.lines} col-4`}>
                        <input
                          className={`${Style.inputRadio}`}
                          type="checkbox"
                          name="family"
                          value={form.family}
                        />
                        <label className={`${Style.labelRadio}`}>
                          Familiar
                        </label>
                      </div>
                      <div className={`${Style.lines} col-4`}>
                        <input
                          className={`${Style.inputRadio}`}
                          type="checkbox"
                          name="events"
                          value={form.events}
                        />
                        <label className={`${Style.labelRadio}`}>Eventos</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${Style.inputsFile} col -12 col-sm-12 col-md-12 col-lg-12 mt-2`}
              >
                <div className={`row`}>
                  <label
                    className={`${Style.titleDoc} col-md-2 col-lg-2 text-start mt-3`}
                  >
                    Documentos (*)
                  </label>
                  <div
                    className={`${Style.docs} d-none d-md-inline-flex d-lg-inline-flex col-md-10 col-lg-10`}
                  >
                    <div className={`${Style.docsDivs} row`}>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Permiso de Circulación (*)
                      </label>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Seguro Responsabilidad Civil (*)
                      </label>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Seguro de terceros (*)
                      </label>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Decreto 80 (*)
                      </label>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Revisión técnica (*)
                      </label>
                    </div>
                    <div className={`${Style.docsDivs} row`}>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="circulacion"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="responsabilidad"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="seg_terceros"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="decreto"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="revision_tecnica"
                        onChange={(e) => uploadFiles(e)}
                      />
                    </div>
                  </div>
                  <div
                    className={`${Style.docs} d-inline-flex d-md-none d-lg-none col-md-10 col-lg-10`}
                  >
                    <div className={`${Style.docsDivs} row`}>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Permiso de Circulación (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="circulacion"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <label className={`${Style.labelDocs} mt-3`}>
                        Seguro Responsabilidad Civil (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="responsabilidad"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <label className={`${Style.labelDocs} mt-3`}>
                        Permiso de Circulación (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="seg_terceros"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <label className={`${Style.labelDocs} mt-3`}>
                        Decreto 80 (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="decreto"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <label className={`${Style.labelDocs} mt-3`}>
                        Revisión técnica (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="revision_tenica"
                        onChange={(e) => uploadFiles(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${Style.inputsFile} col-12 col-sm-12 col-md-12 col-lg-12 mt-2`}
              >
                <div className={`row`}>
                  <label
                    className={`${Style.titleVeh} col-12 col-md-3 col-lg-3 text-start mt-2`}
                  >
                    Fotos Vehículo (*)
                  </label>
                  <div
                    className={`${Style.docs} d-none d-md-inline-flex d-lg-inline-flex col-8`}
                  >
                    <div className={`${Style.docsDivs}`}>
                      <label className={`${Style.labelDocs} mt-2`}>
                        Principal (*)
                      </label>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Foto1 (*)
                      </label>
                      <label className={`${Style.labelDocs} mt-3`}>
                        Foto2 (*)
                      </label>
                    </div>
                    <div className={`${Style.docsDivs}`}>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="principal"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="foto1"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="foto2"
                        onChange={(e) => uploadFiles(e)}
                      />
                    </div>
                  </div>
                  <div
                    className={`${Style.docs} d-inline-flex d-md-none d-lg-none col-8`}
                  >
                    <div className={`${Style.docsDivs}`}>
                      <label className={`${Style.labelDocs} mt-2`}>
                        Principal (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="principal"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <label className={`${Style.labelDocs} mt-3`}>
                        Foto1 (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="foto1"
                        onChange={(e) => uploadFiles(e)}
                      />
                      <label className={`${Style.labelDocs} mt-3`}>
                        Foto2 (*)
                      </label>
                      <input
                        type="file"
                        className={`${Style.upButtons}`}
                        name="foto2"
                        onChange={(e) => uploadFiles(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className={`col-12 mt-4`}>
            <div className={`${Style.buttons} row justify-content-center`}>
              <Link
                to="/back_office/vehiculos"
                className={`${Style.first} col-3`}
              >
                <FaArrowAltCircleLeft className={Style.iconBack} />
                Volver
              </Link>
              <a
                className={`${Style.second} col-3`}
                href=""
                onClick={(e) => save(e)}
              >
                <VscSave className={`${Style.iconSave}`} />
                Guardar
              </a>
              {/* <a className={`${Style.third} col-3`} href="" onClick={(e)=>clear(e)}><AiOutlineClear className={`${Style.iconClear}`}/>Limpiar</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
