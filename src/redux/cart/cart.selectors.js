import { createSelector } from 'reselect'

//Selecto only a small peace of the state in order to pass it to the needed component with some action that could be usefull in differnet part of the app.
const selectCart = state => state.cart;


export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)