import React from 'react'
import {hydrate} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {ensureReady, After} from '@jaredpalmer/after'

import App from './common/App'
import routes from './common/routes'
import {rehydrate} from './utils/hydrate'

import './style.sass'

const Client = ({data, stores}) => (
  <App stores={stores}>
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>
  </App>
)

async function run() {
  const data = await ensureReady(routes)
  const stores = await rehydrate()
  window.stores = stores

  hydrate(
    <Client data={data} stores={stores} />,
    document.getElementById('root'),
  )
}

if (module.hot) {
  module.hot.accept()
}

run()
