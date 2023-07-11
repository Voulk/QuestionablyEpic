import { getPrimordialImage } from "Retail/Engine/EffectFormulas/Generic/OnyxAnnuletData";
import { ReactNode } from "react";



export function buildPrimGems(gemCombo: string[]) {
  const gemData: {socket: ReactNode[], string: string} = { socket: [], string: "&gems=" };
  for (let i = 0; i < 3; i++) {
    gemData.string += gemCombo[i] + ":";
    gemData.socket.push(
      <div style={{ marginRight: 4, display: "inline" }}>
        <a
          data-wowhead={"item=" + gemCombo[i] + "&ilvl=" + 424}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={getPrimordialImage(gemCombo[i])}
            width={15}
            height={15}
            alt="Socket"
          />
        </a>
      </div>
    );
  }
  return gemData;
}