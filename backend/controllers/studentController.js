import Student from '../models/studentModel.js';

// Add a new student with their pre-calculated face descriptor
export const addStudent = async (req, res) => {
    const { name, rollNumber, batchName, faceDescriptor } = req.body;
    if (!name || !rollNumber || !batchName || !faceDescriptor) {
        return res.status(400).json({ message: "Please provide all student details including face data." });
    }
    try {
        const studentExists = await Student.findOne({ rollNumber, batchName, tenantId: req.tenantId });
        if (studentExists) {
            return res.status(400).json({ message: "Student with this roll number already exists in this batch." });
        }
        const student = new Student({ name, rollNumber, batchName, faceDescriptor, tenantId: req.tenantId });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server Error adding student.' });
    }
};

// Get all students, optionally filtering by batch
export const getStudents = async (req, res) => {
    try {
        const query = req.query.batchName ? { batchName: req.query.batchName, tenantId: req.tenantId } : { tenantId: req.tenantId };
        const students = await Student.find(query);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching students.' });
    }
};

// Bulk add students - accepts an array of students with face descriptors
export const bulkAddStudents = async (req, res) => {
    const { students } = req.body || {};
    if (!Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ message: 'No students provided for bulk upload.' });
    }
    try {

        // Prepare documents ensuring required fields exist
        const docs = students
            .filter(s => s && s.name && s.rollNumber && s.batchName && Array.isArray(s.faceDescriptor))
            .map(s => ({
                name: s.name,
                rollNumber: String(s.rollNumber),
                batchName: s.batchName,
                faceDescriptor: s.faceDescriptor,
                tenantId: req.tenantId,
            }));

        if (docs.length === 0) {
            return res.status(400).json({ message: 'Provided data is invalid. Ensure name, rollNumber, batchName, and faceDescriptor are present.' });
        }

        // Use insertMany with ordered:false to continue on duplicates (unique index on rollNumber+batchName)
        const result = await Student.insertMany(docs, { ordered: false });

        const insertedCount = Array.isArray(result) ? result.length : 0;
        const total = students.length;
        return res.status(201).json({
            message: `Bulk upload complete. Inserted ${insertedCount} of ${total} students. Duplicates were skipped if present.`,
            insertedCount,
            total,
        });
    } catch (error) {
        // Handle duplicate key errors gracefully
        if (error && error.writeErrors && error.writeErrors.length >= 0) {
            const insertedCount = error.result?.nInserted ?? 0;
            const total = (req.body?.students || []).length;
            return res.status(201).json({
                message: `Bulk upload partially complete. Inserted ${insertedCount} of ${total} students. Duplicates were skipped.`,
                insertedCount,
                total,
            });
        }
        return res.status(500).json({ message: 'Server Error during bulk upload.' });
    }
};