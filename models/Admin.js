import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true
  },
  privilegies: {
    type: String,
    enum: ['Admin', 'SuperAdmin']
  },
  password: String
})

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;