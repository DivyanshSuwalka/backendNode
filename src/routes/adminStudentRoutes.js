const express = require("express");
const { authentication } = require("../middlewares/auth");
const { authorize } = require("../middlewares/authorize");
const User = require('../models/user');
const Enrollment = require('../models/enrollment');
const adminRouter = express.Router();

adminRouter.get("/all-students", authentication, authorize(["admin"]), async (req, res) => {
    try {
      const students = await User.find({ role: 'student' }).select("name email role");
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students!' });
    }
  }
);
adminRouter.get("/student/:id", authentication, authorize(["admin"]), async (req, res) => {
    try {
      const student = await User.findById(req.params.id).select('-password');
      if (!student || student.role !== 'student') {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const enrollments = await Enrollment.find({ student: student._id }).populate('course', 'title description');
      res.json({ student, courses: enrollments.map(e => e.course) });
  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student details' });
    }
  }
);
adminRouter.delete("/student/:id", authentication, authorize(["admin"]), async (req, res) => {
    try {
      const student = await User.findByIdAndDelete(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      await Enrollment.deleteMany({ student: student._id });
      res.json({ message: `${student.name} deleted successfully` });
  
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student' });
    }
  }
);

module.exports = adminRouter;
