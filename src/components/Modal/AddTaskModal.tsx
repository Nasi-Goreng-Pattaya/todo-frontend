import {
  FlexboxGrid,
  Button,
  Modal,
  Form,
  Input,
  SelectPicker,
  Radio,
  RadioGroup,
  Schema,
  ButtonToolbar,
  Toggle,
  DatePickerProps,
  DatePicker,
} from "rsuite";
import { useState, forwardRef, memo } from "react";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { Task } from "../../models/Task";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createTask } from "../../features/task/taskSlice";

// task schema
const { StringType, BooleanType, DateType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired("Task name is required"),
  content: StringType(),
  priority: StringType().isRequired("Task priority is required"),
  category: StringType().isRequired("Task category is required"),
  hasReminder: BooleanType(),
  dueDateTime: DateType(),
});

const AddTaskModal = ({
  open,
  setOpenModal,
  setTasks,
}: {
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [formValue, setFormValue] = useState({
    title: "",
    category: "",
    priority: "",
    content: "",
    hasReminder: false,
    dueDateTime: new Date(),
  });

  const dispatch = useDispatch<AppDispatch>();

  // data selection for category
  const selectData = ["Personal", "Work"].map((item) => ({
    label: item,
    value: item,
  }));

  const setValue = (key: string, value: any) => {
    setFormValue((currentFormValue) => {
      return { ...currentFormValue, [key]: value };
    });
  };

  // function to add task
  const handleAddTask = async (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;

    const task = formValue as Task;

    await dispatch(createTask(task));

    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];
      newTasks.push({
        ...formValue,
        taskId: (Math.random() * 10000).toFixed(0).toString(),
        reminderDateTime: null,
        completedDateTime: null,
        status: "todo",
        priority:
          formValue.priority === "low"
            ? "low"
            : formValue.priority === "medium"
            ? "medium"
            : "high",
      });
      return newTasks;
    });

    setOpenModal(false);
    setFormValue({
      title: "",
      category: "",
      priority: "",
      content: "",
      hasReminder: false,
      dueDateTime: new Date(),
    });
  };

  const styles: { [x: string]: React.CSSProperties } = {
    createdOnText: {
      color: "#EF7979",
      fontSize: "14px",
    },
    dropdownSelection: {
      minWidth: "11rem",
    },
  };

  const CustomDatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
    (props, ref) => (
      <DatePicker {...props} ref={ref} defaultValue={new Date()} />
    )
  );

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpenModal(false);
      }}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid model={model} onSubmit={handleAddTask}>
          <Form.Group controlId="title">
            <Form.ControlLabel>Task name</Form.ControlLabel>
            <Form.Control
              name="title"
              onChange={(value) => setValue("title", value)}
              value={formValue.title}
            />
            <Form.HelpText>Task name is required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="content">
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Input
              name="content"
              as="textarea"
              rows={4}
              value={formValue.content}
              onChange={(value) => setValue("content", value)}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.ControlLabel>Category:</Form.ControlLabel>
            <Form.Control
              name="category"
              style={styles.dropdownSelection}
              accepter={SelectPicker}
              data={selectData}
              onSelect={(value) => setValue("category", value)}
            />
          </Form.Group>
          <FlexboxGrid>
            <FlexboxGridItem colspan={12}>
              <Form.Group controlId="priority">
                <Form.ControlLabel>Priority:</Form.ControlLabel>
                <Form.Control
                  inline
                  name="priority"
                  accepter={RadioGroup}
                  onChange={(value) => {
                    if (value === "low") {
                      setValue("hasReminder", false);
                    }
                    setValue("priority", value);
                  }}
                >
                  <Radio value="low">Low</Radio>
                  <Radio value="medium">Medium</Radio>
                  <Radio value="high">High</Radio>
                </Form.Control>
              </Form.Group>
            </FlexboxGridItem>
            <FlexboxGridItem
              colspan={12}
              style={{
                display:
                  formValue.priority === "low" || formValue.priority === ""
                    ? "none"
                    : "flex",
              }}
            >
              <Form.Group controlId="hasReminder">
                <Form.ControlLabel>Reminder:</Form.ControlLabel>
                <Form.Control
                  name="hasReminder"
                  accepter={Toggle}
                  onChange={(value) => setValue("hasReminder", value)}
                  value={formValue.hasReminder}
                ></Form.Control>
              </Form.Group>
            </FlexboxGridItem>
          </FlexboxGrid>
          <Form.Group controlId="dueDate" style={{ margin: "10px 0" }}>
            <Form.ControlLabel>Due Date:</Form.ControlLabel>
            <Form.Control
              format="hh:mmaa dd/MM/yyyy"
              ranges={[
                {
                  label: "Now",
                  value: new Date(),
                },
              ]}
              name="dueDate"
              accepter={CustomDatePicker}
              onSelect={(value) => setValue("dueDateTime", value)}
              value={formValue.dueDateTime}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "20px" }}>
            <ButtonToolbar style={{ justifyContent: "right" }}>
              <Button type="submit" appearance="primary">
                Save
              </Button>
              <Button
                onClick={() => {
                  setOpenModal(false);
                }}
                appearance="subtle"
              >
                Cancel
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default memo(AddTaskModal);
