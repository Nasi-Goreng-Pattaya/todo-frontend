import { Routes, Route, Link } from "react-router-dom";
import {
  Container,
  Header,
  Content,
  Footer,
  Sidebar,
  Button,
  Navbar,
  Nav,
  FlexboxGrid,
} from "rsuite";
import { BsFillPatchCheckFill, BsPersonFill } from "react-icons/bs";
import Home from "./pages/Home";

function App() {
  return (
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Brand href="/">
            <FlexboxGrid align="middle">
              <BsFillPatchCheckFill
                style={{ color: "#fff", marginRight: "10px" }}
              />
              <p style={{ color: "#fff" }}>Todo</p>
            </FlexboxGrid>
          </Navbar.Brand>
          <Nav>
            <Nav.Item href="/">Home</Nav.Item>
            <Nav.Item href="/statistics">Statistics</Nav.Item>
          </Nav>
          <Nav pullRight>
            <Nav.Menu icon={<BsPersonFill />}>
              <Nav.Item href="/profile">Profile</Nav.Item>
              <Nav.Item href="/login">Login</Nav.Item>
              <Nav.Item href="/register">Register</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Navbar>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Content>
    </Container>
  );
}

export default App;
