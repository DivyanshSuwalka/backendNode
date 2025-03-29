const express = require('express');
const { authentication } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

const courseRouter = express.Router();

// get all courses
courseRouter.get('/courses', authentication, async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: `Error : ${error.message}` });
    }
  }
);

// creating a new course
courseRouter.post('/course', authentication, authorize(['admin']), async (req, res) => {
    try {
      const { title, description } = req.body;
      const course = await Course.create({ title, description });
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: `Error : ${error.message}` });
    }
  }
);

// get a course along with the all associate students 
courseRouter.get('/course/:id', authentication, authorize(['admin']), async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
  
      const enrollments = await Enrollment.find({ course: course._id }).populate('student', 'name email');
      res.json({ course, students: enrollments.map(e => e.student) });
  
    } catch (error) {
      res.status(500).json({ message: `Error : ${error.message}` });
    }
  }
);

// delete a course using course id
courseRouter.delete('/course/:id', authentication, authorize(['admin']), async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
  
      await Enrollment.deleteMany({ course: course._id });
      res.json({ message: `Course - ${course.title} deleted successfully` });
  
    } catch (error) {
      res.status(500).json({ message: `Error : ${error.message}` });
    }
  }
);

module.exports = courseRouter;
