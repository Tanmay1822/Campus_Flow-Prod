import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    subjects: [
        {
            type: String,
            required: true,
        }
    ]
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
export { teacherSchema };
