import React, { useState, } from 'react';
import { Button, Form, Header, Image, Segment, Message } from 'semantic-ui-react'
import * as Validator from '../../utils/validator';
import { request } from '../../utils';

const RegisterForm = ({login}) => {
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const [email, setEmail] = useState('');



  const register = async () => {
    const result = await request('/register', {
      method: 'post',
      body: {email, password,}
    });

    if (result.error) {
      console.error(result.error);
      // show error
    }
    else login();
  }

  const passwordError = password === '' ? null : Validator.password(password);

  return (
    <>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/content/airplane.png' /> Create new account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input required fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            required
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            error={passwordError ? { content: passwordError } : false }
            onChange={(e, {value}) => setPassword(value)}
          />
          <Form.Input
            required
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password again..'
            type='password'
            error={password === rePass || rePass === '' ? false : { content: 'Passwords doesn\'t match'}}
            onChange={(e, { value }) => setRePass(value)}
          />

          <Button color='teal' fluid size='large' onClick={() => register()}>
            Register
          </Button>
        </Segment>
      </Form>

      <Message>
        Already have an account? <a href='void::javascript();' onClick={login}>Sign In</a>
      </Message>
    </>
  );
};

export default RegisterForm;