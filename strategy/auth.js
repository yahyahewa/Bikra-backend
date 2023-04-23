import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import Seller from "../models/seller.account.model.js";
import dotenv from "dotenv";
dotenv.config();
passport.use(
  "signup",
  // aw sign up xoman drusy aakain
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await Seller.create({
          email,
          password,
          username: req.body.username,
        });
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Seller.findOne({ email });
        if (!user) {
          return done(null, false, { message: "invalidate credental" });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "invalidate credental" });
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

//middlware
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (err) {
        done(err);
      }
    }
  )
);
