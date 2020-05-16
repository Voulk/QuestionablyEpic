import React from 'react';

const buttonClicker = (props) => {
  const inputstyle = {
    width: '30.5%',
    height: 25,
    margin: 5,
    boxshadow: '0px 0px 1px 1px #1e1d1f',
  };

  return (<button
  	style= {inputstyle}
  	onClick={props.clicked}>
	Click to load Log
  	</button>
  	);
};

export default buttonClicker;