/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  console.log(req.session.loggedIn);
  if (req.session && req.session.loggedIn){
    console.log("user is logged in");
    
    next();
  }else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
