import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  tags: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['Live', 'In Development', 'Archived'],
    default: 'In Development'
  },
  github: {
    type: String,
    default: ''
  },
  live: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Project', projectSchema);
