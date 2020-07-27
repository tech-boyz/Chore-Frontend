const { createServer } = require('https')
const { parse } = require('url')
const { createReadStream, readFileSync } = require('fs')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: readFileSync('./certificates/localhost.key'),
  cert: readFileSync('./certificates/localhost.crt')
}

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/sw.js') {
      res.setHeader('content-type', 'text/javascript')
      createReadStream('./offline/serviceWorker.js').pipe(res)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(process.env.PORT, err => {
    if (err) throw err
    console.log(`> Ready on https://localhost:${process.env.PORT}`)
  })
})
