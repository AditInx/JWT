import express from "express";
import signupRoute from "./routes/signup.js";
import loginRoute from './routes/login.js';
const app = express();
import createAdminAccount from "./scripts/admin.js";
import userRoute from './routes/user.js';
import cors from 'cors';
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
createAdminAccount();
app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use('/api',userRoute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
