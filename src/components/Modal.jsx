import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, TextareaAutosize, Grid } from "@material-ui/core";

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

export default function SimpleModal({ visivel }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (visivel) {
      setOpen(true);
    }
  }, [visivel]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function enviarPausa() {
    console.log("yes");
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
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" size="small" onClick={enviarPausa}>
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
