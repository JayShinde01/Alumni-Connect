
import React from 'react'
  import { BrowserRouter as Router,Link,Routes ,Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import StudentLogin from './pages/StudentLogin';
import AlumniLogin from './pages/AlumniLogin';
import AlumniRegistration from './pages/AlumniRegistration';
import About from './pages/About';
import StudentDashboard from './pages/StudentDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import Register from './pages/Register';
import AlumniDirectory from './pages/AlumniDirectory';
import AlumniProfile from './pages/AlumniProfile';
import InterviewRequests from './pages/InterviewRequests';

function App() {

  return (

    <Router>
      <Routes>
        <Route path={"/"} element={<Home/>}></Route>
         <Route path={"/login"} element={<Login/>}></Route>
         <Route path={"/slog"} element={<StudentLogin/>}></Route>
         <Route path={"/Alumnilogin"} element={<AlumniLogin/>}></Route>
          <Route path={"/contactus"} element={<ContactUs/>}></Route>
          <Route path={"/registration"} element={<Register/>}></Route>
          <Route path={"/about"} element={<About/>}></Route>
          <Route path={"/student-dashboard"} element={<StudentDashboard/>}></Route>
          <Route path={"/alumni-dashboard"} element={<AlumniDashboard/>}></Route>
          <Route path={"/alumnidirectory"} element={<AlumniDirectory/>}></Route>
          <Route path={"/alumniprofile"} element={<AlumniProfile/>}></Route>
          <Route path={"/requests"} element={<InterviewRequests/>}></Route>
      </Routes>
    </Router>

  )
}

export default App