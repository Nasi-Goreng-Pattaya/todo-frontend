import React from "react";
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
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

const { StringType } = Schema.Types;

export function Register() {
  const model = Schema.Model({
    email: StringType(),
    password: StringType(),
    confirmPassword: StringType(),
  });

  const handleOnSubmit = (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    const formData = new FormData(event.currentTarget);
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGridItem as={Col} md={15} lg={12} xl={9} colspan={21}>
        <Panel header={<h3>Register</h3>} bordered>
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
            <Form.Group controlId="confirmPassword">
              <Form.ControlLabel>Confirm Password</Form.ControlLabel>
              <Form.Control
                name="confirmPassword"
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
                  loading={false}
                  as={Link}
                  to="/login"
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
