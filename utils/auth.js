// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file

const client = require("../database/PostgreSQL");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(async (email, password, done) => {

    try {
        // console.log('Received credentials:', username, password);
        const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
    
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;