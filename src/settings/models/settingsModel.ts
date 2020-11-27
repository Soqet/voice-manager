import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const settingsSchema = new mongoose.Schema({
  server: {
    type: String,
    required: true,
    unique: true
  },
  prefix: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
});

const settingsModel = mongoose.model('serverSettings', settingsSchema);
export default settingsModel;