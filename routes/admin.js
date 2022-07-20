import express from "express";
import AdminController from '../controllers/AdminController';

const admin = express.Router();

admin.get('/login', AdminController.login);

export default admin;