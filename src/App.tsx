import { Routes, Route, Link } from "react-router-dom";
import { Container, Header, Content, Navbar, Nav, FlexboxGrid } from "rsuite";
import { BsFillPatchCheckFill, BsPersonFill } from "react-icons/bs";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Brand as={Link} to="/">
            <FlexboxGrid align="middle">
              <BsFillPatchCheckFill
                style={{ color: "#fff", marginRight: "10px" }}
              />
              <p style={{ color: "#fff" }}>Todo</p>
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
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Content>
    </Container>
  );
}

export default App;
