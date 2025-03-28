import User from "../models/user.js";
import bcrypt from 'bcrypt';

const userService = async(userData)=>{
    const {name, email, password} = userData;
    const hashedPassword = await bcrypt.hash(password,10);
    const createUser = new User({
        name,
        email, 
        password: hashedPassword,
        role: "customer"
    });
    const savedUser = await createUser.save();
    return savedUser;
}

export default userService;