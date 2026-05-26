import { json } from "express";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const signup = async(req,res)=>{
    try{

        const {name,email,password} = req.body;
        const check = await userModel.findOne({email});

        if(check){
            return res.json({success:false, message: "User Already Exist "});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({success:true, token});

    } catch(error){
        console.log(error);
        return res.json({success:false, message:error.message});

    }
}

const login = async(req,res)=>{
    try{
        const{email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"user does not exist"});
        }

        const match = await bcrypt.compare(password,user.password);
        if(match){
            const token = createToken(user._id);
            return res.json({success:true, token});
        } else{
            return res.json({success:false, message:"please enter correct password"});
        }

    } catch(error){

        console.log(error);
        return res.json({success:false, message:error.message});

    }
}

const getMe = async(req,res)=>{
    try{
        const user = await userModel.findById(req.user.id).select("-password");

        res.json({success:true, user});

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export {signup,login, getMe};