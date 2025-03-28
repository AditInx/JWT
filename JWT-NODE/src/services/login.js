import bcrypt from 'bcrypt';
import User from "../models/user.js";
import generateToken from '../utils/jwtUtils.js';



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

export default authService;