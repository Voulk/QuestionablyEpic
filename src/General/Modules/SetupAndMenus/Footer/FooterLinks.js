import React from "react";
import { Link } from "@material-ui/core";

const list = [
  { text: "Guides", link: "https://questionablyepic.com" },
  { text: "Support the site", link: "https://patreon.com/questionablyepic" },
  { text: "Report a bug", link: "https://docs.google.com/forms/d/e/1FAIpQLSeUsAOadXLgrOfIDCGdHlWp0ydHRM8hXzgSGPHl06qV0fuBfg/viewform" },
  { text: "Suggestion Box", link: "https://docs.google.com/forms/d/e/1FAIpQLSeUsAOadXLgrOfIDCGdHlWp0ydHRM8hXzgSGPHl06qV0fuBfg/viewform" },
  { text: "Developers", link: "https://github.com/Voulk/QuestionablyEpic" },
];

export default function FooterLinks(props) {
  return (
    <div>
      {list.map((key) => [
        <Link style={{ color: "white" }} variant="subtitle2" href={key.link} target="_blank" rel="noopener" underline="none">
          {key.text}
        </Link>,
        <br />,
      ])}
    </div>
  );
}
