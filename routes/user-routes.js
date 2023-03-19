import express from "express";
import {getAllUsers, addUser, login} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', addUser);
router.post('/login', login);

export default router;
