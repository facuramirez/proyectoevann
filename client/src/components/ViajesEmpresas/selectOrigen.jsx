import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Style from "./ViajesEmpresas.module.css";

let options = [];

function PlacesSelect({handleChange, selectedValue}) {
  const [items, setItems] = useState([]);
  const [inputValue, setValue] = useState("");
  

  const handleInputChange = (value) => {
    setValue(value);
  };

  const reload_data = (value) => {
    console.log(value);
    return axios
      .get(`${process.env.REACT_APP_BASE}/system/maps/places?address=${value}`)
      .then((res) => {
        return res.data;
      });
  };
  return (
    <AsyncSelect
      cacheOptions
      placeholder='Escriba una dirección...'
      defaultOptions
      loadOptions={reload_data}
      value={selectedValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      getOptionLabel={(e) => e.label}
      getOptionValue={(e) => e.id}
      className={`${Style.selectAsync} selectAsyncMain`}
    />
  );
}

export default PlacesSelect;
