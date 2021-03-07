import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Grow } from "@material-ui/core";
import axios from "axios";
import MyStopwatch from "../../components/Clock";
import Modal from "../../components/Modal";

export default function Home({ route }) {
  const [comecarTimer, setComecarTimer] = useState(false);
  const [respServer, setRespServer] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);

  const token = localStorage.getItem("token");
  function iniciarPonto(data) {
    setRespServer(data);
    setSucesso(true);
    setModalVisivel(false);
  }

  function pararPonto() {
    setSucesso(false);
    setModalVisivel(true);
  }

  async function getPonto() {
    axios({
      method: "post",

      url: "http://localhost:8000/api/pontos/iniciar",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => iniciarPonto(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={12}>
          <MyStopwatch iniciar={sucesso} />
        </Grid>
        <Grid item xs={12}>
          <h1>{sucesso ? respServer.success : "Ponto de Trabalho"}</h1>
          <Button
            variant="contained"
            onClick={() => {
              sucesso ? pararPonto() : getPonto();
            }}
            color={sucesso ? "secondary" : "primary"}
          >
            {sucesso ? "Iniciar pausa" : "Iniciar ponto"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Modal visivel={modalVisivel} infoPonto={respServer.ponto_id} />
        </Grid>
      </Grid>
    </Container>
  );
}
