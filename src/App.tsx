import {
  Navigate,
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
import PrivateRoute from "./guards/PrivateRoute";

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
      <Route path="tasks"  element={<PrivateRoute outlet={<Tasks />} authenticationElement={<Navigate to="/login" replace />}/>} />
      <Route path="statistics" element={<PrivateRoute outlet={<Statistics />} authenticationElement={<Navigate to="/login" replace />}/>} />
      <Route path="profile" element={<PrivateRoute outlet={<Profile />} authenticationElement={<Navigate to="/login" replace />}/>} />
      <Route path="register" element={<Register />} />
      <Route path="task/:taskId" element={<PrivateRoute outlet={<TaskDetail />} authenticationElement={<Navigate to="/login" replace />}/>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
