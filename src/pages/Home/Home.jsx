import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import axios from "axios";

const Home = () => {
  const [comecarTimer, setComecarTimer] = useState(false);
  const [respServer, setRespServer] = useState({});
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    console.log(respServer);
  }, [respServer]);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYxNTEzMTYyNCwiZXhwIjoxNjE1MTM1MjI0LCJuYmYiOjE2MTUxMzE2MjQsImp0aSI6IkJCZ0lveTEwNDJaelYwc1IiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.h_GUfBQjai4KBHOfLBMytmcGGh2el2qXLMb9i8CMcew";

  function iniciarPonto(data) {
    setRespServer(data);
    setSucesso(true);
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
          <h1>{sucesso ? respServer.success : "Ponto de Trabalho"}</h1>
          <Button
            variant="contained"
            onClick={() => {
              getPonto();
            }}
            color={sucesso ? "secondary" : "primary"}
          >
            {sucesso ? "Iniciar pausa" : "Iniciar ponto"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
