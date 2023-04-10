import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, FlexboxGrid } from "rsuite";
import { BsFillPatchCheckFill, BsPersonFill } from "react-icons/bs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import Style from "./styles/App.module.css";

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
            <Nav.Item as={Link} to={"/"}>
              Home
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/statistics" element={<Statistics />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
