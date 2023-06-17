import React, { useEffect, useState } from "react";
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
  Toggle,
  Tooltip,
  Whisper,
} from "rsuite";
import Style from "../styles/Tasks.module.css";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { MdNotificationsActive, MdDoneOutline } from "react-icons/md";
import { BsClipboardFill, BsClipboardPlusFill, BsTrash } from "react-icons/bs";
import {
  deleteTask,
  fetchTaskById,
  updateTask,
} from "../features/task/taskSlice";
import { Task, TaskJson, toTask } from "../models/Task";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import moment from "moment";
import { taskCategories } from "../data/taskCategories";
import { FiPlay } from "react-icons/fi";

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

const selectData = taskCategories.map((item) => ({
  label: item,
  value: item,
}));

const CustomDatePicker = React.forwardRef<
  HTMLDivElement | null,
  DatePickerProps
>((props, ref) => <DatePicker {...props} ref={ref} />);

export function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [dueDateFormError, setDueDateFormError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = async (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    if (taskId === undefined) return;
    if (task === null) return;
    const taskUpdated = await dispatch(
      updateTask({ taskId: taskId, updatedTask: task })
    );
    console.log(taskUpdated);
    if (
      taskUpdated.type === "/updateTask/rejected" &&
      taskUpdated.payload ===
        "Validation failed: dueDateTime: Due date cannot be in the past"
    ) {
      setDueDateFormError(taskUpdated.payload as string);
    }
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
                      onClick={(e) => {
                        if (!taskId) return;
                        dispatch(deleteTask(taskId));
                      }}
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
                {moment(task?.createdAt).format("HH:mma DD/M/YYYY") ??
                  "Loading Task..."}
              </p>
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
                      return moment(date).isBefore(moment().subtract(1, "day"));
                    }}
                    onChange={(dateTime) => {
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
                    name="radio"
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
  );
}
