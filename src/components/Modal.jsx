import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, TextareaAutosize, Grid } from "@material-ui/core";
import axios from "axios";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (props.visivel) {
      setOpen(true);
    }
  }, [props.visivel]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function enviarPausa() {
    console.log("yes");
  }

  //   async function iniciarPausa() {
  //     axios({
  //       method: "post",

  //       url: "http://localhost:8000/api/pausa/iniciar",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: {
  //         ponto_id: infoPonto,
  //         descricao: descricao,
  //       },
  //     })
  //       .then((res) => handlePause(res.data))
  //       .catch((err) => console.log(err));
  //   }

  function handleChange(e) {
    props.onChange(e.target.value);
  }

  function enviarForm() {
    props.submit();
    setOpen(false);
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <h2 id="simple-modal-title">Descreva o motivo da sua pausa</h2>
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={3}
            placeholder="Minimum 3 rows"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" size="small" onClick={enviarForm}>
            Enviar
          </Button>
        </Grid>
      </Grid>

      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
