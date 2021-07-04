const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../keys/keys');
const mongoose = require('mongoose');
const crypto = require('crypto');

const User = require('../models/User');

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({googleId: profile.id});

        if(user){
            //we already have the user
            return done(null, user);
        }
        //we dont have the user, need to create a new
        const newUser = await new User({googleId: profile.id}).save();
        done(null, newUser);
    }
));

passport.serializeUser((user, done) =>{
    return done(null, user.id);
})

passport.deserializeUser((id, done) =>{
    User.findById(id)
        .then(user =>{
            done(null, user);
        });
})
