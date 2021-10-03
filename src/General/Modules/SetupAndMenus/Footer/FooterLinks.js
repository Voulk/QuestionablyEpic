import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }));

const list = [
  { text: "Website", link: "#" },
  { text: "Patreon", link: "#" },
  { text: "Report a bug", link: "#" },
  { text: "Make a suggestion", link: "#" },
  { text: "Developers", link: "#" },
];

// Further Details for Link component https://mui.com/components/links/
// Uses the same props as Typography

export default function FooterLinks(props) {
  return (
    <div>
      {list.map((key) => [
        <Link
          style={{ color: "white" }}
          variant="subtitle2"
          href={key.link}
          // Determines whether text is underlined. Options: None, Hover, ALways
          underline="none"
        >
          {key.text}
        </Link>,
        <br />,
      ])}
    </div>
  );
}
