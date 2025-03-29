# Collections models schema

- user (fields : { name, email, password, role } )
- course (fields : { studentId, title, description } )
- enrollment (fields : { courseId, studentId } )

# APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## adminRouter (admin only)

- GET /admin/allstudents - view all student
- GET /admin/student/:id - view student along with course-id
- DELETE /admin/student/:_id - delete a student using student-id

## courseRouter (admin only)

- GET /courses - view all courses
- POST /course - creating a course
- GET /courses/:id - view course along with the all associate students 
- DELETE /course/:course-id - delete a course using course id

## studentRouter

- POST /student/enroll - enroll for a course
- POST /student/unenroll - unenroll for a course
 
