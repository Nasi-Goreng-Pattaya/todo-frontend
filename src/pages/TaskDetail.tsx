import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Col,
  DatePicker,
  DatePickerProps,
  FlexboxGrid,
  Form,
  Input,
  InputProps,
  Panel,
  Radio,
  RadioGroup,
  SelectPicker,
} from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

const styles: { [x: string]: React.CSSProperties } = {
  createdOnText: {
    color: "#EF7979",
    fontSize: "14px",
  },
  dropdownSelection: {
    minWidth: "11rem",
  },
};

const Textarea = React.forwardRef<HTMLTextAreaElement | null, InputProps>(
  (props, ref) => <Input {...props} as="textarea" ref={ref} />
);

const selectData = ["Personal", "Work"].map((item) => ({
  label: item,
  value: item,
}));

const CustomDatePicker = React.forwardRef<
  HTMLDivElement | null,
  DatePickerProps
>((props, ref) => <DatePicker {...props} ref={ref} />);

export function TaskDetail() {
  const { taskId } = useParams();

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
        <Panel
          header={
            <>
              <h3>Task Name Here</h3>
              <p style={styles.createdOnText}>Created on: 11:59pm 24/5/2023</p>
            </>
          }
          bordered
        >
          <Form fluid onSubmit={handleOnSubmit}>
            <Form.Group controlId="content">
              <Form.ControlLabel>Content</Form.ControlLabel>
              <Form.Control
                //@ts-ignore
                rows={5}
                name="content"
                accepter={Textarea}
              ></Form.Control>
            </Form.Group>
            <FlexboxGrid>
              <FlexboxGridItem colspan={12}>
                <Form.Group controlId="dueDate">
                  <Form.ControlLabel>Due Date:</Form.ControlLabel>
                  <Form.Control
                    format="hh:mmaa dd/MM/yyyy"
                    //@ts-ignore
                    defaultValue={new Date()}
                    ranges={[
                      {
                        label: "Now",
                        value: new Date(),
                      },
                    ]}
                    name="dueDate"
                    accepter={CustomDatePicker}
                  />
                </Form.Group>
              </FlexboxGridItem>
              <FlexboxGridItem colspan={12} style={{ marginBottom: "1rem" }}>
                <Form.Group controlId="category">
                  <Form.ControlLabel>Category:</Form.ControlLabel>
                  <Form.Control
                    name="category"
                    style={styles.dropdownSelection}
                    accepter={SelectPicker}
                    data={selectData}
                  />
                </Form.Group>
              </FlexboxGridItem>
            </FlexboxGrid>
            <Form.Group controlId="priority">
              <Form.ControlLabel>Priority:</Form.ControlLabel>
              <Form.Control inline name="radio" accepter={RadioGroup}>
                <Radio value="Low">Low</Radio>
                <Radio value="Medium">Medium</Radio>
                <Radio value="High">High</Radio>
              </Form.Control>
            </Form.Group>
            <FlexboxGrid justify="space-around">
              <FlexboxGridItem colspan={9}>
                <Form.Group>
                  <ButtonToolbar>
                    <Button
                      type="submit"
                      appearance="primary"
                      block
                      loading={false}
                    >
                      Save
                    </Button>
                  </ButtonToolbar>
                </Form.Group>
              </FlexboxGridItem>
              <FlexboxGridItem colspan={9}>
                <ButtonToolbar>
                  <Button appearance="primary" block loading={false}>
                    Cancel
                  </Button>
                </ButtonToolbar>
              </FlexboxGridItem>
            </FlexboxGrid>
          </Form>
        </Panel>
      </FlexboxGridItem>
    </FlexboxGrid>
  );
}
