const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

// declare a port
const port = process.env.port || 4000

// create an instance of the app and store it in a constant
const app = express()

// // store auth0 configuration
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

// sample endpoint that requires an access token
app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated. Happy apping!'
  })
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(port, () => {
  console.log(`now tuned in to port: ${port}`)
})
