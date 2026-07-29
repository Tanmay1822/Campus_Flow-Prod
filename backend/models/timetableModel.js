import mongoose from 'mongoose';

const timetableSchema = mongoose.Schema({
  batchName: { type: String, required: true },
  schedule: { type: Object, required: true },
  tenantId: { type: String, required: true, index: true },
}, { timestamps: true });

timetableSchema.index({ batchName: 1, tenantId: 1 }, { unique: true });

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;
export { timetableSchema };