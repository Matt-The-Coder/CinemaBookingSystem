const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (userName, password, done) => {
    const user = await getUserByUsername(userName)
    
    if (user == null) {
      return done(null, false, { message: 'No user with that Username' })
    }

    try {
     
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      
      return done(e)
    }
  }

  passport.use('user', new LocalStrategy({ usernameField: 'userName' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.CustomerID))
  passport.deserializeUser( async (CustomerID, done) => {
    return done(null, await getUserById(CustomerID))
  })
}

module.exports = initialize