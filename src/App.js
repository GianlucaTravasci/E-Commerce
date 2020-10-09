import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup'
import {auth, createUserProfileDocument} from './firebase/firebase.util'
import { setCurrentUser } from './redux/user/user.actions'

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

class App extends Component {
  
  unsubscribeFromAuth=null;
  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(user)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route path="/signin">
            <SignInAndSignUpPage />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(App);
