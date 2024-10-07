const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userData = require('..//models/sing up _models');
const bcrypt = require('bcrypt');
console.log("passporttt");

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const user = await userData.findOne({ email: email });
    console.log("passport..");
    
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
      console.log('Found user:', user);
      if (!user.password) {
        console.log('Password field is missing in user object');
        return done(null, false);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log("pass matched");
        
        return done(null, user);
      } else {
        console.log('Password did not match');
        return done(null, false);
      }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userData.findById(id);
    done(null, user);
});

module.exports = passport;