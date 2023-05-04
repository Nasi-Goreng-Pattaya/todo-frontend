import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Navbar, Nav, FlexboxGrid } from "rsuite";
import { BsFillPatchCheckFill, BsPersonFill } from "react-icons/bs";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import Style from "./styles/App.module.css";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import { Register } from "./pages/Register";
import { TaskDetail } from "./pages/TaskDetail";
import { Task } from "./models/Task";
import mockTasksData from "./data/data";

function App() {
  return (
    <div className={Style["wrapper"]}>
      <header className={Style["header"]}>
        <Navbar appearance="inverse">
          <Navbar.Brand as={Link} to="/">
            <FlexboxGrid align="middle">
              <BsFillPatchCheckFill
                className={`${Style["white-color"]} ${Style["mr-10"]}`}
              />
              <p className={Style["white-color"]}>Todo</p>
            </FlexboxGrid>
          </Navbar.Brand>
          <Nav>
            <Nav.Item as={Link} to={"/tasks"}>
              Tasks
            </Nav.Item>
            <Nav.Item as={Link} to={"/statistics"}>
              Statistics
            </Nav.Item>
          </Nav>
          <Nav pullRight>
            <Nav.Menu icon={<BsPersonFill />}>
              <Nav.Item as={Link} to="/profile">
                Profile
              </Nav.Item>
              <Nav.Item as={Link} to="/login">
                Login
              </Nav.Item>
              <Nav.Item as={Link} to="/register">
                Register
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </Navbar>
      </header>
      <main className={Style["content-wrapper"]}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/tasks" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route
            path="/statistics"
            element={<Statistics tasks={mockTasksData} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task/:taskId" element={<TaskDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
