import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }));

const list = ["Website", "Patreon", "Report a bug", "Make a suggestion", "Developers"];

export default function FooterLinks(props) {
  return (
    <div>
      {list.map((key) => (
        <Typography style={{ color: "white" }} variant="subtitle2">
          {key}
        </Typography>
      ))}
    </div>
  );
}
