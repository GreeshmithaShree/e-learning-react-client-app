import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

import UserList from "./UserList";
import GetUserById from "./GetUserById";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

import CreateCourse from "./CreateCourse";
import AllCourses from "./AllCourses";
import CourseDetails from "./CourseDetails";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<GetUserById />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/users/delete/:id" element={<DeleteUser />} />

        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/update/:id" element={<UpdateCourse />} />
        <Route path="/courses/delete/:id" element={<DeleteCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
