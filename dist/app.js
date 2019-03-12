"use strict";

var _express = _interopRequireWildcard(require("express"));

var _passport = require("passport");

var _cors = _interopRequireDefault(require("cors"));

var _passportGoogleOauth = require("passport-google-oauth");

var _client_secret = require("../client_secret.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var PORT = process.env.PORT || 3000;
var app = (0, _express.default)(); // Body Parser Middleware

app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _cors.default)());
(0, _passport.use)(new _passportGoogleOauth.OAuth2Strategy({
  clientID: _client_secret.web.client_id,
  clientSecret: _client_secret.web.client_secret,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
  User.findOrCreate({
    googleId: profile.id
  }, function (err, user) {
    return done(err, user);
  });
}));
app.get('/auth/google', (0, _passport.authenticate)('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));
app.get('/auth/google/callback', (0, _passport.authenticate)('google', {
  failureRedirect: '/login'
}), function (req, res) {
  res.redirect('/');
});
app.use("/api", require("./routes/router"));
app.get("/", function (req, res) {
  return res.end('<a href="/auth/google">Sign In with Google</a>');
});
app.listen(PORT, function () {
  console.log("Server is listening on port ".concat(PORT));
});