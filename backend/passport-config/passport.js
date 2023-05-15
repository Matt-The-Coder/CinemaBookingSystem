const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (Username, password, done) => {
    const user = await getUserByUsername(Username)
    console.log(user)
    if (user == null) {
      return done(null, false, { message: 'No user with that Username' })
    }

    try {
      console.log(user)
      if (await bcrypt.compare(user.password, password)) {
        return done(null, user)
      } else {
        console.log("AAA")
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      console.log(("aafter"))
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'userName' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.CustomerID))
  passport.deserializeUser( async (CustomerID, done) => {
    return done(null, await getUserById(CustomerID))
  })
}

module.exports = initialize