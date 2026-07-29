import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
    date: { 
        type: Date, 
        required: true 
    },
    batchName: { 
        type: String, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    teacherName: {
        type: String,
        required: true
    },
    presentStudents: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student' 
    }],
    tenantId: {
        type: String,
        required: true,
        index: true
    }
}, { timestamps: true });

attendanceSchema.index({ batchName: 1, date: 1, subject: 1, tenantId: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
export { attendanceSchema };
