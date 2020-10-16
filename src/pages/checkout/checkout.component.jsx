import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

import { selectCartItems, selectCartTotalPrice } from '../../redux/cart/cart.selectors'

import { CheckoutPageContainer, CheckoutHeaderContainer, HeaderBlockConatiner, TotalContainer, TestWarningContainer } from './checkout.styles'

const CheckoutPage = ({cartItems, total}) => {
    return (
        <CheckoutPageContainer>
            <CheckoutHeaderContainer>
                <HeaderBlockConatiner>
                    <span>Product</span>
                </HeaderBlockConatiner>
                <HeaderBlockConatiner>
                    <span>Description</span>
                </HeaderBlockConatiner>
                <HeaderBlockConatiner>
                    <span>Quantity</span>
                </HeaderBlockConatiner>
                <HeaderBlockConatiner>
                    <span>Price</span>
                </HeaderBlockConatiner>
                <HeaderBlockConatiner>
                    <span>Remove</span>
                </HeaderBlockConatiner>
            </CheckoutHeaderContainer>
            {
                cartItems.map(cartItem=> 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
            }

            <TotalContainer>
                <span>TOTAL: €{total}</span>
            </TotalContainer>
            <TestWarningContainer>
                *Please use the following test credit card for payments*
                <br></br>
                4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
            </TestWarningContainer>
            <div>
                <StripeCheckoutButton price={total}/>
            </div>
        </CheckoutPageContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotalPrice
})

export default connect(mapStateToProps)(CheckoutPage);