import Blog from "../models/Blog.js";

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

        const blogRecord = new Blog({
            title,
            image, 
            description, 
            user_id
        });

        const save = await blogRecord.save();

        if(save) {
            res.status(200).json(blogRecord);
        }else {
            res.status(401).json({msg: "Blog not saved."});
        }

    } catch (error) {
        return console.error();
    }
}

export const updateBlog = async (req, res) => {
    try {
        const {title, description} = req.body;
        
        const blogId = req.params.id;

        const updateBlog  = await Blog.findByIdAndUpdate(blogId, {title, description});
        console.log(updateBlog);

        if(updateBlog) {
            res.status(200).json({msg: "Blog updated successfully."});
        }else {
            res.status(500).json({msg: "Blog not updated."});
        }

    } catch (error) {
        return console.error();
    }
}