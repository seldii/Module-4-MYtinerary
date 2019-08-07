import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Fab, ButtonBase } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import LogInModal from "../Auth/LogInModal";
import RegisterationModal from "../Auth/RegisterationModal";
import { withStyles } from "@material-ui/core/styles";
import GoogleLogin from "../Auth/GoogleLoginButton";
import { getCities } from "../../store/actions/cityActions";
import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "white",
    margin: "auto",
    fontStyle: "italic",
    color: theme.palette.secondary.main
  },
  button: {
    marginBottom: theme.spacing(2),
    background: theme.palette.secondary.light,
    "&:hover": {
      background: theme.palette.primary.light
    },
    color: "white",
    font: theme.typography.button,
    width: "100%",
    height: "2.5rem"
  },
  search: {
    color: theme.palette.primary.main
  },

  header: {
    backgroundColor: theme.palette.secondary.light,
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    fontSize: "1rem"
  },
  img: {
    height: 255,
    maxWidth: "100%",
    overflow: "hidden",
    display: "block",
    width: "100%"
  },
  description: {
    fontSize: "1.1rem",
    color: "white"
  },
  buttonbase: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%"
  },
  image: {
    position: "relative",
    height: 200,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

class Landing extends Component {
  constructor() {
    super();
    this.state = { activeStep: 0 };
  }

  componentDidMount() {
    this.props.getCities();
  }

  handleNext() {
    this.setState(prevState => {
      return { activeStep: prevState.activeStep + 1 };
    });
  }

  handleBack() {
    this.setState(prevState => {
      return { activeStep: prevState.activeStep - 1 };
    });
  }
  render() {
    const classes = this.props.classes;
    const activeStep = this.state.activeStep;
    const maxSteps = this.props.cities.length;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <img
              style={{ maxWidth: "100%" }}
              src="/images/logooo.png"
              alt="logo"
            />
            <Grid item xs={12}>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="column"
              >
                <Grid item xs={12}>
                  <Typography className={classes.paper} variant="body2">
                    Start browsing
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Link to="/cities">
                    <FaSearch size={56} className={classes.search} />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography variant="body2" className={classes.paper}>
                  Want to build your own MYtinerary?
                </Typography>
              </Grid>
            </Grid>
            {this.props.auth.isAuthenticated && this.props.cities ? (
              <div className={classes.root}>
                <div className={classes.buttonbase}>
                  <ButtonBase
                    href={`/cities/${this.props.cities[activeStep].name}`}
                    params={{ cityName: this.props.cities[activeStep].name }}
                    focusRipple
                    key={this.props.cities[activeStep].name}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                      width: this.props.cities[activeStep].image.width
                    }}
                  >
                    <span
                      className={classes.imageSrc}
                      style={{
                        backgroundImage: `url(${
                          this.props.cities[activeStep].image
                        })`
                      }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                      <Typography className={classes.imageTitle}>
                        {this.props.cities[activeStep].name}
                      </Typography>
                    </span>
                  </ButtonBase>
                </div>
                <MobileStepper
                  variant="dots"
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={this.handleNext.bind(this)}
                      disabled={activeStep === maxSteps - 1}
                    >
                      {this.props.theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={this.handleBack.bind(this)}
                      disabled={activeStep === 0}
                    >
                      {this.props.theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                    </Button>
                  }
                />
              </div>
            ) : (
              <Grid container direction="column" justify="center">
                <Grid item xs={12}>
                  <Fab
                    variant="extended"
                    component="button"
                    className={classes.button}
                  >
                    <LogInModal />
                  </Fab>
                </Grid>
                <Grid item xs={12}>
                  <Fab variant="extended" className={classes.button}>
                    <RegisterationModal />
                  </Fab>
                </Grid>
                <Grid item xs={12}>
                  <GoogleLogin />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.cities.cities,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    getCities: () => {
      dispatch(getCities());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Landing));
