const express = require('express');
const basicAuth = require('express-basic-auth')
const app = express()

// app.use(basicAuth({
//   users: { 'admin': 'supersecret' }
// }))

app.use(basicAuth({
  authorizer: (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'admin')
    const passwordMatches = basicAuth.safeCompare(password, 'supersecret')
    return userMatches & passwordMatches
  }
}))

app.get('/', (req, res) => {
  res.send('authorized')
})

app.listen(3000, () => console.log('server started'))