import { createSelector } from 'reselect'

const selectShop = state => state.shop;

export const selectShopSection = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectShopSection],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectShopSection],
    collections => (collections ? collections[collectionUrlParam] : null)
)