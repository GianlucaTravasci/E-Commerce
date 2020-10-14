import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HcBNOGZWE2AjfAYFBqpg8sgvvdVrGnClKvdsxxFJtqijrEw4m4IUcPQPqeLIsJfkZhN5qIe7DTgR6hZrLJeljkC00Elsxejqg';

    const onToken = token =>{
        console.log(token)
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="Wishdress"
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`The total is €${price}`}
            amount={priceForStripe}
            panelLabel='PayNow'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;