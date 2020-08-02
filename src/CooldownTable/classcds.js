import React from "react";
import { MenuItem } from "@material-ui/core";

const hpal = ['Aura Matery', 'Avenging Wrath']


export default function classcds(props) {
	 // Paladin Cooldowns 
  if (props === 'Holy Paladin') {
    return (
      		[<MenuItem value={'Aura Mastery'}> Aura Mastery </MenuItem>,
     		  <MenuItem value={'Avenging Wrath'}> Avenging Wrath </MenuItem>]
	 )
  }

  // Restoration Druid
  if (props === 'Restoration Druid') {
 	 return (
        	[<MenuItem value={'Tranquility'}> Tranquility </MenuItem>,
        	<MenuItem value={'Tree of Life'}> Tree of Life </MenuItem>]
 	 )
  }

  // Holy Priest
  if (props === 'Holy Priest') {
  	return (
        	[<MenuItem value={'Holy Word: Salvation'}> Holy Word: Salvation </MenuItem>,
        	<MenuItem value={'Divine Hymn'}> Divine Hymn </MenuItem>]
 	 )
  }

  // Discipline Priest
  if (props === 'Discispline Priest') {
  	return (
        	[<MenuItem value={'Power Word: Barrier'}> Power Word: Barrier </MenuItem>,
        	<MenuItem value={'Evangelism'}> Evangelism </MenuItem>]
    )
  }
  // Restoration Shaman
  if (props === 'Restoration Shaman') {
  	return (
        	[<MenuItem value={'Healing Tide Totem '}> Healing Tide Totem </MenuItem>,
        	<MenuItem value={'Spirit Link Totem'}> Spirit Link Totem </MenuItem>]
    )
  }

  // Mistweaver Monk
  if (props === 'Mistweaver Monk') {
  	return (
        	[<MenuItem value={'Revival'}> Revival </MenuItem>]
  	)
  }
}

