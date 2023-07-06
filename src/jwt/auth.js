import jwt from "jsonwebtoken";
import UserManagerMongoose from "../daos/mongoose/userDao.js";

const userDao = new UserManagerMongoose()

const PRIVATE_KEY = '1234'

export const generateToken = (user) => {

    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        password: user.password,
        role: user.role
    }
    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '15m'
    })
    return token
}

export const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ msg: 'Unauthorized AUTH HEADER' })
        }
        const token = authHeader.split(' ')[1];
        const decodeToken = jwt.verify(token, PRIVATE_KEY)
        console.log('DECODE', decodeToken)
        const user = await userDao.getById(decodeToken.id)
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized USER' })
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
    }
}