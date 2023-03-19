import express from 'express';
import {getAllBlogs, addBlog, updateBlog} from '../controllers/blog-controller.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/add', addBlog);
router.put('/update/:id', updateBlog);

export default router;
