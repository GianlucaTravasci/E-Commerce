import { takeLatest, put, all, call } from 'redux-saga/effects'

import UserActionTypes from './user.types';
import { signInSuccess, signInFailure, signUpSuccess, signUpFailure } from './user.actions'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.util'

//UTILITY THAT GET THE SNAPSHOT FORM THE USER AUTHENTICATION
export function* getSnapshotFormUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error));
    }
}

//SIGNIN WITH GOOGLE
export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        getSnapshotFormUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

//SIGNIN WITH EMAIL AND PASSWORD
export function* signInWithEmail({ payload: { email, password}}) {
    console.log(email, password)
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFormUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

//USER ALREADY AUTHENTICATED
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return
        yield getSnapshotFormUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

//SIGN UP
export function* signUp({ payload: {email, password, displayName}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: { displayName }}))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({ payload: {user, additionalData}}) {
    yield getSnapshotFormUserAuth((user, additionalData));
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
//ALL SAGAS FOR USER AUTHENTICATION
export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignUpStart), call(onSignUpSuccess)])
}