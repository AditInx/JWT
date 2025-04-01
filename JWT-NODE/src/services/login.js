import bcrypt from 'bcrypt';
import User from "../models/user.js";
import generateToken from '../utils/jwtUtils.js';
import { verifyToken } from '../utils/authMiddleware.js';


const authService = async (email, password) => {
    try {
        const existingUser = await User.findOne({email});
        console.log("existing user: ", existingUser);
        if(!existingUser){
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        console.log("password valid: ", isPasswordValid)
        if(!isPasswordValid){
           throw new Error("Incorrect password"); 
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        console.log("Login error: ", error.message);
        throw new Error("Invalid credentials");
    }
}

export const refreshTokenService = async (oldToken) => {
    try {
        const decodedToken = verifyToken(oldToken);
        console.log("Old  token: ", oldToken)
        console.log("decoded token: ", decodedToken)
        const user = await User.findById(decodedToken.id);
        if(!user){
            throw new Error("User not found");
        }
        const newToken = generateToken(user);
        return newToken;
    } catch (error) {
        console.log("inside refresh token catch phrase", error)
        throw new Error("Invalid token");
    }
}

export default authService;