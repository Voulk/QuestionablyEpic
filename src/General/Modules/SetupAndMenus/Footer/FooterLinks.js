import { Link } from "@mui/material";
import { gameType } from "Redux/Reducers/GameType";

const list = [
  { text: "Blog", link: "https://questionablyepic.com" },
  { text: "Support the site", link: "https://patreon.com/questionablyepic" },
  { text: "Discord (bugs & suggestions)", link: "https://discord.gg/jBSGHDm5G8" },
  { text: "Developers", link: "https://github.com/Voulk/QuestionablyEpic" },
  { text: "DPS or Tank? Check out Wowsims", link: "https://wowsims.com/mop/", gameType: "Classic" },
];

export default function FooterLinks(props) {
  return (
    <div>
      {list.map((key, i) => [
        <Link key={"link" + i} style={{ color: "white" }} variant="subtitle2" href={key.link} target="_blank" rel="noopener" underline="none">
          {(!key.gameType || props.gameType === key.gameType) ? key.text : null}
        </Link>,
        <br key={"break" + i} />,
      ])}
    </div>
  );
}
