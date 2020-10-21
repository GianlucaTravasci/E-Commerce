import { takeLatest, put, all, call } from 'redux-saga/effects'

import UserActionTypes from './user.types';
import { googleSignInSuccess, googleSignInFailure, emailSignInSuccess, emailSignInFailure } from './user.actions'

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.util'

//SIGNIN WITH GOOGLE
export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(googleSignInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

//SIGNIN WITH EMAIL AND PASSWORD
export function* signInWithEmail({ payload: { email, password } }) {
    try {
        console.log('sagas', password)
        //const { user } = yield auth.signInWithEmailAndPassword(email, password);
        //const userRef = yield call(createUserProfileDocument, user);
        //const userSnapshot = yield userRef.get();
        //yield put(emailSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(emailSignInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

//ALL SAGAS FOR USER AUTHENTICATION
export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}