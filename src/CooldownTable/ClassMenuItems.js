import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import HolyPaladinIcon from '../Images/HolyPaladin.jpg'
import DiscPriestIcon from '../Images/DisciplinePriest.jpg'
import HolyPriestIcon from '../Images/HolyPriest.jpg'
import MistweaverIcon from '../Images/MistWeaverMonk.jpg'
import RestorationDruidIcon from '../Images/RestorationDruid.jpg'
import RestorationShamanIcon from '../Images/RestorationShaman.jpg'

export const classMenus = [
  <MenuItem
    style={{ color: '#F58CBA' }}
    value={'Holy Paladin'}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: '0px 5px 0px 5px',
        verticalAlign: 'middle'
      }}
      src={HolyPaladinIcon}
      alt='Holy Paladin'
    />
      Holy Paladin
  </MenuItem>,
  <MenuItem
    style={{ color: '#FF7D0A' }}
    value={'Restoration Druid'}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: '0px 5px 0px 5px',
        verticalAlign: 'middle'
      }}
      src={RestorationDruidIcon}
      alt='Restoration Druid'
    />
      Restoration Druid
  </MenuItem>,
  <MenuItem
    style={{ color: '#FFFFFF' }}
    value={'Holy Priest'}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: '0px 5px 0px 5px',
        verticalAlign: 'middle'
      }}
      src={HolyPriestIcon}
      alt='Holy Priest'
    />
      Holy Priest
  </MenuItem>,
  <MenuItem
    style={{ color: '#FFFFFF' }}
    value={'Discispline Priest'}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: '0px 5px 0px 5px',
        verticalAlign: 'middle'
      }}
      src={DiscPriestIcon}
      alt='Discispline Priest'
    />
      Discispline Priest
  </MenuItem>,
  <MenuItem
    style={{ color: '#0070DE' }}
    value={'Restoration Shaman'}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: '0px 5px 0px 5px',
        verticalAlign: 'middle'
      }}
      src={RestorationShamanIcon}
      alt='Restoration Shaman'
    />
      Restoration Shaman
  </MenuItem>,
  <MenuItem
    style={{ color: '#00FF96' }}
    value={'Mistweaver Monk'}>
    <img
      style={{
        height: 20,
        width: 20,
        padding: '0px 5px 0px 5px',
        verticalAlign: 'middle'
      }}
      src={MistweaverIcon}
      alt='Mistweaver Monk'
    />
      Mistweaver Monk
  </MenuItem>

]