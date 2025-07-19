import { Link } from "@mui/material";

const list = [
  { text: "Blog", link: "https://questionablyepic.com" },
  { text: "Support the site", link: "https://patreon.com/questionablyepic" },
  { text: "Discord (bugs & suggestions)", link: "https://discord.gg/jBSGHDm5G8" },
  { text: "Developers", link: "https://github.com/Voulk/QuestionablyEpic" },
];

export default function FooterLinks(props) {
  if (props.gameType === "Classic") {
    list.push({ text: "DPS or Tank? Check out Wowsims", link: "https://wowsims.com/mop/" });
  } else {
    //list.push({ text: "Retail Guides", link: "https://retail.questionablyepic.com" });
  }
  return (
    <div>
      {list.map((key, i) => [
        <Link key={"link" + i} style={{ color: "white" }} variant="subtitle2" href={key.link} target="_blank" rel="noopener" underline="none">
          {key.text}
        </Link>,
        <br key={"break" + i} />,
      ])}
    </div>
  );
}
