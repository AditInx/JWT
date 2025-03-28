import userService from '../services/signup.js';

const createUser = async (req,res) => {
    try {
        const userData = req.body;
        const user = await userService(userData);
        res.status(201).json({user:user, message: "User created successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

export default createUser;