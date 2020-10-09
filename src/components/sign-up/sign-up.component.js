import React, { Component } from 'react'
import { auth, createUserProfileDocument } from '../../firebase/firebase.util'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss'

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert("Password don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName })
            this.setState = {
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign Up with your email and password</span>

                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    <FormInput handleChange={this.handleChange} name="displayName" type="text" value={displayName} label="Display name" required/>
                    
                    <FormInput handleChange={this.handleChange} name="email" type="email" value={email} label="Email" required/>

                    <FormInput handleChange={this.handleChange} name="password" type="password" value={password} label="Password" required/>
                    
                    <FormInput handleChange={this.handleChange} name="confirmPassword" type="password" value={confirmPassword} label="Confirm Password" required/>

                    <div className="buttons">
                        <CustomButton type="submit">Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp