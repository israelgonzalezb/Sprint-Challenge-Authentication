const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");



router.post('/register', async (req, res) => {
  try{
    // implement registration
    let user = req.body;

    //has our pw before storing it
    //const hash = bcrypt(user.password, 10);
    //user.password = hash;

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
    if (user && bcrypt.compareSync(password, user.password)) {
      const token genToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token: `Your token is ${token}`
      })
    } else {
      res.status(401).json({ message: "Invalid credentials "});
    }
  } catch (err) {
    res.status(400).json(error);
  }
  
});

function genToken(user){
  const payload= {
    subject: "user",
    username: user.username
  };
  const secret = secrets.jwtSecret; // need to create config file with secret
  const options = {
    expiresIn: "1h",
    secure: false
  };

  return jwt.sign(payload, secret, options);

}

module.exports = router;
