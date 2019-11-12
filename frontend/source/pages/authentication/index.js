import React, { useState, } from 'react';
import { Grid, Message, } from 'semantic-ui-react';

import LoginForm from './Login';
import RegisterForm from './Register';

const Authentication = (props) => {
  const [mode, setMode] = useState('login');

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        {mode === 'login' ? <LoginForm register={() => setMode('register')} /> : <RegisterForm login={() => setMode('login')}/> }
      </Grid.Column>
    </Grid>
  );
};

export default Authentication;