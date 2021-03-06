import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
// const bcrypt = require("bcrypt");


const router = express()


//REGISTER (endpoint)  // creat the user in register page(end point)
router.post("/register", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
  
      const user = await newUser.save();
      res.status(200).json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  });



//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(400).json("Wrong credentials!");
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(400).json("Wrong credentials!");
  
      const { password, ...others } = user._doc; //get send every items except password
      res.status(200).json(others);

    } catch (err) {
      res.status(500).json(err);
    }
  });

  
   export default router 