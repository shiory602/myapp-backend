const express = require('express');
const basicAuth = require('express-basic-auth')
const app = express()

const MongoClient = require('mongodb');

let url = "mongodb+srv://shiory602:test@cluster0.wwfww.mongodb.net/test"


app.get('/registerUser', function(req, res) {
  let email = "shiori@gmail.com"
  let username = "shiorisuzuki"
  let password = "pass"
  loginUser(email, username, password)
})

function loginUser(email = undefined, username = undefined, password = undefined) {
  MongoClient.comment(url + "UserDB", function(err, db) {
    // if(err) throw err;
    var theDB = db.db("UserDB");

    UserDB.createCollection("RegisteredUsers", function(err, res) {
      // if(err) throw err;
      // console.log("Collection created")
    })

    var theRecord = { email: email, username: username, password: password }

    theDB.collection("RegisteredUsers").insertOne(theRecord, function(err, res) {
      if (err) throw err;
      else {
        console.log("I document inserted")
      }
    })

    db.close();
  })
}

// function CreateACollectionDatabase(DBNameWeWantToMake, CollectionThatExistsInsideThatDB) {
//   if (err) throw err;
//   // let theDB = 
// }


/*-----------------
// CRUD
------------------*/

class SimpleCrudDB {
  // store your records here
  inMemoryDatabase = []
  // import this and begin to use it
  fs = require('fs')

  

  constructor(aFileName) {
    this.fileName = aFileName;
    // this is the filename you will save to add code below to create that file, or
    // open it when this class is instantiated, ie: your program start, it loads the database from the file, into the this.inMemoryDatabase
  }

  create(username, password) {
    // add code to store a record in your database
    // return true if success, false if not
    db.loginUser.insert({ name: username, password: password})
    if (err) throw err
    else {
      return true
    }
  }


  Read(username) {
    // add code to read record from database
      // return undefined if no record exists, otherwise, return the record
    db.loginUser.find({name: username})
    if (err) throw err
    else {
      return true
    }
  }




  Update(username, newRecordData) {
    // add code to update a record in the database
    // return true if success, false if not
    db.loginUser.update({name:username},{$set:{password:newRecordData}})
    if (err) throw err
    else {
      return true
    }
  };


  Delete(username)
  {
  // add code to delete a user in the database
  // return true if success, false if not
  db.loginUser.remove({name:username})
  if (err) throw err
  else {
    return true
  }
  };


  flushDB() {
    // flush the inmemoryDatabase to disk (ie: save the database to disk)
    fs.writeFile('your db path', JSON.stringify(this.inMemoryDatabase) , (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully")
    }})
  }


  reloadDB() {
      // reload the database from disk
      window.location.reload()
  }


}
let db = new SimpleCrudDB('./db.json')





app.use(basicAuth({
  users: { 'admin': 'supersecret', 'shiori': 'pass' },
  // challenge: true
  unauthorizedResponse: () => {
    console.log('I am here in basicAuth config. Unauthorized!!')
    const admin ={
      _username: 'shiori',
      _password: 'pass'
    }
    const userMatches = basicAuth.safeCompare(username, admin._username)
    const passwordMatches = basicAuth.safeCompare(password, admin._password)
    if(userMatches && passwordMatches) {
      // both match
      console.log('#2 both username and password match', userMatches, passwordMatches)
      return userMatches & passwordMatches
    }
  }
}))

// after authorized, send login data to the server

app.put('/api/login', (req,res,net) => {
  // create input data object
  let param = {
    username: req.body.username,
    password: req.body.password
  }

  console.log('#1 req.body is ', param)

  // Check if the login user is okay to be authorized
  if (param.username === 'shiori' && param.password === 'pass') {
    res.send({
      mes: 'SUCCESS',
      username: param.username,
      password: param.password
    })
  }
})

// app.get('/', (req, res) => {
//   res.send('authorized')
// })

// app.get('/version', (req,res,net) => {
//   res.send('1. 0. 0')
// })

// app.post('/givemesomething', (req,res,net) => {
//   console.log(req)
//   res.send(`I got: ${JSON.stringify(req.body)}`);
// })

app.listen(3000, () => console.log('server started'))