//React and libraries import
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

//Components import
import CartItem from '../cart-item/cart-item.component'

//Redux import 
import { toggleCartHidden } from '../../redux/cart/cart.action'
import { selectCartItems } from '../../redux/cart/cart.selectors'

//Style import
import { CartDropdownContainer, CartItemsContainer, EmptyMessage, CartDropdownButton } from './cart-dropdown.styles';

const CartDropdown = ({cartItems, history, dispatch}) => {
    return(
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ? 
                        (cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} item={cartItem}/>
                        )))
                    :
                        (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItemsContainer> 
            <CartDropdownButton 
                onClick={() => {
                    history.push('/checkout'); 
                    dispatch(toggleCartHidden())
                }}
            >
                CHECKOUT
            </CartDropdownButton>
        </CartDropdownContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));