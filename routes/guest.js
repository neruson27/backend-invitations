import express from "express";
import GuestController from '../controllers/GuestController';

const guest = express.Router();

// getAll
guest.get('/', GuestController.getAll);
// create
guest.post('/', GuestController.create);
// update
guest.put('/:id', GuestController.update);
// deleted
guest.delete('/:id', GuestController.deleted);

export default guest;