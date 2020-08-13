import React from "react";
import AuraMasteryIcon from '../Images/AuraMastery.jpg'
import AvengingWrathIcon from '../Images/AvengingWrath.jpg'
import DivineHymnIcon from '../Images/DivineHymn.jpg'
import EvangelismIcon from '../Images/Evangelism.jpg'
import HealingTideTotemIcon from '../Images/HealingTideTotem.jpg'
import PowerWordBarrierIcon from '../Images/PowerWordBarrier.jpg'
import RevivalIcon from '../Images/Revival.jpg'
import SalvationIcon from '../Images/Salvation.jpg'
import SpiritLinkTotemIcon from '../Images/SpiritLinkTotem.jpg'
import TranquilityIcon from '../Images/Tranquility.jpg'
import TreeofLifeIcon from '../Images/TreeofLife.jpg'


export default function abilityicons(props) {
	 // Paladin Cooldowns 
  if (props === 'Aura Mastery') {
    return (
      <div>
        <a data-wowhead='spell=31821'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={AuraMasteryIcon}
            alt='Aura Mastery'
          />
        </a>
        Aura Mastery
      </div>
    )
  }

  if (props === 'Avenging Wrath') {
    return (
      <div>
        <a data-wowhead='spell=31884'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={AvengingWrathIcon}
            alt='Avenging Wrath'
          />
        </a>
        Avenging Wrath
      </div>
    )
  }

  // Restoration Druid

  if (props === 'Tranquility') {
    return (
      <div>
        <a data-wowhead='spell=740'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={TranquilityIcon}
            alt='Tranquility'
          />
        </a>
        Tranquility
      </div>
    )
  }

  if (props === 'Incarnation: Tree of Life') {
    return (
      <div>
        <a data-wowhead='spell=33891'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={TreeofLifeIcon}
            alt='Incarnation: Tree of Life'
          />
        </a>
        Incarnation: Tree of Life
      </div>
    )
  }

  // Holy Priest

  if (props === 'Holy Word: Salvation') {
    return (
      <div>
        <a data-wowhead='spell=265202'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={SalvationIcon}
            alt='Holy Word: Salvation'
          />
        </a>
        Holy Word: Salvation
      </div>
    )
  }

  if (props === 'Divine Hymn') {
    return (
      <div>
        <a data-wowhead='spell=64843'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={DivineHymnIcon}
            alt='Divine Hymn'
          />
        </a>
        Divine Hymn
      </div>
    )
  }

  // Discipline Priest

  if (props === 'Power Word: Barrier') {
    return (
      <div>
        <a data-wowhead='spell=62618'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={PowerWordBarrierIcon}
            alt='Power Word: Barrier'
          />
        </a>
        Power Word: Barrier
      </div>
    )
  }

  if (props === 'Evangelism') {
    return (
      <div>
        <a data-wowhead='spell=246287'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={EvangelismIcon}
            alt='Evangelism'
          />
        </a>
        Evangelism
      </div>
    )
  }

  // Restoration Shaman

  if (props === 'Healing Tide Totem') {
    return (
      <div>
        <a data-wowhead='spell=108280'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={HealingTideTotemIcon}
            alt='Healing Tide Totem'
          />
        </a>
        Healing Tide Totem
      </div>
    )
  }

  if (props === 'Spirit Link Totem') {
    return (
      <div>
        <a data-wowhead='spell=98008'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={SpiritLinkTotemIcon}
            alt='Spirit Link Totem'
          />
        </a>
        Spirit Link Totem
      </div>
    )
  }

  // Mistweaver Monk

  if (props === 'Revival') {
    return (
      <div>
        <a data-wowhead='spell=98008'>
          <img
            style={{
              height: 18,
              width: 18,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={RevivalIcon}
            alt='Revival'
          />
        </a>
        Revival
      </div>
    )
  }
}

