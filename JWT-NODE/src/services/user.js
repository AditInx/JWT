import User from "../models/user.js";

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users)
  return users;
};

export default getUsers;
