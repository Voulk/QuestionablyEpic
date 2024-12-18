import { getGemImage } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/CyrcesCircletData";
import { ReactNode } from "react";



export function buildPrimGems(gemCombo: number[]) {
  const gemData: {socket: ReactNode[], string: string} = { socket: [], string: "&gems=" };
  for (let i = 0; i < 3; i++) {
    gemData.string += gemCombo[i] + ":";
    console.log("item=" + gemCombo[i].toString() + "&ilvl=" + 639)
    gemData.socket.push(
      <div style={{ marginRight: 4, display: "inline" }}>
        <a
          href={`https://www.wowhead.com/item=${gemCombo[i]}&ilvl=639`}
          //data-wowhead={"item=" + 24455/*gemCombo[i].toString() + "&ilvl=" + 639*/}
          /*target="_blank"
          rel="noopener noreferrer"*/
        >
          <img
            src={(getGemImage(gemCombo[i]))}
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