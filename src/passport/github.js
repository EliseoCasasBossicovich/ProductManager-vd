import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import UserManagerMongoose from "../daos/mongoose/userDao.js";

const userDao = new UserManagerMongoose()

const strategyOptions = {
    clientID: 'Iv1.63f05316ec397216',
    clientSecret: 'd5b53926a7c3c86d28690936764e59078db8510c',
    callbackURL: 'http://localhost:8080/users/profileGithub'
};
const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    console.log(profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1],
        email,
        age: 0,
        password: '',
        role: email != 'adminCoder@coder.com' ? 'user' : 'admin',
    });
    return done(null, newUser);
}
passport.use('githubPassport', new GithubStrategy(strategyOptions, registerOrLogin));
export const frontResponseGithub = {
    failureRedirect: '/errorLogin',
    successRedirect: '/profile',
    passReqToCallback: true,
}