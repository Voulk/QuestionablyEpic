import { render } from "react-dom"
import React from "react";
import {
    Grid,
    Paper,
    Typography,
  } from "@material-ui/core";


export default function HelpText(props) {
    let helpText = props.text;

    return(
        <Paper elevation={0} style={{ border: "1px", padding: 10, marginBottom: 10 }}>
            <Typography
            style={{ color: "limegreen" }}
            align="left"
            variant="h6"
            
            // gutterBottom
            >
            How to
            
            </Typography>
            <Typography
            style={{ color: "##fffff7" }}
            align="left"
            variant="subtitle1"
            display="inline"
            paragraph
            // gutterBottom
            >
            {helpText}
            
            </Typography>
        </Paper>

    )
}

