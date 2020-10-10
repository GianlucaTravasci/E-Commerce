export const addItemToCart = (cartItem, cartItemToAdd) => {
    const existingCartITem=cartItem.find(cartItem => cartItem.id === cartItemToAdd.id)
    if (existingCartITem) {
        return cartItem.map(cartItem => 
            cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity +1 } : cartItem
        ) 
    }

    return[...cartItem, {...cartItemToAdd, quantity: 1}];
}