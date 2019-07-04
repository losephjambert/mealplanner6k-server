const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const schema = require('./schema/schema')

// declare a port
const port = process.env.PORT || 4000

// create an instance of the app and store it in a constant
const app = express()

// enable cors
app.use(cors())

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-cashstasher.auth0.com
const auth = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithm: ['RS256']
})

// connect to mongodb
mongoose.connect(
  'mongodb+srv://joe:test@mealplanner6k-sd53e.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

// sample endpoint that requires an access token
app.get('/api/external', auth, (req, res) => {
  console.log(req.headers)
  res.send({
    msg:
      'Your Access Token was successfully validated. Happy apping validated user!'
  })
})

// sample register route
app.post('api/register', auth, (req, res) => {
  // do stuff to register a user
  let auth0_id = req.headers.sub
})

// sample login route
app.post('api/login', auth, (req, res) => {
  // do stuff to log a user in
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
