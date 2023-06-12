import { BsFillPatchCheckFill, BsPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { FlexboxGrid, Nav, Navbar } from "rsuite";
import { logout } from "./features/auth/authSlice";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Register } from "./pages/Register";
import Statistics from "./pages/Statistics";
import { TaskDetail } from "./pages/TaskDetail";
import Tasks from "./pages/Tasks";
import { AppDispatch } from "./store";
import Style from "./styles/App.module.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onAuthPath =
    location.pathname === "/register" || location.pathname === "/login";

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

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
                  <Nav.Item onClick={onLogout}>
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
            element={<Statistics />}
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
