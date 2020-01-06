import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { Switch, Route } from 'react-router-dom'
import {
  Home,
  Faq,
  Embed,
  NotFound,
  Cookies,
  PrivacyPolicy,
  TermsAndConditions,
  Login,
  RunProject,
  Pricing,
  Editor,
  FromEmailInvitation,
} from 'pages'

import { PrivateRoute, Dashboard } from 'components'

import Wrapper from './wrapper'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const Strove = () => (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/faq" component={Faq} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/privacyPolicy" component={PrivacyPolicy} />
      <Route path="/termsAndConditions" component={TermsAndConditions} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/fromEmbed/login" component={Login} />
      <Route exact path="/embed" component={Embed} />
      <Route path="/embed/runProject" component={RunProject} />
      <Route path="/embed/editor" component={Editor} />
      <PrivateRoute path="/app/editor" component={Editor} />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <Route path="/fromEmailInvitation" component={FromEmailInvitation} />
      <Route component={NotFound} />
    </Switch>
  </Wrapper>
)

export default Strove
