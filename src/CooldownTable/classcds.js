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


export default function classcds(props) {
	 // Paladin Cooldowns 
  if (props === 'Holy Paladin') {
    return ([
      <MenuItem value={'Aura Mastery'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={AuraMasteryIcon}
        />
        Aura Mastery
      </MenuItem>,
     	<MenuItem value={'Avenging Wrath'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={AvengingWrathIcon}
        />
        Avenging Wrath
      </MenuItem>]
	 )
  }
  // Restoration Druid
  if (props === 'Restoration Druid') {
 	 return ([
      <MenuItem value={'Tranquility'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={TranquilityIcon}
        />
        Tranquility
      </MenuItem>,
      <MenuItem value={'Tree of Life'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={TreeofLifeIcon}
        />
      Tree of Life
      </MenuItem>]
 	 )
  }
  // Holy Priest
  if (props === 'Holy Priest') {
  	return ([
      <MenuItem value={'Holy Word: Salvation'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={SalvationIcon}
        />
        Holy Word: Salvation
      </MenuItem>,
      <MenuItem value={'Divine Hymn'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={DivineHymnIcon}
        />
      Divine Hymn
      </MenuItem>]
 	 )
  }
  // Discipline Priest
  if (props === 'Discispline Priest') {
  	return ([
      <MenuItem value={'Power Word: Barrier'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={PowerWordBarrierIcon}
        />
      Power Word: Barrier
      </MenuItem>,
      <MenuItem value={'Evangelism'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={EvangelismIcon}
        />
      Evangelism
      </MenuItem>]
    )
  }
  // Restoration Shaman
  if (props === 'Restoration Shaman') {
  	return ([
      <MenuItem value={'Healing Tide Totem'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={HealingTideTotemIcon}
        />
      Healing Tide Totem
      </MenuItem>,
      <MenuItem value={'Spirit Link Totem'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={SpiritLinkTotemIcon}
        />
      Spirit Link Totem
      </MenuItem>]
    )
  }
  // Mistweaver Monk
  if (props === 'Mistweaver Monk') {
  	return ([
      <MenuItem value={'Revival'}>
        <img
          style={{
            height: 18,
            width: 18,
            padding: '0px 5px 0px 5px',
            verticalAlign: 'middle'
          }}
          src={RevivalIcon}
        />
      Revival
      </MenuItem>]
  	)
  }
  if (props === 0) {
    return (
      [<MenuItem> No Class Selected </MenuItem>]
    )
  }
}

