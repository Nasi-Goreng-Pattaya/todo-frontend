import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, FlexboxGrid } from "rsuite";
import { BsFillPatchCheckFill, BsPersonFill } from "react-icons/bs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import Style from "./styles/App.module.css";
import { Register } from "./pages/Register";

// mock data for tasks
const tasks: Task[] = [
  {
    priority: 1,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-10T14:30:00"),
    createdDateTime: new Date("2023-04-06T09:00:00"),
    title: "Finish TypeScript tutorial",
    progress: 50,
    content: "Complete the final section on advanced types",
    category: "Learning",
    dueDateTime: new Date("2023-04-20T23:59:59"),
    isCompleted: 0,
    completedDateTime: null,
  },
  {
    priority: 1,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-15T14:30:00"),
    createdDateTime: new Date("2023-04-10T09:00:00"),
    title: "Finish TypeScript tutorial",
    progress: 50,
    content: "Complete the final section on advanced types",
    category: "Learning",
    dueDateTime: new Date("2023-04-20T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-10T22:59:59"),
  },
  {
    priority: 2,
    hasReminder: 0,
    reminderDateTime: null,
    createdDateTime: new Date("2023-04-11T11:30:00"),
    title: "Send email to client",
    progress: 0,
    content: "Follow up on project status",
    category: "Work",
    dueDateTime: new Date("2023-04-12T17:00:00"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-09T21:59:59"),
  },
  {
    priority: 3,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-13T10:00:00"),
    createdDateTime: new Date("2023-04-08T15:00:00"),
    title: "Buy groceries",
    progress: 100,
    content: "Milk, bread, eggs, cheese, fruit, vegetables",
    category: "Personal",
    dueDateTime: new Date("2023-04-15T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-10T22:59:59"),
  },
  {
    priority: 1,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Complete project proposal",
    progress: 0,
    content: "Write a proposal for the new project.",
    category: "Work",
    dueDateTime: new Date("2023-04-30T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-09T23:59:59"),
  },
  {
    priority: 2,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-15T10:00:00"),
    createdDateTime: new Date(),
    title: "Buy groceries",
    progress: 50,
    content: "Milk, bread, eggs, and cheese",
    category: "Personal",
    dueDateTime: new Date("2023-04-15T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-08T23:59:59"),
  },
  {
    priority: 3,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Read book",
    progress: 25,
    content: "Finish reading 'To Kill a Mockingbird'",
    category: "Personal",
    dueDateTime: new Date("2023-04-15T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-07T00:59:59"),
  },
  {
    priority: 1,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-12T09:00:00"),
    createdDateTime: new Date(),
    title: "Complete task manager app",
    progress: 75,
    content: "Finish building the task manager app with React and Node.js",
    category: "Work",
    dueDateTime: new Date("2023-04-30T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-06T10:59:59"),
  },
  {
    priority: 2,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Take out the trash",
    progress: 0,
    content: "Take out the trash and recycle",
    category: "Personal",
    dueDateTime: new Date("2023-04-12T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-03-05T10:59:59"),
  },
  {
    priority: 3,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-13T14:00:00"),
    createdDateTime: new Date(),
    title: "Go for a walk",
    progress: 0,
    content: "Take a walk around the park",
    category: "Personal",
    dueDateTime: new Date("2023-04-13T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-03-06T09:59:59"),
  },
  {
    priority: 1,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Prepare presentation",
    progress: 10,
    content: "Create a presentation for the client meeting",
    category: "Work",
    dueDateTime: new Date("2023-04-18T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-02-05T08:59:59"),
  },
];

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
          <Route path="/statistics" element={<Statistics tasks={tasks} />} />
          <Route path="/register" element={<Register />} />
          {/*
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
