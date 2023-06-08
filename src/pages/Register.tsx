import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { AuthState, register, reset } from "../features/auth/authSlice";
import { LoginRegisterUser } from "../models/User";

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType()
    .isRequired('Username is required')
    .addRule((value) => {
      return /^[a-zA-Z0-9]+$/.test(value)
    }, 'Username cannot contains symbols'),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired('Email address is required.'),
  password: StringType()
    .isRequired('Password is required.')
    .minLength(8, 'Password must be at least 8 characters long.'),
  confirmPassword: StringType()
    .addRule((value, data) => {
      return value === data.password
    }, 'The two passwords must be equal.')
    .isRequired('Confirm Password is required.')
});

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const toaster = useToaster()

  const { isLoading, isError, isSuccess, message } = useSelector<RootState, AuthState>(
    state => state.auth
  )

  useEffect(() => {
    if (isError) {
      toaster.push(<Message showIcon type='error'>{message}</Message>, { placement: 'bottomEnd' })
    }

    if (isSuccess) {
      navigate('/login')
      toaster.push(<Message showIcon type='success'>{message}</Message>, { placement: 'bottomEnd' })
    }

    dispatch(reset())
  }, [isError, isSuccess, message])

  const handleOnChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: value
    }))
  }

  const handleOnSubmit = (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    const userData: LoginRegisterUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    dispatch(register(userData))
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGridItem as={Col} md={15} lg={12} xl={9} colspan={21}>
        <Panel header={<h3>Register</h3>} bordered>
          <Form fluid model={model} onSubmit={handleOnSubmit}>
            <Form.Group controlId="name">
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control
                name="name"
                onChange={handleOnChange}
              />
              <Form.ErrorMessage />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email address</Form.ControlLabel>
              <Form.Control
                name="email"
                onChange={handleOnChange}
              />
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
            <Form.Group controlId="confirmPassword">
              <Form.ControlLabel>Confirm Password</Form.ControlLabel>
              <Form.Control
                name="confirmPassword"
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
                  Register
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </Panel>
        <FlexboxGrid justify="center" align="middle">
          <p>Already have an account?</p>
          <Button as={Link} appearance="link" to="/login">
            Login
          </Button>
        </FlexboxGrid>
      </FlexboxGridItem>
    </FlexboxGrid>
  );
}
