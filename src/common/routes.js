// import React from 'react'
// import {asyncComponent} from '@jaredpalmer/after'

import Landing from '../landing-page'

// const Placeholder = () => <h1>[ LOADING ]</h1>

export default [
  {
    path: '/',
    exact: true,
    component: Landing,
  },
  // {
  //   path: '/async',
  //   exact: true,
  //   component: asyncComponent({
  //     loader: () => import('./About'),
  //     Placeholder,
  //   }),
  // },
]
