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
          onChange={props.handleChange}
        />

        <input
          htmlFor={imageId}
          type="file"
          accept="image/png, image/jpeg"
          name={imageId}
          label="Image"
          key={imageId}
          data-id={idx}
          data-field-type="image"
          fullWidth
          style={{ marginBottom: 8 }}
          onChange={props.handleChange}
        />
      </div>
    );
  });
};
export default ActivityInputs;
