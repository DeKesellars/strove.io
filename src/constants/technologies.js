import React from 'react'
import { Docker, Github, Google, VSCode } from 'images/logos'

export default [
  {
    component: (
      <Docker style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'Docker',
    description:
      'Strove.io represents each environment as a Docker container built from a shared image. This lets you code in seconds, on any computer and forget that `it works on my machine` issue ever existed.',
  },
  {
    component: (
      <Google style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'Google',
    description:
      'Google Cloud allows us to host secure, consistent cloud environment',
  },
  {
    component: (
      <VSCode style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'VSCode',
    description:
      'Strove.io supports VSCode to provide the best programming experience',
  },
  {
    component: (
      <Github style={{ fill: '#303c42' }} width="100%" length="auto" />
    ),
    name: 'Github',
    description:
      'Github, Gitlab and Bitbucket integration for state-of-the-art version control',
  },
]
