const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getAdminByName, getAdminById) {
  const authenticateAdmin = async (adminname, password, done) => {
    const admin = await getAdminByName(adminname);
    if (admin == null) {
      return done(null, false, { message: 'No Admin with that Admin Name' });
    }

    try {
      if (await bcrypt.compare(password, admin.password)) {
        return done(null, admin);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  }

  passport.use('admin', new LocalStrategy({ usernameField: 'adminname' }, authenticateAdmin));
  passport.serializeUser((admin, done) => done(null, admin.adminID));
  passport.deserializeUser((adminID, done) => {
    // Replace this line with your actual logic to retrieve admin by ID
    return done(null, getAdminById(adminID));
  });
}

module.exports = initialize;
