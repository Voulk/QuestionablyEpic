import React from 'react';

const userInput = (props) => {
  const inputstyle = {
    width: '30.5%',
    border: '1px solid red',
    boxshadow: '0px 0px 1px 1px #1e1d1f',
    
  };

  return (<input
  	type='text'
  	style= {inputstyle}
  	onChange={props.changed}
  	value={props.loglink}
  	/>);

};

export default userInput;