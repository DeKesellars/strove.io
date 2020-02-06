import React, { useState } from 'react'
import styled from 'styled-components/macro'
import {
  CardElement,
  injectStripe,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements'
import { useSelector, useDispatch } from 'react-redux'

import { selectors } from 'state'
import { mutation } from 'utils'
import {
  STRIPE_SUBSCRIBE,
  STRIPE_CLIENT_SECRET,
  CHANGE_PAYMENT_INFO,
} from 'queries'
import StroveButton from 'components/stroveButton.js'

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const StripeElementContainer = styled.div`
  width: 100%;
  margin: 5px 0px;
  padding: 1px;
  border-radius: 2px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-width: 1px;
  border-style: solid;
`

const StripeCcvSontainer = styled(StripeElementContainer)`
  width: 30%;
`

const StripeExpiryContainer = styled(StripeElementContainer)`
  width: 50%;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const cardStyle = {
  base: {
    height: '200px',
    iconColor: '#c4f0ff',
    color: '##0072ce',
    fontWeight: 500,
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: 'rgba(185,185,185,0.65)',
    },
    '.inputContainer': {
      border: '5px solid red',
    },
  },
  invalid: {
    iconColor: '#FFC7EE',
    color: '#FFC7EE',
  },
}

const CheckoutForm = props => {
  const [cardNumber, setCardNumber] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const user = useSelector(selectors.api.getUser)
  const dispatch = useDispatch()

  // This starts the flow for paymentInfo change or adding new paymentInfo without interacting with subscription
  const getSecret = async () => {
    dispatch(
      mutation({
        name: 'clientSecret',
        query: STRIPE_CLIENT_SECRET,
        dataSelector: data => data.getClientSecret,
        onSuccess: data => changePaymentInfo(data),
      })
    )
  }

  // This continues the flow of previous function
  const changePaymentInfo = async clientSecret => {
    const { setupIntent, error } = await props.stripe.confirmCardSetup(
      clientSecret,
      {
        payment_method: {
          card: cardNumber,
          billing_details: {
            email: user.email,
          },
        },
      }
    )

    if (error) {
      // Display error.message in your UI.
    } else {
      if (setupIntent.status === 'succeeded') {
        // The setup has succeeded. Display a success message. Send
        // setupIntent.payment_method to your server to save the card to a Customer
        // !!! Add organizationId to mutation dispatch below !!!
        dispatch(
          mutation({
            name: 'changePaymentInfo',
            mutation: CHANGE_PAYMENT_INFO,
            variables: {
              paymentMethod: setupIntent.payment_method,
              // organizationId: ...
            },
            dataSelector: data => data.changePaymentInfo,
            onSuccess: data => console.log(data),
          })
        )
      }
    }
  }

  // This starts the flow for getting new subscription
  const submit = async event => {
    const { paymentMethod, error } = await props.stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
      billing_details: {
        email: user.email,
      },
    })

    if (error) {
      setError(true)
      return console.log('Error happened on paymentMethod creation!', error)
    }

    dispatch(
      mutation({
        name: 'stripeSubscription',
        mutation: STRIPE_SUBSCRIBE,
        variables: {
          paymentMethod: paymentMethod.id,
          plan: 'plan_GYjzUWz4PmzdMg',
          // ^ this plan is should be replaced with the one customer chose
          // both plans are stored in .env file
        },
        dataSelector: data => data.stripeSubscribe,
        onSuccess: data => handleResponse(data),
      })
    )
  }

  // Function continuing flow from function above, also use it for renewSubscription - probably not necessary but do it just in case
  const handleResponse = async response => {
    const { client_secret, status } = response

    if (status === 'requires_action') {
      props.stripe.confirmCardPayment(client_secret).then(function(result) {
        if (result.error) {
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc)
          console.log('Error on confirmCardPayment', result.error)
          setError(true)
        } else {
          // Additional confirmation was successful
          setSuccess(true)
        }
      })
    } else {
      setSuccess(true)
    }
  }

  // Necessary to load up data from card Element
  const handleReady = element => {
    setCardNumber(element)
    console.log('TCL: element', element)
  }

  // Needs improvemnts look-wise, good luck Matthew :)
  return (
    <div>
      {user?.email && !success && (
        <div className="checkout">
          <CardInfoWrapper>
            <Text>Would you like to complete the purchase?</Text>
            {/* <CardElement onReady={handleReady} style={cardStyle} /> */}
            <StripeElementContainer>
              <CardNumberElement style={cardStyle} onReady={handleReady} />
            </StripeElementContainer>
            <VerticalDivider>
              <StripeExpiryContainer>
                <CardExpiryElement style={cardStyle} />
              </StripeExpiryContainer>

              <StripeCcvSontainer>
                <CardCVCElement style={cardStyle} />
              </StripeCcvSontainer>
            </VerticalDivider>
            <StroveButton
              isPrimary
              fontSize="0.8rem"
              padding="1px 3px"
              minWidth="80px"
              maxWidth="80px"
              margin="0px"
              borderRadius="2px"
              onClick={submit}
              text="Purchase"
            />
          </CardInfoWrapper>
        </div>
      )}
      {error && (
        <div>
          <p>Could not process card data!</p>
        </div>
      )}
      {success && (
        <div>
          <p>Subscribed successfully</p>
        </div>
      )}
    </div>
  )
}

const FormWithStripe = injectStripe(CheckoutForm)

export default () => (
  <Elements>
    <FormWithStripe />
  </Elements>
)
