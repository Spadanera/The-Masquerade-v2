"use strict";

const router = require('express').Router();
import passport from 'passport';

import User from "../../models/User";

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
}));
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    async (req, res) => {
        let profile = req.user.profile;
        let user = await User.findOneAndUpdate({ googleId: profile.id }, {
            googleId: profile.id,
            email: profile.emails[0].value,
            token: req.user.token,
            displayName: profile.displayName,
            givenName: profile.name.given_name,
            familyName: profile.name.family_name,
            picture: profile._json.picture,
            roles: ["story-teller"]
        }, { upsert: true, new: true, setDefaultsOnInsert: true });
        req.session.userId = user._id;
        req.session.token = req.user.token;
        res.cookie('token', req.session.token);
        res.redirect('http://localhost/#/chronicles');
    }
);
router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.cookie('token', '');
    res.redirect('http://localhost/#/');
});

export default router;