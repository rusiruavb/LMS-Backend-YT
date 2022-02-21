import GoogleStrategy from "passport-google-oauth2";
import config from ".";
import User from "../api/model/user.model";
import logger from "../utils/logger";

const googleAuth = (passport) => {
  GoogleStrategy.Strategy;
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, callback) => {
        try {
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          };
          let user = await User.findOne({ googleId: profile.id });

          if (user) return callback(null, user);

          user = await User.create(newUser);
          return callback(null, user);
        } catch (error) {
          logger.error(error.message);
        }
      }
    )
  );

  passport.serializeUser((user, callback) => {
    return callback(null, user);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
      return callback(err, user);
    });
  });
};

export { googleAuth };
