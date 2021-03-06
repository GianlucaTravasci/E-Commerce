import React, {useState} from 'react';
import { connect } from 'react-redux'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { SignInContainer, SignInTitle, ButtonsBarContainer} from './sign-in.styles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [ userCredential, setUserCredential ] = useState({
    email: '',
    password: ''
  });

  const { email, password }= userCredential

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setUserCredential({ ...userCredential, [name]: value });
  };
  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton type='button' onClick={googleSignInStart} isGoogleSignin>
            Google Sign In 
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
}

const mapDispatchToProps = dispacth => ({
  googleSignInStart: () => dispacth(googleSignInStart()),
  emailSignInStart: (email, password) => dispacth(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);