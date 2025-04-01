import authService from '../services/login.js';
import { refreshTokenService } from '../services/login.js';
const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const token = await authService(email, password);
        res.json({token: token})
    } catch (error) {
        res.status(401).json({message:'Invalid credentials'});
    }
}

export const refreshToken = async (req,res) => {
    try {
        const {token} = req.body;
        const newToken = await refreshTokenService(token);
        res.json({newToken: newToken})
        console.log("refresh token is: ",newToken)
    } catch (error) {
        res.status(401).json({message:'Invalid token'});
    }
}

export default login;