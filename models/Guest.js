import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  name: String,
  table: Number,
  persons: Number,
  accepted: {
    type: Boolean,
    default: false
  },
  acceptedDate: Date
})

const Guest = mongoose.model('Guest', GuestSchema);

export default Guest;