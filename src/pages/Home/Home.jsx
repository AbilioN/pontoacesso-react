import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import axios from "axios";
import MyStopwatch from "../../components/Clock";
const Home = () => {
  const [comecarTimer, setComecarTimer] = useState(false);
  const [respServer, setRespServer] = useState({});
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    console.log(respServer);
  }, [respServer]);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYxNTEzNTc2MSwiZXhwIjoxNjE1MTM5MzYxLCJuYmYiOjE2MTUxMzU3NjEsImp0aSI6Iks3NW14cXRnRVd4NUtRcWEiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.aTZK6l_17EN9UoFA0cog6ZY8gDvjR5h4iyN4n1x0ya8";

  function iniciarPonto(data) {
    setRespServer(data);
    setSucesso(true);
  }

  function pararPonto() {
    setSucesso(false);
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
      </Grid>
    </Container>
  );
};

export default Home;
