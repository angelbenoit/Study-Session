const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key.js');
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    //switch back to '/auth/google/callback'
    //this is the temporary fix to uri mismatch
    callbackURL: 'https://studysession.herokuapp.com/auth/google/callback',
    //callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            console.log(existingUser)
            if (existingUser) {
                done(null, existingUser);
            } else { //create new user if existingUser === false
                new User({
                    googleId: profile.id,
                    displayName: profile.displayName ,
                }).save()
                    .then((user) => done(null, user));
            }
        })

})
);
