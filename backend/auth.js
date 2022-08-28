//require module
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt
require("dotenv").config()

//JWT passport strategy
module.exports = (knex) => {
    const strategy = new passportJWT.Strategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
    }, async(req, payload, done) =>{
        const user = await knex("users").where("id", payload.id).first(); //{username: "sam", email: 'sam@gmail.com',password: "123",} etc
        if (user) {
            return done(null, user);
        } else {
            return done(new Error("User not found", null));

        }
    })
    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        // authenticate: () => {
        //     return passport.authenticate("jwt", {session: false});
        // }
    }

}