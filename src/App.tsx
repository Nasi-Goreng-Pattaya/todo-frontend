import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Register } from "./pages/Register";
import { Root } from "./pages/Root";
import Statistics from "./pages/Statistics";
import { TaskDetail } from "./pages/TaskDetail";
import Tasks from "./pages/Tasks";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        path=""
        loader={() => {
          return redirect("/login");
        }}
      />
      <Route path="login" element={<Login />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="statistics" element={<Statistics />} />
      <Route path="profile" element={<Profile />} />
      <Route path="register" element={<Register />} />
      <Route path="task/:taskId" element={<TaskDetail />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
