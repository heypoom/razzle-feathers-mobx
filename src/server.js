import express from 'express'
import {render} from '@jaredpalmer/after'

import Document from './common/Document'
import routes from './common/routes'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

async function ssrHandler(req, res) {
  try {
    const html = await render({
      req,
      res,
      routes,
      assets,
      document: Document,
    })

    res.send(html)
  } catch (error) {
    console.log(error)

    res.json({error: true, message: error.message})
  }
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', ssrHandler)

export default server
