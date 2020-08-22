import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
  return (
    <div className='UserOutput'>
  	<p> Current report: { props.reportid } </p>
  	<p> Boss: { props.boss } </p>
   	</div>
  );
};

export default userOutput
