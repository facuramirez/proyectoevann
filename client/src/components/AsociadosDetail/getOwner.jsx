import { useEffect, useState } from 'react';
import axios from "../../axiosConfig";

export default function GetOwner (id) {
  let [owner, setOwner] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/owners/${id}`)
      .then((response) => {
        setOwner(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return owner;
}
