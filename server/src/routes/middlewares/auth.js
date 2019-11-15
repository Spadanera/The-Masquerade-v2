"use strict";

const router = require('express').Router();
import passport from 'passport';

import User from "../../models/User";
import Player from "../../models/Player";
import Invitation from "../../models/Invitation";
import Chronicle from "../../models/Chronicle";

router.get('/google-join/:invitation', (req, res) => {
    req.session.invitation = req.params.invitation;
    res.redirect('/auth/google');
});

router.get('/google-role/:role', (req, res) => {
    req.session.role = req.params.role;
    res.redirect('/auth/google');
});

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/checkauthentication', (req, res) => {
    if (req.session.userId) {
        res.send(req.session.role);
    }
    else {
        res.send("");
    }
});

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    async (req, res) => {
        try {
            let profile = req.user.profile;
            let user = await User.findOneAndUpdate({ googleId: profile.id }, {
                googleId: profile.id,
                email: profile.emails[0].value,
                token: req.user.token,
                displayName: profile.displayName,
                givenName: profile.name.given_name,
                familyName: profile.name.family_name,
                picture: profile._json.picture
            }, { upsert: true, new: true, setDefaultsOnInsert: true });
            req.session.userId = user._id;
            req.session.token = req.user.token;
            res.cookie('token', req.session.token);

            // invitation
            if (req.session.invitation) {
                let invitation = await Invitation.findOne({ token: req.session.invitation });
                let player = {
                    userId: user._id,
                    userDisplayName: profile.displayName,
                    userPicture: profile._json.picture,
                    chronicleId: invitation.chronicleId,
                    active: true,
                };
                let playerUpserted = await Player.findOneAndUpdate({ userId: user._id }, player, { upsert: true, new: true, setDefaultsOnInsert: true });
                let chronicle = await Chronicle.findOne({ _id: invitation.chronicleId });
                if (chronicle) {
                    chronicle.players.push(playerUpserted);
                    await chronicle.save();
                }
                await Invitation.findOneAndDelete({ token: req.session.invitation });
                res.redirect(`${process.env.PROTOCOL || "http"}://${process.env.ORIGIN || "localhost"}/#/player`);
            }

            // redirect
            if (req.session.role === "story-teller") {
                res.redirect(`${process.env.PROTOCOL || "http"}://${process.env.ORIGIN || "localhost"}/#/story-teller`);
            }
            if (req.session.role === "player") {
                res.redirect(`${process.env.PROTOCOL || "http"}://${process.env.ORIGIN || "localhost"}/#/player`);
            }
        } catch (error) {
            console.log(error);
            res.redirect(`${process.env.PROTOCOL || "http"}://${process.env.ORIGIN || "localhost"}/`);
        }
    }
);
router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.cookie('token', '');
    res.redirect(`${process.env.PROTOCOL || "http"}://${process.env.ORIGIN || "localhost"}/#/`);
});

export default router;