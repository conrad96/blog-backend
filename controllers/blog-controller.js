import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({blogs});

        if(!blogs) res.status(404).json({msg: "No blogs were found."});
    } catch (error) {
        console.log(error);
    }
}

export const addBlog = async (req, res) => {
    try {
        const {title, description, image, user_id} = req.body;

        const getUser = await User.findById(user_id);

        if(getUser) {
            const startSession = await mongoose.startSession();
            startSession.startTransaction();

            const blogRecord = new Blog({
                title,
                image, 
                description, 
                user_id
            });
    
            const save = await blogRecord.save({session: startSession}); 
    
            if(save) {
                getUser.blogs.push(blogRecord);
                await getUser.save({session: startSession});
                await startSession.commitTransaction();

                res.status(200).json(blogRecord);
            }else {
                res.status(401).json({msg: "Blog not saved."});
            }
        }else {
            res.status(400).json({msg: "Unable to find user."}); 
        }

    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

export const updateBlog = async (req, res) => {
    try {
        const {title, description} = req.body;
        
        const blogId = req.params.id;

        const updateBlog  = await Blog.findByIdAndUpdate(blogId, {title, description});

        if(updateBlog) {
            res.status(200).json({msg: "Blog updated successfully."});
        }else {
            res.status(500).json({msg: "Blog not updated."});
        }

    } catch (error) {
        return console.error();
    }
}

export const getBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const record = await Blog.findById(id);
        
        if(record) {
            res.status(200).json({record});
        }else {
            res.status(401).json({msg: 'Blog not found.'});
        }
    } catch (error) {
        return console.error();
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const record = await Blog.findByIdAndDelete(id).populate('user');

        const removeBlogEntry = await record.user.blogs.pull(record);
        const saveChanges = await record.user.save();

        if(record) {
            res.status(200).json({msg: "Blog has been deleted."});
        }else {
            res.status(500).json({msg: "Blog couldn't deleted."});
        }

    } catch (error) {
        return console.error();
    }
}

export const getByUserId = async (req, res) => {
    try {
        const {id} = req.params;

        const fetchBlogs = await User.findById(id).populate('blogs');

        if(!fetchBlogs) {
            return res.status(404).json({msg: "No Blogs found"});
        }

        res.status(200).json({blogs: fetchBlogs});
        
    } catch (error) {
        res.status(500).json({msg: error});
    }
}