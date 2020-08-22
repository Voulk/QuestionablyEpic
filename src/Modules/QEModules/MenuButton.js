import React from 'react';
import Button from '@material-ui/core/Button';
import { RSA_PSS_SALTLEN_AUTO } from 'constants';

const style = {
  margin: 7,
  width: 280,
  height: 60,

};

const MainMenuButton = () => (
  <div>
    <Button variant="contained" label="Default" style={style} />

  </div>
);

export default MainMenuButton;