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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Activity from "./Activity";
import Button from "@material-ui/core/Button";

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

  info: {
    flex: "1 0 auto"
  },
  playIcon: {
    height: 38,
    width: 38
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
  panel: {
    margin: 0
  },

  panelContent: {
    width: "100%"
  },
  panelExpandIcon: {
    justifySelf: "center"
  }
}));

const ItineraryCard = ({ itinerary }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expansionPanelOpen, setState] = useState(0);

  return (
    <div>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expanded={expansionPanelOpen}
          expandIcon={
            <Button
              onClick={() =>
                setState({ expansionPanelOpen: !expansionPanelOpen })
              }
            >
              {expansionPanelOpen ? "Close" : "View All"}
            </Button>
          }
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
                alt={itinerary.user}
                src={itinerary.profilePic}
                className={classes.avatar}
              />
              <div style={{ alignSelf: "center" }}>
                <Typography>{itinerary.user}</Typography>
              </div>
            </div>

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
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Activity />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ItineraryCard;
