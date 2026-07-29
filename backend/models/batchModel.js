import mongoose from 'mongoose';

const batchSchema = mongoose.Schema({
  name: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  labs: [{ type: String, required: true }],
  tenantId: { type: String, required: true, index: true },
});

batchSchema.index({ name: 1, tenantId: 1 }, { unique: true });

const Batch = mongoose.model('Batch', batchSchema);
export default Batch;
export { batchSchema };