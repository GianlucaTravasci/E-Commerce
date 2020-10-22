import { takeLatest, put, all, call } from 'redux-saga/effects'

import UserActionTypes from './user.types';
import { signInSuccess, signInFailure } from './user.actions'

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.util'

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

//ALL SAGAS FOR USER AUTHENTICATION
export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}