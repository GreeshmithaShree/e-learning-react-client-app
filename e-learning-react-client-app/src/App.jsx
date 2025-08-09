import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

import UserHome from './UserHome';
import CourseHome from './CourseHome';
import AssessmentHome from './AssessmentHome';
import EnrollmentHome from './EnrollmentHome';
import SubmissionHome from './SubmissionHome';

import UserList from "./UserList";
import GetUserById from "./GetUserById";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

import CreateCourse from "./CreateCourse";
import AllCourses from "./AllCourses";
import CourseDetails from "./CourseDetails";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

import CreateAssessment from "./CreateAssessment";
import AssessmentList from "./AssessmentList";
import GetAssessmentById from "./GetAssessmentById";
import UpdateAssessment from "./UpdateAssessment";
import DeleteAssessment from "./DeleteAssessment";

import CreateEnrollment from "./CreateEnrollment";
import EnrollmentDetails from "./EnrollmentDetails";
import UpdateEnrollment from "./UpdateEnrollment";
import DeleteEnrollment from "./DeleteEnrollment";

import PostSubmission from "./PostSubmission";
import GetSubmissions from "./GetSubmissions";
import UpdateSubmission from "./UpdateSubmission";
import DeleteSubmission from "./DeleteSubmission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

         <Route path="/dashboard" element={<Dashboard />} />

        {/* Section Homes */}
        <Route path="/user" element={<UserHome />} />
        <Route path="/Course" element={<CourseHome />} />
        <Route path="/Assessment" element={<AssessmentHome />} />
        <Route path="/Enrollment" element={<EnrollmentHome />} />
        <Route path="/Submission" element={<SubmissionHome />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<GetUserById />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/users/delete/:id" element={<DeleteUser />} />

        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/update/:id" element={<UpdateCourse />} />
        <Route path="/courses/delete/:id" element={<DeleteCourse />} />

        <Route path="/assessments/create" element={<CreateAssessment />} />
        <Route path="/assessments" element={<AssessmentList />} />
        <Route path="/assessments/:id" element={<GetAssessmentById />} />
        <Route path="/assessments/update/:id" element={<UpdateAssessment />} />
        <Route path="/assessments/delete/:id" element={<DeleteAssessment />} />

        <Route path="/enrollment/create" element={<CreateEnrollment />} />
        <Route path="/enrollment/:id" element={<EnrollmentDetails />} />
        <Route path="/enrollment/update/:id" element={<UpdateEnrollment />} />
        <Route path="/enrollment/delete/:id" element={<DeleteEnrollment />} />

        <Route path="/submissions/create" element={<PostSubmission />} />
        <Route path="/submissions" element={<GetSubmissions />} />
        <Route path="/submissions/update/:id" element={<UpdateSubmission />} />
        <Route path="/submissions/delete/:id" element={<DeleteSubmission />} />
      </Routes>
    </Router>
  );
}

export default App;
