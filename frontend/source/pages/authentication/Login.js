import React, { useContext, useState, } from 'react';
import { Button, Form, Header, Image, Segment, Message } from 'semantic-ui-react'
import { request } from '../../utils';

import { globalContext } from '../../App'; 

const LoginForm = ({register}) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { setCurrentIndex, setUser, } = useContext(globalContext);

  const login = async () => {

    const result = await request('/login', {
      method: 'post',
      body: {username, password,}
    });

    if (result.error) {
      console.error(result.error);
      // show error
    }
    else {
      window.localStorage.setItem('flapper-token', result.token);
      window.localStorage.setItem('flapper-user', JSON.stringify(result.user));
      setUser(result.user);
      setCurrentIndex(1);
    }
  } 
  return (
    <>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/content/airplane.png' /> Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
            fluid icon='user' 
            iconPosition='left' 
            onChange={(e, {value}) => setUsername(value)}
            placeholder='Username'/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            onChange={(e, {value}) => setPassword(value)}
            type='password'
          />

          <Button color='teal' fluid size='large' onClick={login}>
            Login
          </Button>
        </Segment>
      </Form>

      <Message>
        New to us? <a href='void::javascript();' onClick={register}>Sign Up</a>
      </Message>
    </>
  );
};

export default LoginForm;