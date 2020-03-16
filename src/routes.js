import React, { lazy, memo } from 'react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute, ScrollToTop, WithLazyLoader } from 'components'

const Home = WithLazyLoader(lazy(() => import('pages/home')))
// const Faq = WithLazyLoader(lazy(() => import('pages/faq')))
const Cookies = WithLazyLoader(lazy(() => import('pages/cookies')))
const PrivacyPolicy = WithLazyLoader(lazy(() => import('pages/privacyPolicy')))
const TermsAndConditions = WithLazyLoader(
  lazy(() => import('pages/termsAndConditions'))
)
const Pricing = WithLazyLoader(lazy(() => import('pages/pricing')))
const GoBackTo = WithLazyLoader(lazy(() => import('pages/fromEmbed/goBackTo')))
const EmbedLogin = WithLazyLoader(lazy(() => import('pages/fromEmbed/login')))
const Embed = WithLazyLoader(lazy(() => import('pages/embed')))
const RunProject = WithLazyLoader(lazy(() => import('pages/runProject')))
const Editor = WithLazyLoader(lazy(() => import('pages/editor')))
const Dashboard = WithLazyLoader(lazy(() => import('pages/dashboard')))
const Plans = WithLazyLoader(lazy(() => import('pages/plans')))
const FromEmailInvitation = WithLazyLoader(
  lazy(() => import('pages/welcome/fromEmailInvitation'))
)
const Login = WithLazyLoader(lazy(() => import('pages/welcome/login')))
const OrganizationName = WithLazyLoader(
  lazy(() => import('pages/welcome/organizationName'))
)
const TeamName = WithLazyLoader(lazy(() => import('pages/welcome/teamName')))
const TeamMembers = WithLazyLoader(
  lazy(() => import('pages/welcome/teamMembers'))
)
const HelloThere = WithLazyLoader(
  lazy(() => import('pages/welcome/helloThere'))
)
const NotFound = WithLazyLoader(lazy(() => import('pages/notFound')))

const Strove = () => (
  <>
    <ScrollToTop />
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/faq" component={Faq} /> */}
      <Route path="/cookies" component={Cookies} />
      <Route path="/privacyPolicy" component={PrivacyPolicy} />
      <Route path="/termsAndConditions" component={TermsAndConditions} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/fromEmbed/goBackTo" component={GoBackTo} />
      <Route path="/fromEmbed/login" component={EmbedLogin} />
      <Route exact path="/embed" component={Embed} />
      <Route path="/embed/runProject" component={RunProject} />
      <Route path="/embed/editor" component={Editor} />
      <PrivateRoute path="/app/editor" component={Editor} />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <PrivateRoute path="/app/plans" component={Plans} />
      <Route path="/welcome/login" component={Login} />
      <PrivateRoute
        path="/welcome/organizationName"
        component={OrganizationName}
      />
      <PrivateRoute path="/welcome/teamName" component={TeamName} />
      <PrivateRoute path="/welcome/teamMembers" component={TeamMembers} />
      <PrivateRoute path="/welcome/helloThere" component={HelloThere} />
      <Route path="/fromEmailInvitation" component={FromEmailInvitation} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default memo(Strove)
