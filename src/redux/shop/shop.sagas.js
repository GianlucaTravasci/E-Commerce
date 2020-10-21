import { takeLatest, call, put } from 'redux-saga/effects'  
//take every action of a specific type, 
//call is the effect inside the generator function that invocs the methods (i use this method instead of convertCollectionsSnapshoptToMap(snapshot) to yield the function if it take to long when he try to access data in database) 
//put is the effect for creating fucntions is === dispatch
import ShopActionTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.util'

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionsAsync)
}