import { useState } from "react";
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Content,
  FlexboxGrid,
  Form,
  Panel,
  Schema,
} from "rsuite";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOnSubmit = (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    setIsLoading(true);
    // todo perform login operation
    // after validating the user setIsLoading(false);
    // navigate to the main page
  };
  return (
    <Container>
      <Content>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: "100vh" }}
        >
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
                    >
                      Login
                    </Button>
                  </ButtonToolbar>
                  <FlexboxGrid
                    justify="end"
                    align="middle"
                    style={{ marginTop: "10px" }}
                  >
                    <Button appearance="link">Forgot password?</Button>
                  </FlexboxGrid>
                </Form.Group>
              </Form>
            </Panel>
            <FlexboxGrid
              justify="center"
              align="middle"
              style={{ marginTop: "10px" }}
            >
              <p>Don't have an account?</p>
              <Button appearance="link">Register</Button>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default Login;
