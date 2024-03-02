import User from "../models/user.js";
import { hashPassword,comparePassword } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import Order from "../models/order.js";
dotenv.config();

//Register

export const register = async (req,res) =>{
  try{
    //1. destructure name,email,password from req.body
    const { name,email,password} =req.body;
    //2.all fields require validation
    if(!name.trim()){
        return res.json({error:"กรุณาใส่ชื่อ"});
    }
    if(!email){
        return res.json({error:"อีเมลถูกใช้งานแล้ว"});
    }
    if(!password || password.length <6){
        return res.json ({error:" รหัสผ่านต้องมากกว่า 6 ตัว"});  
    }
    //3.check if email is taken
const existingUser = await User.findOne({email});
    if(existingUser){
        return res.json({errors:"อีเมลถูกใช้งานแล้ว"});
    }
    //4.hash password
    const hashedPassword = await hashPassword(password);
    //5.Register user
    const user = await new User({
        name,
        email,
        password:hashedPassword,
    }).save();
    //6. create signed jwt
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
        expiresIn:"7d",
    });  
    //7.send response
    res.json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
        token,
      });
    } catch (err) {
      console.log(err);
    }
  };

//Login

  export const login = async (req, res) => {
    try {
      // 1. destructure name, email, password from req.body
      const { email, password } = req.body;
      // 2. all fields require validation
      if (!email) {
        return res.json({ error: "อีเมลถูกใช้งานแล้ว" });
      }
      if (!password || password.length < 6) {
        return res.json({ error: "รหัสผ่านต้องมากกว่า 6 ตัว" });
      }
      // 3. check if email is taken
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: "ไม่พบผู้ใช้งาน" });
      }
      // 4. compare password
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.json({ error: "รหัสผ่านผิดพลาด" });
      }
      // 5. create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // 7. send response
      res.json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
        token,
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  
  export const updateProfile = async (req, res) => {
    try {
      const { name, password, address } = req.body;
      const user = await User.findById(req.user._id);
      // check password length
      if (password && password.length < 6) {
        return res.json({
          error: "รหัสผ่านต้องมากกว่า 6 ตัว",
        });
      }
      // hash the password
      const hashedPassword = password ? await hashPassword(password) : undefined;
  
      const updated = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          address: address || user.address,
        },
        { new: true }
      );
  
      updated.password = undefined;
      res.json(updated);
    } catch (err) {
      console.log(err);
    }
  };
  export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const allOrders = async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  };
