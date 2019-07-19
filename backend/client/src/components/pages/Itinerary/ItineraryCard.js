import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Activity from "./Activity";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  details: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flex: "2 0 auto"
  },
  content: {
    width: "100%"
  },

  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  profile: {
    display: "flex",
    flexDirection: "column"
  },

  panelContent: {
    width: "100%"
  },
  panelExpandIcon: {
    color: "red",
    "&$expanded": {
      transform: "none"
    }
  },
  expanded: {}
}));

const ItineraryCard = ({ itinerary }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        className={classes.panel}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={expanded === "panel1" ? "Close" : <ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          class={{
            content: classes.panelContent,
            expandIcon: classes.panelExpandIcon
          }}
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            justifyItems: "center",
            flexDirection: "column"
          }}
        >
          <div className={classes.card}>
            <div className={classes.profile}>
              <Avatar
                alt={itinerary.user.name}
                src={itinerary.user.image}
                className={classes.avatar}
              />
              <div style={{ alignSelf: "center" }}>
                <Typography>{itinerary.user.name}</Typography>
              </div>
            </div>
            <Card style={{ width: "100%" }}>
              <CardContent className={classes.content}>
                <Typography component="h1" variant="subtitle1">
                  {itinerary.title}
                </Typography>
                <Grid
                  className={classes.info}
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="baseline"
                >
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="baseline"
                  >
                    <Typography variant="body2" component="div">
                      Likes:{itinerary.rating || "-"}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {itinerary.duration || "-"} Hours
                    </Typography>
                    <Typography variant="body2" component="div">
                      {(() => {
                        const x = itinerary.price;
                        switch (true) {
                          case x === 0:
                            return "Free";
                          case x < 15:
                            return "$";
                          case x < 40:
                            return "$$";
                          case x < 60:
                            return "$$$";
                          default:
                            return "";
                        }
                      })()}
                    </Typography>
                  </Grid>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    {itinerary.hashtag.length > 0 ? (
                      itinerary.hashtag[0].split("," || " ").map((h, index) => (
                        <Typography key={index} variant="body2">
                          #{h}
                        </Typography>
                      ))
                    ) : (
                      <div>#</div>
                    )}
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Activity itinerary={itinerary} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ItineraryCard;
