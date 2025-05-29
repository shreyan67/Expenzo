const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
// const session = require("express-session");
const passport = require("./controllers/auth.googleAuth")
const GoogleAuthRoutes = require("./routes/googleAuthRoutes");

const connectDb = require("./config/connectDb");
// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.set("trust proxy", 1);

//routes
// Google Auth Routes
app.use(passport.initialize());
app.use("/auth", GoogleAuthRoutes);

//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

// user information/help routes
app.use("/api/v1/user-information", require("./routes/userInfoRoutes"));

//port
const PORT = 8000 || process.env.PORT;

//it is a test route just to see our server is working
app.get("/", (req, res) => {
  return res.send(`<div style = "background:green;padding:100px;"><h2>Welcome to Expense Management System Backend Server URL...</h2>
    <p>Below are the some examples of supported routes...</p>
        <div><ul>
            <h3>User Route</h3>
            <li>Register User - /api/v1/users/register</li>
            <li>Login User - /api/v1/users/login</li>
            <h3>Transection Route</h3>
            <li>Transaction Route - /api/v1/transections</li>
            <li>Many more...</li>
        </ul></div>
    </div>`);
});

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
