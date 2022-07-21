import express from "express";
import AdminController from '../controllers/AdminController';
import authorization from "../middleware/authorization";

const admin = express.Router();

admin.post('/login', AdminController.login);

admin.post('/singUp', authorization, AdminController.createAnotherAdmin);

export default admin;