import React from "react";
import { MenuItem } from "@material-ui/core";
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
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={AuraMasteryIcon}
      />
    )
  }

  if (props === 'Avenging Wrath') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={AvengingWrathIcon}
      />
    )
  }

  // Restoration Druid

  if (props === 'Tranquility') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={TranquilityIcon}
      />
    )
  }

  if (props === 'Incarnation: Tree of Life') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={TreeofLifeIcon}
      />
    )
  }

  // Holy Priest

  if (props === 'Holy Word: Salvation') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={SalvationIcon}
      />
    )
  }

  if (props === 'Divine Hymn') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={DivineHymnIcon}
      />
    )
  }

  // Discipline Priest

  if (props === 'Power Word: Barrier') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={PowerWordBarrierIcon}
      />
    )
  }

  if (props === 'Evangelism') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={EvangelismIcon}
      />
    )
  }

  // Restoration Shaman

  if (props === 'Healing Tide Totem') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={HealingTideTotemIcon}
      />
    )
  }

  if (props === 'Spirit Link Totem') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={SpiritLinkTotemIcon}
      />
    )
  }

  // Mistweaver Monk

  if (props === 'Revival') {
    return (
      <img
        style={{
          height: 18,
          width: 18,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={RevivalIcon}
      />
    )
  }
}

