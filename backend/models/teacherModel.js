import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        type: String,
        required: true,
    },
    subjects: [
        {
            type: String,
        }
    ],
    tenantId: {
        type: String,
        required: true,
        index: true
    }
}, { timestamps: true });

teacherSchema.index({ name: 1, tenantId: 1 }, { unique: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
export { teacherSchema };
