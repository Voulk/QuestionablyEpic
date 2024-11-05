import React, { FC, ReactNode } from "react";

interface WowheadTooltipProps {
  id: number | string | undefined | null;
  level?: number;
  bonusIDS?: string;
  domain: string;
  type: string;
  children: ReactNode;
  difficulty?: number;
  forg?: number;
  gems?: string;
  keyProp?: string;
  rank?: number;
}

const WowheadTooltip: FC<WowheadTooltipProps> = ({ id, level, bonusIDS, domain, type, children, difficulty, gems, forg, keyProp = "defaultKey", rank }) => {
  if (type === "none" || id === 203460) {
    return <>{children}</>;
  }

  if (id === undefined || id === null || id === "" || id === 0 || id === "Phase 1" || id === "Phase 2" || id === "Phase 3" || id === "Phase 4" || id === "Intermission") {
    return <>{children}</>;
  }

  const baseWowheadLink = domain === "cata" ? `https://www.wowhead.com/cata/${type}=${id}` : `https://www.wowhead.com/${type}=${id}`;
  const dataWowhead = `${type}=${id}&domain=${domain}`;

  const itemDataWowhead = `${dataWowhead}${level ? "&ilvl=" + level : ""}${bonusIDS ? "&bonus=" + bonusIDS : ""}${gems ? gems : ""}${forg ? "&forg=" + forg : ""}`;
  const spellDataWowhead = `${dataWowhead}${difficulty ? "&dd=" + difficulty : ""}${rank ? "&rank=" + rank : ""}`;
  
  return (
    <a
      href={baseWowheadLink}
      data-wowhead={type === "item" ? itemDataWowhead : spellDataWowhead}
      target="_blank"
      rel="noopener noreferrer"
      key={keyProp}
      style={{ color: "white", textDecoration: "none" }}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
};

export default WowheadTooltip;
