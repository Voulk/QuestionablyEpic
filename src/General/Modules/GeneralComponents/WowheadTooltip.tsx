import { FC, ReactNode } from "react";

interface WowheadTooltipProps {
  id: number | string | undefined | null;
  level?: number;
  bonusIDS?: string;
  type: string;
  children: ReactNode;
  difficulty?: number;
  forg?: number;
  gems?: string;
  rank?: number;
  craftedStats?: number[];
  catalyzedID?: number;
  gameType?: gameTypes;
}

const WowheadTooltip: FC<WowheadTooltipProps> = ({ id, level, bonusIDS, type, children, difficulty, gems, forg, rank, craftedStats, catalyzedID = 0, gameType = "Retail" }) => {
  if (type === "none" || id === 203460) {
    return <>{children}</>;
  }

  if (id === undefined || id === null || id === "" || id === 0 || id === "Phase 1" || id === "Phase 2" || id === "Phase 3" || id === "Phase 4" || id === "Intermission") {
    return <>{children}</>;
  }

  const domains: Record<gameTypes, string> = {
    "Retail": "",
    "Classic": "mop-classic/",
    "Forever": "forever/"
  };


  const baseWowheadLink = `https://www.wowhead.com/${domains[gameType] ?? ""}${type}=${id}`;
  const dataWowhead = `${type}=${id}`;

  const itemDataWowhead = `${dataWowhead}${level ? "&ilvl=" + level : ""}${bonusIDS ? "&bonus=" + bonusIDS : ""}${gems ? gems : ""}${forg ? "&forg=" + forg : ""}${craftedStats ? "&crafted-stats=" + craftedStats.join(":") : ""}${catalyzedID ? "&original-item=" + catalyzedID : ""}${rank ? "&rank=" + rank : ""}`;
  const spellDataWowhead = `${dataWowhead}${difficulty ? "&dd=" + difficulty : ""}${rank ? "&rank=" + rank : ""}`;

  return (
    <a
      href={baseWowheadLink}
      data-wowhead={type === "item" ? itemDataWowhead : spellDataWowhead}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "white", textDecoration: "none" }}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
};

export default WowheadTooltip;
