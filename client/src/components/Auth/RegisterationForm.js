import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid } from "@material-ui/core";
import LogInModal from "./LogInModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(2)
  },
  buttonGrid: {
    alignSelf: "flex-end"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "1rem"
  },
  link: {
    color: theme.palette.secondary.main
  }
}));

const RegisterationForm = props => {
  const classes = useStyles();
  return (
    <form
      onSubmit={props.onSubmit}
      className={classes.form}
      encType="multipart/form-data"
    >
      <TextField
        autoFocus
        margin="dense"
        type="name"
        name="name"
        label="Name"
        id="name"
        className="mb-3"
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        type="email"
        name="email"
        label="Email"
        id="email"
        className="mb-3"
        onChange={props.onChange}
        fullWidth
      />

      <TextField
        margin="dense"
        type="password"
        name="password"
        id="password"
        label="Password"
        placeholder="Must contain at least 8 characters"
        className="mb-3"
        onChange={props.handleNewPassword}
        fullWidth
      />
      <TextField
        error={!props.match}
        margin="dense"
        type="password"
        name="confirm"
        id="password2"
        label="Confirm"
        placeholder="Reenter the password above"
        helperText={props.msg ? props.msg : ""}
        className="mb-3"
        onChange={props.handleConfirmedPassword}
        fullWidth
      />
      <TextField
        type="file"
        accept="image/png, image/jpeg"
        name="profileImage"
        id="image"
        label="Image"
        className="mb-3"
        onChange={props.fileSelectedHandler}
        fullWidth
      />
      <Grid container direction="column">
        <Grid item className={classes.buttonGrid}>
          <Button type="submit" variant="contained" className={classes.button}>
            Sign Up
          </Button>
        </Grid>
        <Grid item justify="flex-end">
          <Link to="#" variant="body2" className={classes.link}>
            Already have an account? | <LogInModal />
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterationForm;
