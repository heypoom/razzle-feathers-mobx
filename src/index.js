import http from 'http'

import app from './server'

const server = http.createServer(app)

let currentApp = app

const PORT = process.env.PORT || 3000

server.listen(PORT, error => {
  if (error) {
    console.log(error)
  }

  console.log(`🚀 Backend is now Ready at port ${PORT}!`)
})

if (module.hot) {
  console.log('✅ Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁 HMR Reloading `./server`...')
    server.removeListener('request', currentApp)

    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}
