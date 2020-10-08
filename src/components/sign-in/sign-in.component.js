import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle} from '../../firebase/firebase.util';

import './sign-in.style.scss'

class SignIn extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        } catch (error) {
            console.error(error)
        }

        
    }

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }

    render() {
        const { email, password } = this.state;
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} name="email" type="email" value={email} label="Email" required/>
                    
                    <FormInput handleChange={this.handleChange} name="password" type="password" value={password} label="Password" required/>

                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton isGoogleSignin onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                    </div>
                </form> 
            </div>
        )
    }
}

export default SignIn