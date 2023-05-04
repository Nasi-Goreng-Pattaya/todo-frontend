import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const onAuthPath =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <div className={Style["wrapper"]}>
      <header className={Style["header"]}>
        <Navbar appearance="inverse">
          <Navbar.Brand as={Link} to={onAuthPath ? "/login" : "tasks"}>
            <FlexboxGrid align="middle">
              <BsFillPatchCheckFill
                className={`${Style["white-color"]} ${Style["mr-10"]}`}
              />
              <p className={Style["white-color"]}>Todo</p>
            </FlexboxGrid>
          </Navbar.Brand>
          {!onAuthPath ? (
            <>
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
                    Logout
                  </Nav.Item>
                </Nav.Menu>
              </Nav>
            </>
          ) : null}
        </Navbar>
      </header>
      <main className={Style["content-wrapper"]}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route
            path="/statistics"
            element={<Statistics tasks={mockTasksData} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task/:taskId" element={<TaskDetail />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
