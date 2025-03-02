const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
// const router = require('./routes/route.js')

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

// Mock user data (for demonstration purposes)
const users = [
  { username: "user1", password: bcrypt.hashSync("password123", 8), role: "user" },
  { username: "admin", password: bcrypt.hashSync("admin123", 8), role: "admin" },
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication: Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body.formData;
  console.log(req.url);
  console.log(req.body)

  const user = users.find((user) => {
    return user.username === username;
  });

  if (user) {
    console.log(user);
    const passAuth = await bcrypt.compare(password, user.password);
    console.log(passAuth);

    if(passAuth){

      const token = jwt.sign(user,"Bharat",{expiresIn :'1m'});
      console.log(token)
      const data ={
        message: "login successfully",
        user,
        token
      }
      res.json(data);
    }else{
      const data = {
        message : "invalid username or password"
      }
      res.status(401).json(data);
    }
  } else {
    console.log("user not found");
    res.status(404).json({ message: "user not found" });
  }
});

// router.get("/users",(req,res)=>{
//   console.log(users)
// })
// app.get("api/",router);

// Authorization: Protected route
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  console.log(token)
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "Bharat", (err, decoded) => {
    if (err) {
      console.log(err.message)
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    res.json({ message: "Welcome to the protected route!", user: decoded });
  });
});

app.post("/logout",(req,res)=>{
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "Bharat", (err, decoded) => {
    if (err) {
      console.log(err.message)
      return res.status(401).json({ message: "Failed to logout" });
    }

    res.json({ message: "log out success"});
  });
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});