import userService from "../services/signup";

const getUsers = async (req,res) => {
    try {
        const users = await userService();
        res.json(users);
    } catch (error) {
        res.status(500).json({message:error});
    }
}