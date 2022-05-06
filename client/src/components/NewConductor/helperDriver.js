import axios from "axios";
import { useState } from "react";

export const helperDriver = async (rut) => {
  if (rut) {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/users/search/?rut=${rut}&profile=DRIVER`
    );
    return response;
  }
};
