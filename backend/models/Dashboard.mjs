import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

const dashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  boards: [boardSchema],
}, {
  timestamps: true,
});

export default mongoose.model('Dashboard', dashboardSchema);
