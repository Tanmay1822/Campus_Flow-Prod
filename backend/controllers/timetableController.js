import Batch from '../models/batchModel.js';
import Timetable from '../models/timetableModel.js';
import Teacher from '../models/teacherModel.js';
import { generateTimetableAlgorithm } from '../utils/timetableAlgorithm.js';

export const generateTimetable = async (req, res) => {
    try {
        const { classrooms, labs } = req.body;
        const teachers = await Teacher.find({ tenantId: req.tenantId });
        const batches = await Batch.find({ tenantId: req.tenantId });
        if (!batches.length || !teachers.length || !classrooms?.length || !labs?.length) {
            return res.status(400).json({ message: "Missing required data. Ensure teachers, batches, classrooms, and labs are configured." });
        }
        const generatedSchedules = generateTimetableAlgorithm(batches, teachers, classrooms, labs);
        await Timetable.deleteMany({ tenantId: req.tenantId });
        const timetablePromises = Object.keys(generatedSchedules).map(batchName => {
            const newTimetable = new Timetable({
                batchName,
                schedule: generatedSchedules[batchName],
                tenantId: req.tenantId
            });
            return newTimetable.save();
        });
        await Promise.all(timetablePromises);
        res.status(201).json({ message: 'Timetables generated successfully!', timetables: generatedSchedules });
    } catch (error) {
        console.error('Error during timetable generation:', error);
        res.status(500).json({ message: 'Server error during timetable generation.' });
    }
};

export const getTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find({ tenantId: req.tenantId });
        res.json(timetables);
    } catch (error) {
        console.error('Error fetching timetables:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const addOrUpdateBatch = async (req, res) => {
    const { name, subjects, labs } = req.body;
    if (!name || !subjects || !labs) {
        return res.status(400).json({ message: "Please provide a name, a list of subjects, and a list of labs." });
    }
    try {
        const batch = await Batch.findOneAndUpdate({ name, tenantId: req.tenantId }, { subjects, labs, tenantId: req.tenantId }, { new: true, upsert: true });
        res.status(201).json(batch);
    } catch(error) {
        console.error('Error adding/updating batch:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getBatches = async (req, res) => {
     try {
        const batches = await Batch.find({ tenantId: req.tenantId });
        res.json(batches);
    } catch (error) {
        console.error('Error fetching batches:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteBatch = async (req, res) => {
    try {
        const batch = await Batch.findOne({ _id: req.params.id, tenantId: req.tenantId });

        if (batch) {
            await batch.deleteOne();
            await Timetable.deleteMany({ batchName: batch.name, tenantId: req.tenantId });
            res.json({ message: 'Batch removed' });
        } else {
            res.status(404).json({ message: 'Batch not found' });
        }
    } catch (error) {
        console.error('Error deleting batch:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

