import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsClipboardPlusFill, BsTrash } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";
import { MdDoneOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Message,
  Modal,
  Panel,
  Radio,
  RadioGroup,
  Schema,
  SelectPicker,
  Toggle,
  Tooltip,
  Whisper,
  useToaster,
} from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { taskCategories } from "../data/taskCategories";
import {
  deleteTask,
  fetchTaskById,
  updateTask,
} from "../features/task/taskSlice";
import { Task, TaskJson, toTask } from "../models/Task";
import { AppDispatch } from "../store";
import Style from "../styles/Tasks.module.css";
const styles: { [x: string]: React.CSSProperties } = {
  createdOnText: {
    color: "#EF7979",
    fontSize: "14px",
  },
  dropdownSelection: {
    minWidth: "11rem",
  },
};

const { StringType, BooleanType, DateType } = Schema.Types;

const Textarea = React.forwardRef<HTMLTextAreaElement | null, InputProps>(
  (props, ref) => <Input {...props} as="textarea" ref={ref} />
);

const selectData = taskCategories.map((item) => ({
  label: item,
  value: item,
}));

const CustomDatePicker = React.forwardRef<
  HTMLDivElement | null,
  DatePickerProps
>((props, ref) => <DatePicker {...props} ref={ref} />);

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [dueDateFormError, setDueDateFormError] = useState<string>("");
  const [contentFormError, setContentFormError] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toaster = useToaster();

  const handleOnSubmit = async (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    if (taskId === undefined) return;
    if (task === null) return;

    if (task.content === "") {
      setContentFormError("Task description is required");
      return;
    }

    const taskUpdated = await dispatch(
      updateTask({ taskId: taskId, updatedTask: task })
    );
    if (
      taskUpdated.type === "/updateTask/rejected" &&
      taskUpdated.payload ===
        "Validation failed: dueDateTime: Due date cannot be in the past"
    ) {
      setDueDateFormError(taskUpdated.payload as string);
      return;
    }
    // navigate to task list page once the changes were saved
    navigate(-1);
  };

  const handleOnTaskDelete = async () => {
    // if task does not exists, return
    if (!taskId) return;
    // if task exists, request for confirmation
    const response = await dispatch(deleteTask(taskId));
    // close modal
    setIsDeleteModalOpen(false);
    // navigate back to task list page

    // if (response.type === "/deleteTask/rejected") {
    //   toaster.push(
    //     <Message showIcon type="error">
    //       {`${response.payload?.toString()}`}
    //     </Message>,
    //     { placement: "bottomEnd" }
    //   );
    //   return;
    // }

    navigate(-1);
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
      if (task?._id === undefined || task?._id === null) {
        await toaster.push(
          <Message showIcon type="error">
            Task not found.
          </Message>,
          { placement: "bottomEnd" }
        );
        await timeout(1500);
        navigate(-1);
      }
      if (!ignore) {
        setTask(toTask(task));
      }
      return task;
    }

    return () => {
      ignore = true;
    };
  }, []);

  function showStatusIcon() {
    if (task?.status === "todo") {
      return (
        <Whisper
          trigger="hover"
          placement="right"
          speaker={<Tooltip>Start doing</Tooltip>}
        >
          <button
            className={Style["btn-shake-green"]}
            onClick={(e) => {
              setTask({ ...task, status: "inprogress" });
            }}
          >
            <FiPlay
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0rem 0.25rem",
              }}
            />
          </button>
        </Whisper>
      );
    }
    if (task?.status === "inprogress") {
      return (
        <Whisper
          trigger="hover"
          placement="right"
          speaker={<Tooltip>Mark as done</Tooltip>}
        >
          <button
            className={Style["btn-shake-green"]}
            onClick={(e) => {
              setTask({ ...task, status: "completed" });
            }}
          >
            <MdDoneOutline
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0rem 0.25rem",
              }}
            />
          </button>
        </Whisper>
      );
    }
    if (task?.status === "completed") {
      return (
        <Whisper
          trigger="hover"
          placement="right"
          speaker={<Tooltip>Mark as To Do</Tooltip>}
        >
          <button
            className={Style["btn-shake-green"]}
            onClick={(e) => {
              setTask({ ...task, status: "todo" });
            }}
          >
            <BsClipboardPlusFill
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0rem 0.25rem",
              }}
            />
          </button>
        </Whisper>
      );
    }
    return null;
  }

  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGridItem as={Col} md={15} lg={12} xl={9} colspan={21}>
          <Panel
            header={
              <>
                <FlexboxGrid justify="space-between" align="middle">
                  <h3>{task?.title ?? "Loading Task..."}</h3>
                  <div>
                    <Whisper
                      trigger="hover"
                      placement="right"
                      speaker={<Tooltip>Delete Task</Tooltip>}
                    >
                      <button
                        className={Style["btn-shake-red"]}
                        onClick={() => setIsDeleteModalOpen(true)}
                      >
                        <BsTrash
                          style={{
                            width: "2rem",
                            height: "1.85rem",
                            margin: "0rem 0.25rem",
                          }}
                        />
                      </button>
                    </Whisper>
                    {showStatusIcon()}
                    {/* <MdNotificationsActive
                    style={{
                      width: "2rem",
                      height: "2rem",
                      margin: "0rem 0.25rem",
                    }}
                  /> */}
                  </div>
                </FlexboxGrid>
                <p style={styles.createdOnText}>
                  Created on:{" "}
                  {task !== null && task !== undefined
                    ? moment(task.createdAt).format("HH:mma DD/M/YYYY")
                    : "Loading Task..."}
                </p>
              </>
            }
            bordered
          >
            <Form
              fluid
              onSubmit={handleOnSubmit}
              //   onError={(err) => {
              //     console.log(err);
              //   }}
            >
              <Form.Group controlId="content">
                <Form.ControlLabel>Content</Form.ControlLabel>
                <Form.Control
                  //@ts-ignore
                  rows={5}
                  name="content"
                  errorMessage={contentFormError}
                  accepter={Textarea}
                  value={task?.content ?? "Loading Task Content..."}
                  onChange={(text) => {
                    const newTask = { ...task, content: text } as Task;
                    setTask(newTask);
                  }}
                ></Form.Control>
              </Form.Group>
              <FlexboxGrid>
                <FlexboxGridItem colspan={12}>
                  <Form.Group controlId="dueDate">
                    <Form.ControlLabel>Due Date:</Form.ControlLabel>
                    <Form.Control
                      format="yyyy-MM-dd HH:mm"
                      value={task?.dueDateTime}
                      name="dueDate"
                      errorMessage={dueDateFormError}
                      accepter={CustomDatePicker}
                      shouldDisableDate={(date) => {
                        return moment(date).isBefore(
                          moment().subtract(1, "day")
                        );
                      }}
                      onChange={(dateTime) => {
                        if (dateTime === null) {
                          dateTime = new Date();
                        }
                        const newTask = {
                          ...task,
                          dueDateTime: dateTime,
                        } as Task;
                        setTask(newTask);
                      }}
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
                      value={task?.category}
                      data={selectData}
                      onChange={(category) => {
                        const newTask = { ...task, category: category } as Task;
                        setTask(newTask);
                      }}
                    />
                  </Form.Group>
                </FlexboxGridItem>
              </FlexboxGrid>
              <FlexboxGrid style={{ marginBottom: "1.5rem" }}>
                <FlexboxGridItem colspan={12}>
                  <Form.Group controlId="priority">
                    <Form.ControlLabel>Priority:</Form.ControlLabel>
                    <Form.Control
                      inline
                      name="priority"
                      accepter={RadioGroup}
                      value={task?.priority}
                      onChange={(priority) => {
                        const newTask = { ...task, priority: priority } as Task;
                        if (priority === "low") {
                          newTask.hasReminder = false;
                        }
                        setTask(newTask);
                      }}
                    >
                      <Radio value="low">Low</Radio>
                      <Radio value="medium">Medium</Radio>
                      <Radio value="high">High</Radio>
                    </Form.Control>
                  </Form.Group>
                </FlexboxGridItem>
                <FlexboxGridItem
                  style={{
                    display:
                      task?.priority === "low" || task?.priority === null
                        ? "none"
                        : "flex",
                  }}
                >
                  <Form.Group controlId="hasReminder">
                    <Form.ControlLabel>Reminder:</Form.ControlLabel>
                    <Form.Control
                      name="hasReminder"
                      accepter={Toggle}
                      value={task?.hasReminder}
                      onChange={(reminder) => {
                        const newTask = {
                          ...task,
                          hasReminder: reminder,
                        } as Task;
                        setTask(newTask);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </FlexboxGridItem>
              </FlexboxGrid>
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
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header>
          <Modal.Title>Delete Task?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOnTaskDelete} appearance="primary">
            Ok
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
