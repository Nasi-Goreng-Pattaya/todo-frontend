import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { MdNotificationsActive, MdDoneOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { fetchTaskById } from "../features/task/taskSlice";
import { TaskJson } from "../models/Task";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

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
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    const formData = new FormData(event.currentTarget);
  };

  useEffect(() => {
    let ignore = false;

    getTask();

    async function getTask() {
      if (!taskId) {
        return;
      }
      const result = await dispatch(fetchTaskById(taskId));
      const task = result.payload as TaskJson;
      if (!ignore) {
        console.log(task);
      }
      return task;
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <FlexboxGrid justify="center">
      <FlexboxGridItem as={Col} md={15} lg={12} xl={9} colspan={21}>
        <Panel
          header={
            <>
              <FlexboxGrid justify="space-between" align="middle">
                <h3>Task Name Here</h3>
                <div>
                  <BsTrash
                    style={{
                      width: "2rem",
                      height: "1.85rem",
                      margin: "0rem 0.25rem",
                    }}
                  />
                  <MdNotificationsActive
                    style={{
                      width: "2rem",
                      height: "2rem",
                      margin: "0rem 0.25rem",
                    }}
                  />
                  <MdDoneOutline
                    style={{
                      width: "2rem",
                      height: "2rem",
                      margin: "0rem 0.25rem",
                    }}
                  />
                </div>
              </FlexboxGrid>
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
                    format="yyyy-MM-dd HH:mm"
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
                  <Link to="/tasks" style={{ display: "contents" }}>
                    <Button appearance="primary" block loading={false}>
                      Cancel
                    </Button>
                  </Link>
                </ButtonToolbar>
              </FlexboxGridItem>
            </FlexboxGrid>
          </Form>
        </Panel>
      </FlexboxGridItem>
    </FlexboxGrid>
  );
}
