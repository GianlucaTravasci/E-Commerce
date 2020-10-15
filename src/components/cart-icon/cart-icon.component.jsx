//React and libraries import
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

//Redux import 
import { toggleCartHidden } from '../../redux/cart/cart.action'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

//Style import
import { CartContainer, ShoppingIcon, ItemCountContainer } from './cart-icon.styles'

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return(
        <CartContainer onClick={toggleCartHidden}>
            <ShoppingIcon />
            <ItemCountContainer>{itemCount}</ItemCountContainer>
        </CartContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);