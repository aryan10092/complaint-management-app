import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Product', 'Service', 'Support'],
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
