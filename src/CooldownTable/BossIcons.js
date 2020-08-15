import React from "react";
import MautIcon from "../Images/Bosses/Nya'lotha/Maut.jpg"
import XaneshIcon from "../Images/Bosses/Nya'lotha/Xanesh.jpg"
import WrathionIcon from "../Images/Bosses/Nya'lotha/Wrathion.jpg"
import RadenIcon from "../Images/Bosses/Nya'lotha/Raden.jpg"
import HivemindIcon from "../Images/Bosses/Nya'lotha/Hivemind.jpg"
import SkitraIcon from "../Images/Bosses/Nya'lotha/Skitra.jpg"

import ShadharIcon from "../Images/Bosses/Nya'lotha/Shadhar.jpg"
import VexionaIcon from "../Images/Bosses/Nya'lotha/Vexiona.jpg"
import CarapaceIcon from "../Images/Bosses/Nya'lotha/Carapace.jpg"
import DrestagathIcon from "../Images/Bosses/Nya'lotha/Drestagath.jpg"
import NzothIcon from "../Images/Bosses/Nya'lotha/Nzoth.jpg"
import IlgynothIcon from "../Images/Bosses/Nya'lotha/Ilgynoth.jpg"


export default function bossIcons(props) {
  // Ny'alotha, the Waking City 
  if (props === 2327) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={MautIcon}
        alt='Maut'
      />
    )
  }

  // Dark Inquisitor Xanesh
  if (props === 2328) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={XaneshIcon}
        alt='Dark Inquisitor Xanesh'
      />
    )
  }

  // Wrathion
  if (props === 2329) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={WrathionIcon}
        alt='Wrathion'
      />
    )
  }

  // Ra-den the Despoiled
  if (props === 2331) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={RadenIcon}
        alt='Ra-den the Despoiled'
      />
    )
  }

  // The Hivemind
  if (props === 2333) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={HivemindIcon}
        alt='The Hivemind'
      />
    )
  }

  // Prophet Skitra
  if (props === 2334) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={SkitraIcon}
        alt='Prophet Skitra'
      />
    )
  }

  // Shad'har the Insatiable
  if (props === 2335) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={ShadharIcon}
        alt="Shad'har the Insatiable"
      />
    )
  }

  // Vexiona
  if (props === 2336) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={VexionaIcon}
        alt='Vexiona'
      />
    )
  }

  // Carapace of N'Zoth
  if (props === 2337) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={CarapaceIcon}
        alt="Carapace of N'Zoth"
      />
    )
  }

  // "Drest'agath"
  if (props === 2343) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={DrestagathIcon}
        alt="Drest'agath"
      />
    )
  }

  // "N'Zoth the Corruptor"
  if (props === 2344) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={NzothIcon}
        alt="N'Zoth the Corruptor"
      />
    )
  }

  // "Il'gynoth, Corruption Reborn"
  if (props === 2345) {
    return (
      <img
        style={{
          height: 20,
          width: 20,
          padding: '0px 5px 0px 5px',
          verticalAlign: 'middle'
        }}
        src={IlgynothIcon}
        alt="Il'gynoth, Corruption Reborn"
      />
    )
  }
}
