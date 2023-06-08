import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Col,
  FlexboxGrid,
  Form,
  Message,
  Panel,
  Schema,
  useToaster,
} from "rsuite";
import Style from "../styles/Login.module.css";
import { LoginRegisterUser } from "../models/User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { AuthState, login, reset } from "../features/auth/authSlice";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("Email address is required."),
  password: StringType()
    .isRequired("Password is required.")
    .minLength(8, "Password must be at least 8 characters long."),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const toaster = useToaster()

  const { user, isLoading, isError, isSuccess, message } = useSelector<RootState, AuthState>(
    state => state.auth
  )

  useEffect(() => {
    if (isError) {
      toaster.push(<Message showIcon type='error'>{message}</Message>, { placement: 'bottomEnd' })
    }
    
    if (isSuccess) {
      navigate('/tasks')
      toaster.push(<Message showIcon type='success'>{message}</Message>, { placement: 'bottomEnd' })
    } else if (user) {
      navigate('/tasks')
    }
    
    dispatch(reset())
    console.log({ isError, isSuccess, user, message});
    
  }, [isError, isSuccess, user, message])

  const handleOnChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: value
    }))
  }

  const handleOnSubmit = async (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    const userData: LoginRegisterUser = formData
    dispatch(login(userData))
  }

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item as={Col} md={15} lg={12} xl={9} colspan={21}>
        <Panel header={<h3>Login</h3>} bordered>
          <Form fluid model={model} onSubmit={handleOnSubmit}>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email address</Form.ControlLabel>
              <Form.Control
                name="email"
                onChange={handleOnChange} />
              <Form.ErrorMessage />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button
                  type="submit"
                  appearance="primary"
                  block
                  loading={isLoading}
                >
                  Login
                </Button>
              </ButtonToolbar>
              <FlexboxGrid
                justify="end"
                align="middle"
                className={Style["mt-10"]}
              >
                <Button appearance="link">Forgot password?</Button>
              </FlexboxGrid>
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
