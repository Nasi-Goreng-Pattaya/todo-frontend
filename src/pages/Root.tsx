import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, FlexboxGrid } from "rsuite";
import { BsFillPatchCheckFill, BsPersonFill } from "react-icons/bs";
import Style from "../styles/App.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { AppDispatch } from "../store";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onAuthPath =
    location.pathname === "/register" || location.pathname === "/login";
  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
                  <Nav.Item onClick={onLogout}>Logout</Nav.Item>
                </Nav.Menu>
              </Nav>
            </>
          ) : null}
        </Navbar>
      </header>
      <main className={Style["content-wrapper"]}>
        <Outlet />
      </main>
    </div>
  );
}
