import React, {Component} from 'react'
import {extractCritical} from 'emotion-server'
import {AfterRoot, AfterData} from '@jaredpalmer/after'

import initStore from './stores'

import {dehydrate} from '../utils/hydrate'

import App from './App'

export default class Document extends Component {
  static async getInitialProps({assets, data, renderPage}) {
    const stores = await initStore()

    const renderer = Page => props => (
      <App stores={stores}>
        <Page {...props} />
      </App>
    )

    const page = await renderPage(renderer)

    const criticalCss = extractCritical(page.html).css
    const state = dehydrate(stores)

    return {assets, data, state, criticalCss, ...page}
  }

  render() {
    const {helmet, assets, data, state, criticalCss} = this.props

    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Passion Nest</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}

          <link rel="stylesheet" href={assets.client.css} />
          <style dangerouslySetInnerHTML={{__html: criticalCss}} />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />

          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />

          <script
            dangerouslySetInnerHTML={{__html: `window.__STATE = ${state}`}}
          />
        </body>
      </html>
    )
  }
}
