import React from "react";
import TextField from "@material-ui/core/TextField";

const ActivityInputs = props => {
  return props.activities.map((activity, idx) => {
    let activityId = `activity-${idx}`,
      imageId = `image-${idx}`;
    return (
      <div key={idx}>
        <TextField
          type="text"
          htmlFor={activityId}
          label={`Activity #${idx + 1}`}
          name={activityId}
          key={activityId}
          value={props.activities[idx].description}
          inputProps={{ "data-id": `${idx}`, "data-field-type": "description" }}
          fullWidth
          style={{ marginBottom: 8 }}
        />

        <TextField
          htmlFor={imageId}
          type="text"
          name={imageId}
          label="Image"
          key={imageId}
          value={props.activities[idx].image}
          inputProps={{ "data-id": `${idx}`, "data-field-type": "image" }}
          fullWidth
          helperText="Please enter a valid url for the image"
          style={{ marginBottom: 8 }}
        />
      </div>
    );
  });
};
export default ActivityInputs;
