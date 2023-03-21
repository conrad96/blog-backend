import express from 'express';
import {getAllBlogs, addBlog, updateBlog, getBlog, deleteBlog, getByUserId} from '../controllers/blog-controller.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/add', addBlog);
router.put('/update/:id', updateBlog);
router.get('/:id', getBlog);
router.delete('/:id', deleteBlog);
router.get('/user/:id', getByUserId);

export default router;
