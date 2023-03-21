import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    let users; 
    try {
        users = await User.find();

    } catch (error) {
        console.log(error);
    }
    if(!users) {
        res.status(400).json({msg: "No users found."});
    }
    res.status(200).json({users});
}

export const addUser = async (req, res) => {
    const {email, password, name} = req.body;

    const checkUser = await User.findOne({email});

    if(checkUser) {
        res.status(400).json({msg: "User already exists. "});
    }else { //create new user
        const hash = bcrypt.hashSync(password);
        const newUser = new User({name, email, password: hash, blogs: []});

        try{
            const save = await newUser.save();
            res.status(201).json({msg: "User added successfully. "});
        }catch(error) {
            return console.log(error);
        }
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body;

    
    try {
        const getUser = await User.findOne({email});    

        if(!getUser) {
            res.status(404).json({msg: "User not found."});
        }else {
            const checkPassword = bcrypt.compareSync(password, getUser.password);
            if(checkPassword) {
                res.status(200).json({msg: "User logged in successfully."});
            }else {
                res.status(401).json({msg: "Incorrect email or password. "});
            }
        }
    } catch (error) {
        console.log(error);
    }
}
