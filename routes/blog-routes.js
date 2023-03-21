import express from 'express';
import {getAllBlogs, addBlog, updateBlog, getBlog, deleteBlog} from '../controllers/blog-controller.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/add', addBlog);
router.put('/update/:id', updateBlog);
router.get('/:id', getBlog);
router.delete('/:id', deleteBlog);

export default router;
