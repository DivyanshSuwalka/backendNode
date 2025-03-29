const express = require('express');
const { authentication } = require('../middlewares/auth');
const {authorize} = require('../middlewares/authorize');
const Enrollment = require('../models/enrollment');
const Course = require('../models/course');

const studentRouter = express.Router();

// student enroll for a course
studentRouter.post('/enroll', authentication, authorize(['student']), async (req, res) => {
    try {
      const { courseId } = req.body;
      const course = await Course.findById(courseId);
  
      if (!course) throw new Error("Course not found!")
  
      const existingEnrollment = await Enrollment.findOne({ student: req.user.id, course: courseId }).populate("course");
      if (existingEnrollment) throw new Error(`Already enrolled for ${existingEnrollment?.course?.title} course`);
        
      let enrollment = await Enrollment.create({ student: req.user.id, course: courseId });

      enrollment = await Enrollment.findById(enrollment._id).populate("student", "name role email").populate("course", "description title");

      res.status(201).json({ message: 'Successfully enrolled', enrollment});
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// student unenroll for a course
studentRouter.post('/unenroll', authentication, authorize(['student']), async (req, res) => {
    try {
      const { courseId } = req.body;
      const enrollment = await Enrollment.findOneAndDelete({ student: req.user.id, course: courseId }).populate("student", "name role email").populate("course", "description title");;
  
      if (!enrollment) throw new Error(`Not enrolled for ${enrollment?.course?.title} course`)
  
      res.json({ message: 'Successfully unenrolled', enrollment });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = studentRouter;
