import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profession: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);
export default User;
