const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const port = process.env.port || 8000

const app = express()

// auth0 configuration
const authConfig = {
  domain: 'dev-cashstasher.auth0.com',
  audience: 'https://mealplannerapi.joseph.pizza'
}

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-cashstasher.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
})

// endpoint that requires an access token

app.get('/api/external', checkJwt, (req, res) => {
  console.log('User auth0 sub access id: ', res)
  res.send({
    msg: 'Your Access Token was successfully validated. Happy apping!'
  })
})

app.listen(port, () => console.log(`API listening on port: ${port}`))
