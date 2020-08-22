import React from "react";
import AuraMasteryIcon from '../../../Images/AuraMastery.jpg'
import AvengingWrathIcon from '../../../Images/AvengingWrath.jpg'
import DivineHymnIcon from '../../../Images/DivineHymn.jpg'
import EvangelismIcon from '../../../Images/Evangelism.jpg'
import HealingTideTotemIcon from '../../../Images/HealingTideTotem.jpg'
import PowerWordBarrierIcon from '../../../Images/PowerWordBarrier.jpg'
import RevivalIcon from '../../../Images/Revival.jpg'
import SalvationIcon from '../../../Images/Salvation.jpg'
import SpiritLinkTotemIcon from '../../../Images/SpiritLinkTotem.jpg'
import TranquilityIcon from '../../../Images/Tranquility.jpg'
import TreeofLifeIcon from '../../../Images/TreeofLife.jpg'
import DivineTollIcon from '../../../Images/DivineToll.jpg'
import AshenHallowIcon from '../../../Images/AshenHallow.jpg'
import VanquishersHammerIcon from '../../../Images/VanquishersHammer.jpg'
import BlessingOfSeasonsIcon from '../../../Images/BlessingOfSeasons.jpg'
import KindredSpiritsIcon from '../../../Images/KindredSpirits.jpg'
import RavenousFrenzyIcon from '../../../Images/RavenousFrenzy.jpg'
import AdaptiveSwarmIcon from '../../../Images/AdaptiveSwarm.jpg'
import ConvokeTheSpiritsIcon from '../../../Images/ConvokeTheSpirits.jpg'
import BoonoftheAscendedIcon from '../../../Images/BoonoftheAscended.jpg'
import MindgamesIcon from '../../../Images/Mindgames.jpg'
import UnholyNovaIcon from '../../../Images/UnholyNova.jpg'
import FaeBlessingsIcon from '../../../Images/FaeBlessings.jpg'
import VesperTotemIcon from '../../../Images/VesperTotem.jpg'
import ChainHarvestIcon from '../../../Images/ChainHarvest.jpg'
import PrimordialWaveIcon from '../../../Images/PrimordialWave.jpg'
import FaeTransfusionIcon from '../../../Images/FaeTransfusion.jpg'
import WeaponsofOrderIcon from '../../../Images/WeaponsofOrder.jpg'
import FallenOrderIcon from '../../../Images/FallenOrder.jpg'
import BonedustBrewIcon from '../../../Images/BonedustBrew.jpg'
import FaelineStompIcon from '../../../Images/FaelineStomp.jpg'

// Probably a better way / optimised way of doing this in one line referencing the array in data.js but works for now - Ptolemy
// Probably something long the lines of passing the prop to the map filter - Ptolemy

export default function abilityicons(props) {
	 // Paladin Cooldowns 
  if (props === 'Aura Mastery') {
    return (
      <div>
        <a data-wowhead='spell=31821'>
          <img
            style={{
              height: 20,
              width: 20,
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
              height: 20,
              width: 20,
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

  // Paladin Covenant Cooldowns

  if (props === 'Divine Toll') {
    return (
      <div>
        <a data-wowhead='spell=304971'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={DivineTollIcon}
            alt='Divine Toll'
          />
        </a>
        Divine Toll
      </div>
    )
  }

  if (props === 'Ashen Hallow') {
    return (
      <div>
        <a data-wowhead='spell=316958'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={AshenHallowIcon}
            alt='Ashen Hallow'
          />
        </a>
        Ashen Hallow
      </div>
    )
  }

  if (props === "Vanquisher's Hammer") {
    return (
      <div>
        <a data-wowhead='spell=31821'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={VanquishersHammerIcon}
            alt="Vanquisher's Hammer"
          />
        </a>
        Vanquisher's Hammer
      </div>
    )
  }

  if (props === 'Blessing of the Seasons') {
    return (
      <div>
        <a data-wowhead='spell=328278'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={BlessingOfSeasonsIcon}
            alt='Blessing of the Seasons'
          />
        </a>
        Blessing of the Seasons
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
              height: 20,
              width: 20,
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
              height: 20,
              width: 20,
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

  // Druid Covenant Cooldowns

  if (props === 'Kindred Spirits') {
    return (
      <div>
        <a data-wowhead='spell=326434'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={KindredSpiritsIcon}
            alt='Kindred Spirits'
          />
        </a>
        Kindred Spirits
      </div>
    )
  }

  if (props === 'Ravenous Frenzy') {
    return (
      <div>
        <a data-wowhead='spell=323546'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={RavenousFrenzyIcon}
            alt='Ravenous Frenzy'
          />
        </a>
        Ravenous Frenzy
      </div>
    )
  }

  if (props === 'Adaptive Swarm') {
    return (
      <div>
        <a data-wowhead='spell=325727'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={AdaptiveSwarmIcon}
            alt='Adaptive Swarm'
          />
        </a>
        Ravenous Frenzy
      </div>
    )
  }

  if (props === 'Convoke the Spirits') {
    return (
      <div>
        <a data-wowhead='spell=323764'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={ConvokeTheSpiritsIcon}
            alt='Convoke the Spirits'
          />
        </a>
        Convoke the Spirits
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
              height: 20,
              width: 20,
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
              height: 20,
              width: 20,
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
              height: 20,
              width: 20,
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
              height: 20,
              width: 20,
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

  // Priest Covenant Abilities

  if (props === 'Boon of the Ascended') {
    return (
      <div>
        <a data-wowhead='spell=325013'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={BoonoftheAscendedIcon}
            alt='Boon of the Ascended'
          />
        </a>
        Boon of the Ascended
      </div>
    )
  }

  if (props === 'Mindgames') {
    return (
      <div>
        <a data-wowhead='spell=323673'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={MindgamesIcon}
            alt='Mindgames'
          />
        </a>
        Mindgames
      </div>
    )
  }

  if (props === 'Unholy Nova') {
    return (
      <div>
        <a data-wowhead='spell=324724'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={UnholyNovaIcon}
            alt='Unholy Nova'
          />
        </a>
        Unholy Nova
      </div>
    )
  }

  if (props === 'Fae Blessings') {
    return (
      <div>
        <a data-wowhead='spell=327661'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={FaeBlessingsIcon}
            alt='Fae Blessings'
          />
        </a>
        Fae Blessings
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
              height: 20,
              width: 20,
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
              height: 20,
              width: 20,
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

  // Shaman Covenant Abilities

  if (props === 'Vesper Totem') {
    return (
      <div>
        <a data-wowhead='spell=324386'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={VesperTotemIcon}
            alt='Vesper Totem'
          />
        </a>
        Vesper Totem
      </div>
    )
  }

  if (props === 'Chain Harvest') {
    return (
      <div>
        <a data-wowhead='spell=320674'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={ChainHarvestIcon}
            alt='Chain Harvest'
          />
        </a>
        Chain Harvest
      </div>
    )
  }

  if (props === 'Primordial Wave') {
    return (
      <div>
        <a data-wowhead='spell=326059'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={PrimordialWaveIcon}
            alt='Primordial Wave'
          />
        </a>
        Primordial Wave
      </div>
    )
  }

  if (props === 'Fae Transfusion') {
    return (
      <div>
        <a data-wowhead='spell=328923'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={FaeTransfusionIcon}
            alt='Fae Transfusion'
          />
        </a>
        Fae Transfusion
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
              height: 20,
              width: 20,
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

  // Monk Covenant Abilities

  if (props === 'Weapons of Order') {
    return (
      <div>
        <a data-wowhead='spell=310454'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={WeaponsofOrderIcon}
            alt='Weapons of Order'
          />
        </a>
        Weapons of Order
      </div>
    )
  }

  if (props === 'Fallen Order') {
    return (
      <div>
        <a data-wowhead='spell=326860'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={FallenOrderIcon}
            alt='Fallen Order'
          />
        </a>
        Fallen Order
      </div>
    )
  }

  if (props === 'Bonedust Brew') {
    return (
      <div>
        <a data-wowhead='spell=325216'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={BonedustBrewIcon}
            alt='Bonedust Brew'
          />
        </a>
        Bonedust Brew
      </div>
    )
  }

  if (props === 'Faeline Stomp') {
    return (
      <div>
        <a data-wowhead='spell=327104'>
          <img
            style={{
              height: 20,
              width: 20,
              padding: '0px 5px 0px 5px',
              verticalAlign: 'middle'
            }}
            src={FaelineStompIcon}
            alt='Faeline Stomp'
          />
        </a>
        Faeline Stomp
      </div>
    )
  }
}

