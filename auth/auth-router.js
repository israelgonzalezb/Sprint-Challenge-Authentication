const router = require('express').Router(); //routes built out
const bcrypt = require("bcryptjs"); //hash functions added in /register and /login endpoints below 
const jwt = require("jsonwebtoken"); //genToken function added to create jwt
const secrets = require("../config/secrets.js"); //added secrets config file

const Users = require("../users/users-model.js"); //users-model built out



router.post('/register', async (req, res) => {
  try{
    // implement registration
    let user = req.body;

    //has our pw before storing it
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    // using async await here for db method
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch(err) {
      res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  // implement login
  try{
    let { username, password } = req.body;
    
    const user = await Users.findBy(username).first();
    const userExists = Object.keys(user).length;
    const passCorrect = bcrypt.compareSync(password, user.password);
    
    if (userExists && passCorrect) {
      console.log("we're in");
      const token = genToken(user);
      console.log(token);
      
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token: `Your token is ${token}`
      })
    } else {
      res.status(401).json({ message: "Invalid credentials "});
    }
  } catch (err) {
    res.status(400).json(err);
  }
  
});

function genToken(user){
  console.log("genToken function running");
  const payload= {
    subject: "user",
    username: user.username
  };
  const secret = secrets.jwtSecret; // need to create config file with secret
  const options = {
    expiresIn: "1h"
  };

  const token = jwt.sign(payload, secret, options);
  return token;

}

module.exports = router;
