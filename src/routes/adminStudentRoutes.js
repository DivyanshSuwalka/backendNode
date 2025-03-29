const express = require("express");
const { authentication } = require("../middlewares/auth");
const { authorize } = require("../middlewares/authorize");
const User = require('../models/user');
const Enrollment = require('../models/enrollment');
const adminRouter = express.Router();

// get all students
adminRouter.get("/all-students", authentication, authorize(["admin"]), async (req, res) => {
    try {
      const students = await User.find({ role: 'student' }).select("name email role");
      if(!students.length) throw new Error("No Student found in database!");
      res.json(students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// get a student from id along with its courses
adminRouter.get("/student/:id", authentication, authorize(["admin"]), async (req, res) => {
    try {
      const student = await User.findById(req.params.id).select('-password');
      if (!student || student.role !== 'student') {
        throw new Error("Student not found");
      }
  
      const enrollments = await Enrollment.find({ student: student._id }).populate('course', 'title description');
      res.json({ student, courses: enrollments.map(e => e.course) });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// delete a student from id
adminRouter.delete("/student/:id", authentication, authorize(["admin"]), async (req, res) => {
    try {
      const student = await User.findByIdAndDelete(req.params.id);
      if (!student) throw new Error("Student not found");
  
      await Enrollment.deleteMany({ student: student._id });
      res.json({ message: `${student.name} deleted successfully` });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = adminRouter;
