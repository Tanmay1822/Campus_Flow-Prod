import Teacher from '../models/teacherModel.js';

// addTeacher and getTeachers functions remain the same...
export const addTeacher = async (req, res) => {
    const { name, subjects } = req.body;
    if (!name || !subjects || subjects.length === 0) {
        return res.status(400).json({ message: "Please provide a name and at least one subject." });
    }
    try {
        const teacher = await Teacher.findOneAndUpdate({ name, tenantId: req.tenantId }, { subjects, tenantId: req.tenantId }, { new: true, upsert: true });
        res.status(201).json(teacher);
    } catch (error) { 
        console.error('Error adding teacher:', error);
        res.status(500).json({ message: 'Server Error' }); 
    }
};

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({ tenantId: req.tenantId });
        res.json(teachers);
    } catch (error) { 
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Server Error' }); 
    }
};

// --- NEW: Function to handle deleting a teacher by their ID ---
export const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.params.id, tenantId: req.tenantId });
        if (teacher) {
            await teacher.deleteOne();
            res.json({ message: 'Teacher removed' });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

