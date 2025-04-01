import jwt from "jsonwebtoken";
import secretKey from "../config/jwtConfig.js";

const generateToken = (user) => {
    console.log("secret key in jwtUtils file: ", secretKey);
    const payload = {
        id:user._id,
        email:user.email,
        role: user.role
    }
    return jwt.sign(payload,secretKey, {expiresIn:"1h"});
}

export default generateToken;