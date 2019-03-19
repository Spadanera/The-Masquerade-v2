import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import web from '../../client_secret.json';
export default (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: web.web.client_id,
        clientSecret: web.web.client_secret,
        callbackURL: 'http://localhost:8080/api/auth/google/callback'
    },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};