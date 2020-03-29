import React from 'react';

const userInput = (props) => {
  const inputstyle = {
    width: '30.5%',
    border: '2px solid red'
  };

  return (<input
  	type='text'
  	style= {inputstyle}
  	onChange={props.changed}
  	value={props.loglink}
  	/>);

};

export default userInput;