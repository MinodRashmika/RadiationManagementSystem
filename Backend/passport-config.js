/* cite: https://www.youtube.com/watch?v=-RCnNyD0L-s */
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

/* takes in email and password and then compares the password with stored hash function
if the passwords do not match 
*/
function initializePassport(passport, getUserByEmail, getUserById){
    const authenticateUser = async(email, password, done) => {
        const user = await getUserByEmail(email)
        if (user == null) {
            return done(null,false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null,user, )
            }else{
                return done(null, false, { message: 'Password incorrect'})
            }
        } catch (e){
            return done(e)
        }

    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, 
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
       return done(null, getUserById(id))
    })
} 

export {initializePassport}