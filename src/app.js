import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoConnect from "connect-mongo";
import logger from "./utils/logger";
import routes from "./api/routes";
import { connect } from "./utils/database.connection";
import { googleAuth } from "./configs/google.auth";
import config from "./configs";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(
  session({
    secret: "library-secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoConnect({ mongoUrl: config.DB_CONNECTION_STRING }),
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 10000),
      maxAge: 10000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
  res.send(`<a href="/auth/google">Login with Google</a>`);
  next();
});

app.listen(PORT, () => {
  logger.info(`🚀 Server is up and running on PORT ${PORT}`);
  googleAuth(passport);
  routes(app, passport);
  connect();
});
