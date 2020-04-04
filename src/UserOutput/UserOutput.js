import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
  return (
    <div className='UserOutput'>
  	<p> Current Log: { props.logactuallink } </p>
  	<p> Current report: { props.reportid } </p>
  	<p>Current Time: { props.time } </p>
  	<p>Current Time: { props.timeend } </p>
   	</div>
  );
};

export default userOutput
