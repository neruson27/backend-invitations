import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  user: String,
  privilegies: {
    type: String,
    enum: ['Admin', 'SuperAdmin']
  },
  password: String
})

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;