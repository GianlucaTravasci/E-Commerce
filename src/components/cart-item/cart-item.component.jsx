import React from 'react';

import { CartItemContainer, CartItemImage, CartItemDetails, CartItemName } from './cart-item.styles';

const MemoizedCartItem = React.memo(function CartItem({item: {imageUrl, price, name, quantity}}) {
    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt={name}/>
            <CartItemDetails>
                <CartItemName>{name}</CartItemName>
                <span className="price">{quantity} x €{price}</span>
            </CartItemDetails>
        </CartItemContainer>
    )
})

export default MemoizedCartItem; 
//memoized the render of the array becouse after an "ADD_ITEM" action, the cart dropdown is rerendered with the new item so i want to not rerender every time.