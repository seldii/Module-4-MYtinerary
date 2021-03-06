import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1
  },
  header: {
    backgroundColor: "rgb(238,238,238,0.5)",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    fontSize: "1rem"
  },
  img: {
    maxWidth: "100%",
    overflow: "hidden",
    display: "block",
    width: "100%"
  },
  description: {
    fontSize: "1.1rem"
  }
}));

export default function ActivitySlides(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.itinerary.activities.length;

  const { itinerary } = props;

  let activityImg;
  if (itinerary) {
    if (itinerary.activities[activeStep].image.slice(0, 4) === "http") {
      activityImg = itinerary.activities[activeStep].image;
    } else {
      activityImg = "/" + itinerary.activities[activeStep].image;
    }
  }
  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography className={classes.description}>
          {props.itinerary.activities[activeStep].description}
        </Typography>
      </Paper>
      <img
        className={classes.img}
        src={activityImg}
        alt={props.itinerary.activities[activeStep].description}
      />
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </div>
  );
}
