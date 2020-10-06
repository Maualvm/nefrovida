import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { API } from "../config";

class JornadasAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      fecha: "",
      localidad: "",
      municipio: "",
      idEstado: "",
      Estados: "",
      submit: "none",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getEstados();
  }

  async getEstados() {
    try {
      const response = await fetch(API + "/estados", {
        headers: {},
      });
      const ListEstados = await response.json();
      this.setState({ Estados: ListEstados });
      console.log(this.state.Estados);
    } catch (err) {
      console.error(err);
    }
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      submit: "waiting",
    });
    const response = await fetch(API + "/jornadas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        nombre: this.state.nombre,
        fecha: this.state.fecha,
        localidad: this.state.localidad,
        municipio: this.state.municipio,
        idEstado: this.state.idEstado,
      }),
    });
    const jornada = await response.json();
    if (jornada.errors) {
      console.log("Error");
    } else {
      this.setState({
        submit: "done",
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.submit === "waiting" && <div>Creando jornada...</div>}
        {this.state.submit === "done" && <Redirect to="/jornadas" />}
        {this.state.Estados && this.state.submit === "none" && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Fecha:
                <input
                  type="date"
                  name="fecha"
                  value={this.state.fecha}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Localidad:
                <input
                  type="text"
                  name="localidad"
                  value={this.state.localidad}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Municipio:
                <input
                  type="text"
                  name="municipio"
                  value={this.state.municipio}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Estado:
                <select
                  name="idEstado"
                  value={this.state.idEstado}
                  onChange={this.handleChange}
                >
                  {this.state.Estados.map((estado) => (
                    <option key={estado.idEstado} value={estado.idEstado}>
                      {estado.nombreEstado}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <button type="submit">Crear Jornada</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default JornadasAgregar;
