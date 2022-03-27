import { Link } from "react-router-dom";
import Style from "./AsociadosDetail.module.css";
import Table from "react-bootstrap/Table";
import { TiEdit, TiDeleteOutline } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initialGetConductores,
  filterConductores,
} from "../../globalState/Actions";
import { FcSearch } from "react-icons/fc";
import axios from "../../axiosConfig";
import { dataUser } from "../../globalState/Actions";
import { useParams, useHistory } from "react-router-dom";
import getOwner from "./getOwner";
import Loader from "../Loader";

export default function AsociadosDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [owner, setOwner] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/owners/${id}`)
      .then((response) => {
        setLoading(false);
        setOwner(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const back = (e) => {
    history.push("/back_office_administracion/asociados");
  };

  return (
    <div>
      <div className={`${Style.containerMisDatosAdm} row containerVehiculos`}>
        {loading ? (
          <div className={`${Style.loading}`}>
            <Loader />
          </div>
        ) : (
          <div className={`${Style.fondo} row m-0`}>
            <div className={`${Style.title} col-12 mt-2`}>
              <h3>
                Asociados - {`${owner.user?.name} ${owner.user?.last_name}`}
              </h3>
            </div>

            {/* <div>
              <div className={`${Style.menu} col-12 mt-4`}>
                <div className={`row justify-content-between`}>
                  <button className={`${Style.add} col-2`}>
                    <Link to="/back_office_administracion/mis_datos/editar">
                      Editar
                    </Link>
                  </button>
                </div>
              </div>
            </div> */}

            <div
              className={`${Style.misDatos} col-12 mt-4 mb-4 mb-sm-0 mb-md-0 mb-lg-0`}
            >
              {/* <label className={`${Style.lbl}`}>Apellido:</label>
                        <label className={`${Style.datos}`}>Gonzalez</label>
                    
                        <label className={`${Style.lbl}`}>Nombre:</label>
                        <label className={`${Style.datos}`}>Pablo</label>
                    
                        <label className={`${Style.lbl}`}>Rut:</label>
                        <label className={`${Style.datos}`}>7647897</label>
                    
                        <label className={`${Style.lbl}`}>Fecha de Nacimiento:</label>
                        <label className={`${Style.datos}`}>1980-07-12</label>

                        <label className={`${Style.lbl}`}>Dirección:</label>
                        <label className={`${Style.datos}`}>Av.San Martin 487</label>
                    
                        <label className={`${Style.lbl}`}>Celular1:</label>
                        <label className={`${Style.datos}`}>984968375</label>
                    
                        <label className={`${Style.lbl}`}>Celular2:</label>
                        <label className={`${Style.datos}`}>987573244</label> */}

              <label className={`${Style.lbl}`}>Apellido:</label>
              <label className={`${Style.datos}`}>
                {owner.user?.last_name}
              </label>

              <label className={`${Style.lbl}`}>Nombre:</label>
              <label className={`${Style.datos}`}>{owner.user?.name}</label>

              <label className={`${Style.lbl}`}>Rut:</label>
              <label className={`${Style.datos}`}>{owner.user?.rut}</label>

              <label className={`${Style.lbl}`}>Fecha de Nacimiento:</label>
              <label className={`${Style.datos}`}>
                {owner.user?.birth_date}
              </label>

              <label className={`${Style.lbl}`}>Dirección:</label>
              <label className={`${Style.datos}`}>{owner.user?.address}</label>

              <label className={`${Style.lbl}`}>Celular1:</label>
              <label className={`${Style.datos}`}>
                {owner.user?.phone_number}
              </label>

              <label className={`${Style.lbl}`}>Celular2:</label>
              <label className={`${Style.datos}`}>
                {owner.user?.phone_number2 ? owner.user?.phone_number2 : "-"}
              </label>
            </div>
            <div className="col-12">
              <button onClick={(e) => back(e)} className={`${Style.add} `}>
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
