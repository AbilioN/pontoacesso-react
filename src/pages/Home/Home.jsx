import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Grow } from "@material-ui/core";
import axios from "axios";
import MyStopwatch from "../../components/Clock";
import Modal from "../../components/Modal";

export default function Home({ route }) {
  const [comecarTimer, setComecarTimer] = useState(false);
  const [respServer, setRespServer] = useState({});
  const [rodando, setRodando] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [pausado, setPausado] = useState({});

  const token = localStorage.getItem("token");
  function iniciarPonto(data) {
    setRespServer(data);
    setRodando(true);
    setModalVisivel(false);
  }

  function pararPonto() {
    setRodando(false);
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

  async function iniciarPausa() {
    axios({
      method: "post",

      url: "http://localhost:8000/api/pausa/iniciar",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        ponto_id: respServer.ponto_id,
        descricao: descricao,
      },
    })
      .then((res) => {
        atualizarTela(res.data);
        setModalVisivel(false);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (descricao) {
      console.log(descricao);
    }
  }, [descricao]);

  function atualizarTela(data) {}
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={12}>
          <MyStopwatch iniciar={rodando} />
        </Grid>
        <Grid item xs={12}>
          <h1>{rodando ? respServer.success : "Ponto de Trabalho"}</h1>
          <Button
            variant="contained"
            onClick={() => {
              rodando ? pararPonto() : getPonto();
            }}
            color={rodando ? "secondary" : "primary"}
          >
            {rodando ? "Iniciar pausa" : "Iniciar ponto"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Modal
            visivel={modalVisivel}
            infoPonto={respServer.ponto_id}
            submit={iniciarPausa}
            onChange={(e) => {
              setDescricao(e);
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
