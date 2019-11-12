import React, { useContext, } from 'react';
import { Button, Form, Header, Image, Segment, Message } from 'semantic-ui-react'

import { globalContext } from '../../App'; 

const LoginForm = ({register}) => {
  const { setAuthentication } = useContext(globalContext);

  return (
    <>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/content/airplane.png' /> Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
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