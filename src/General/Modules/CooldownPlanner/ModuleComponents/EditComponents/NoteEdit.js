import React from "react";
import { TextField } from "@mui/material";

export default function NoteEdit(props) {
  return (
    <TextField
      style={{ width: "100%" }}
      size="small"
      InputProps={{
        classes: {
          input: {
            fontSize: 12,
          },
        },
      }}
      id="standard-basic"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
