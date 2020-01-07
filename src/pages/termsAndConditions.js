import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import Footer from 'components/home/footer'
import { SEO, Header } from 'components'

const TextWell = styled.div`
  align-self: center;
  color: ${({ theme }) => theme.colors.c3};
  height: auto;
  width: 60vw;
  margin: 3vw 7.5vw 0 7.5vw;
  padding: 3vh;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: ${({ theme }) => theme.colors.c2};
  font-size: 20px;
`

const StyledH1 = styled.h1`
  letter-spacing: 0.6px;
`

const Legal = () => (
  <>
    <SEO title="Terms And Conditions" />
    <Header />
    <TextWell>
      <StyledH1>Terms and Conditions</StyledH1>
      <h6>Last Edited on 2020-01–05</h6>
      <p>
        These Terms and Conditions govern your relationship with
        https://strove.io website the "Service" and the creation service therein
        operated by Strove. Please read these Terms and Conditions carefully
        before using the Service. Your access to and use of the Service is
        conditioned on your acceptance of and compliance with these Terms. These
        Terms apply to all visitors, users and others who access or use the
        Service. Any information submitted by you shall be subject to Strove’s
        Privacy Policy. One person or legal entity may not maintain more than
        one Account. Accounts registered by “bots” or other automated methods
        are not permitted. By accessing or using the Service you agree to be
        bound by these Terms. If you disagree with any part of the terms then
        you may not access the Service.
      </p>
      <h2>Subscriptions</h2>
      <p>
        Some parts of the Service are billed on a subscription basis
        Subscription(s). You will be billed in advance on a recurring and
        periodic basis. Billing cycles are set on a monthly basis.
      </p>
      <p>
        At the end of each Billing Cycle, your Subscription will automatically
        renew under the exact same conditions unless you cancel it or Strove
        cancels it. You may cancel your Subscription renewal either through your
        online account management page or by contacting customer support team.
      </p>
      <p>
        A valid payment method, including credit card, is required to process
        the payment for your Subscription. You shall provide Strove with
        accurate and complete billing information including full name, zip code,
        and a valid payment method information. By submitting such payment
        information, you automatically authorize Strove to charge all
        Subscription fees incurred through your account to any such payment
        instruments.
      </p>
      <p>
        Should automatic billing fail to occur for any reason, Strove will issue
        an electronic invoice indicating that you must proceed manually, within
        a certain deadline date, with the full payment corresponding to the
        billing period as indicated on the invoice.
      </p>
      <h2>Fee Changes</h2>
      <p>
        Strove, in its sole discretion and at any time, may modify the
        Subscription fees for the Subscriptions. Any Subscription fee change
        will become effective at the end of the then-current Billing Cycle.
      </p>
      <p>
        Strove will provide you with a reasonable prior notice of any change in
        Subscription fees to give you an opportunity to terminate your
        Subscription before such change becomes effective.
      </p>
      <p>
        Your continued use of the Service after the Subscription fee change
        comes into effect constitutes your agreement to pay the modified
        Subscription fee amount.
      </p>
      <h2>Refunds</h2>
      <p>
        Certain refund requests for Subscriptions may be considered by Strove on
        a case-by-case basis and granted in sole discretion of Strove
      </p>
      <h2>Content</h2>
      <p>
        Our Service allows you to post, link, store, share and otherwise make
        available certain information, text, graphics, videos, or other
        material. You are responsible for the Content that you post to the
        Service, including its legality, reliability, and appropriateness.
      </p>
      <p>
        By posting Content to the Service, you grant us and other users of the
        Service the right and the license to use, modify, publicly perform,
        publicly display, reproduce, and distribute such Content on and through
        the Service. Such Content shall be licensed upon the terms of the MIT
        licence. You retain any and all of your rights to any Content you
        submit, post or display on or through the Service and you are
        responsible for protecting those rights. You agree that this license
        includes the right for us to make your Content available to other users
        of the Service, who may also use your Content subject to these Terms. If
        you specifically save a project as private to Strove, and that project
        has never been public on Strove or anywhere else, the code in that
        particular project is unlicensed.
      </p>
      <p>
        You represent and warrant that: (i) the Content is yours (you own it) or
        you have the right to use it and grant us the rights and license as
        provided in these Terms, and (ii) the posting of your Content on or
        through the Service does not violate the privacy rights, publicity
        rights, copyrights, contract rights or any other rights of any person.
      </p>
      <h2>Accounts</h2>
      <p>
        When you create an account with us, you must provide us information that
        is accurate, complete, and current at all times. Failure to do so
        constitutes a breach of the Terms, which may result in immediate
        termination of your account on our Service.
      </p>
      <p>
        You are responsible for safeguarding the password that you use to access
        the Service and for any activities or actions under your password,
        whether your password is with our Service or a third-party service.
      </p>
      <p>
        You agree not to disclose your password to any third party. You must
        notify us immediately upon becoming aware of any breach of security or
        unauthorized use of your account.
      </p>
      <h2>Links To Other Web Sites</h2>
      <p>
        Our Service may contain links to third-party web sites or services that
        are not owned or controlled by Strove.
      </p>
      <p>
        (Strove).has no control over, and assumes no responsibility for, the
        content, privacy policies, or practices of any third party web sites or
        services. You further acknowledge and agree that Strove shall not be
        responsible or liable, directly or indirectly, for any damage or loss
        caused or alleged to be caused by or in connection with use of or
        reliance on any such content, goods or services available on or through
        any such web sites or services.
      </p>
      <p>
        We strongly advise you to read the terms and conditions and privacy
        policies of any third-party web sites or services that you visit.
      </p>
      <h2>Termination</h2>
      <p>
        We may terminate or suspend your account immediately, without prior
        notice or liability, for any reason whatsoever, including without
        limitation if you breach the Terms.
      </p>
      <p>
        Upon termination, your right to use the Service will immediately cease.
        If you wish to terminate your account, you may simply discontinue using
        the Service.
      </p>
      <h2>Limitation Of Liability</h2>
      <p>
        In no event shall Strove, nor its directors, employees, partners,
        agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from (i) your access to or use of or
        inability to access or use the Service; (ii) any conduct or content of
        any third party on the Service; (iii) any content obtained from the
        Service; and (iv) unauthorized access, use or alteration of your
        transmissions or content, whether based on warranty, contract, tort
        (including negligence) or any other legal theory, whether or not we have
        been informed of the possibility of such damage, and even if a remedy
        set forth herein is found to have failed of its essential purpose.
      </p>
      <h2>Disclaimer</h2>
      <p>
        Your use of the Service is at your sole risk. The Service is provided on
        an („AS IS" and "AS AVAILABLE" basis). The Service is provided without
        warranties of any kind, whether express or implied, including, but not
        limited to, implied warranties of merchantability, fitness for a
        particular purpose, non-infringement or course of performance.
      </p>
      <p>
        Strove its subsidiaries, affiliates, and its licensors do not warrant
        that a) the Service will function uninterrupted, secure or available at
        any particular time or location; b) any errors or defects will be
        corrected; c) the Service is free of viruses or other harmful
        components; or d) the results of using the Service will meet your
        requirements.
      </p>
      <h2> Governing Law </h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws
        of Poland, without regard to its conflict of law provisions.
      </p>
      <p>
        Our failure to enforce any right or provision of these Terms will not be
        considered a waiver of those rights. If any provision of these Terms is
        held to be invalid or unenforceable by a court, the remaining provisions
        of these Terms will remain in effect. These Terms constitute the entire
        agreement between us regarding our Service, and supersede and replace
        any prior agreements we might have between us regarding the Service.
      </p>
      <h2>Changes</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material we will try to provide at
        least 30 days notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
      </p>
      <p>
        By continuing to access or use our Service after those revisions become
        effective, you agree to be bound by the revised terms. If you do not
        agree to the new terms, please stop using the Service.
      </p>
      <h2>Contact</h2>
      <p>
        Us If you have any questions about these Terms, please contact us
        at contact@strove.io
      </p>
      <Link to="/">Go back to the homepage</Link>
    </TextWell>
    <Footer />
  </>
)

export default memo(Legal)
