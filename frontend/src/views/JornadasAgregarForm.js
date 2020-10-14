import React, { useState, useEffect } from "react";
import { CssBaseline, InputAdornment, makeStyles } from "@material-ui/core";
import { Grid } from "semantic-ui-react";
import axios from "axios";

import Controls from "../components/FormComponents/Controls";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "47%",
      margin: theme.spacing(1),
    },
  },
  form: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const initialFValues = {
  nombre: "",
  fecha: new Date(),
  localidad: "",
  municipio: "",
  idEstado: "",
};

export default function JornadasAgregarForm() {
  const [values, setValues] = useState(initialFValues);
  const classes = useStyle();
  const [EstadosCollection, setEstados] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(e.target);
    console.log(values);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/estados")
      .then((res) => {
        setEstados(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      let day = values.fecha.getUTCDay();
      let month = values.fecha.getUTCMonth() + 1;
      let year = values.fecha.getUTCFullYear();
      let result = fetch("http://localhost:8000/api/jornadas", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Credentials": "true",
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nombre: values.nombre,
          fecha: year + "/" + month + "/" + day,
          localidad: values.localidad,
          municipio: values.municipio,
          idEstado: values.idEstado,
        }),
      });
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.form}>
      <CssBaseline />
      <form className={classes.root}>
        <Controls.Input
          name="nombre"
          label="Nombre"
          value={values.nombre}
          onChange={handleInputChange}
        />
        <Controls.DatePicker
          name="fecha"
          label="Fecha"
          value={values.fecha}
          onChange={handleInputChange}
        />
        <Controls.Input
          name="localidad"
          label="Localidad"
          value={values.localidad}
          onChange={handleInputChange}
        />
        <Controls.Input
          name="municipio"
          label="Municipio"
          value={values.municipio}
          onChange={handleInputChange}
        />
        <Controls.Select
          name="idEstado"
          label="Estado"
          value={values.idEstado}
          onChange={handleInputChange}
          options={EstadosCollection}
        />
        <Controls.Button
          text="Submit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          onClick={onSubmit}
        />
      </form>
    </div>
  );
}