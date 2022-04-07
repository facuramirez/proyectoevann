import { useEffect, useState } from "react";
import { helperDriver } from "./helperDriver";

export const VerifyDriver = (rut, setForm, setError) => {
  let [data, setData] = useState([]);

  useEffect(() => {
    helperDriver(rut).then((response) => {
    //   setData(response.data);
      console.log(response.data);
    });
  }, [rut]);

  return 'ata';
};
