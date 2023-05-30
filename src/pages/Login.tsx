import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Col,
  FlexboxGrid,
  Form,
  Panel,
  Schema,
} from "rsuite";
import Style from "../styles/Login.module.css";
import { LoginCredentials } from "../api/TodoApi";
import * as TaskApi from "../api/TodoApi";
import { LoginUser } from "../models/User";
import { UnauthorizedError } from "../errors/httpErrors";
import { useForm } from "react-hook-form";

interface LoginModalProps {
  onLoginSuccessful: (user: LoginUser) => void;
}

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("Email address is required."),
  password: StringType()
    .isRequired("Password is required.")
    .minLength(8, "Password must be at least 8 characters long."),
});

const Login = ({ onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOnSubmit = async (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>,
    credentials: LoginCredentials
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const emailProvidedByUser: string = formData.get("email") as string;
    const passwordProvidedByUser: string = formData.get("password") as string;
    // todo perform login operation
    // after validating the user setIsLoading(false);
    // navigate to the main page
    try {
      const user = await TaskApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  };
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item as={Col} md={15} lg={12} xl={9} colspan={21}>
        <Panel header={<h3>Login</h3>} bordered>
          <Form fluid model={model} onSubmit={handleOnSubmit}>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email address</Form.ControlLabel>
              <Form.Control name="email" />
              <Form.ErrorMessage />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button
                  type="submit"
                  appearance="primary"
                  block
                  loading={isLoading}
                  // as={Link}
                  // to="/tasks"
                >
                  Login
                </Button>
              </ButtonToolbar>
              <FlexboxGrid
                justify="end"
                align="middle"
                className={Style["mt-10"]}
              ></FlexboxGrid>
            </Form.Group>
          </Form>
        </Panel>
        <FlexboxGrid justify="center" align="middle" className={Style["mt-10"]}>
          <p>Don't have an account?</p>
          <Button as={Link} appearance="link" to="/register">
            Register
          </Button>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Login;
