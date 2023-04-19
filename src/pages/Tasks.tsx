import {
  Col,
  Row,
  FlexboxGrid,
  Button,
  Nav,
  Panel,
  Modal,
  Form,
  Input,
  InputProps,
  SelectPicker,
  Radio,
  RadioGroup,
  Schema,
  ButtonToolbar,
  Toggle,
  DatePickerProps,
  DatePicker,
} from "rsuite";
import Style from "../styles/Tasks.module.css";
import {
  FaPlus,
  FaTasks,
  FaRegCalendarAlt,
  FaRegArrowAltCircleDown,
  FaChartPie,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { useState, forwardRef, useRef } from "react";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

// task schema
const { StringType, BooleanType, DateType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired("Task name is required"),
  priority: StringType().isRequired("Task priority is required"),
  category: StringType().isRequired("Task category is required"),
  hasReminder: BooleanType(),
  dueDateTime: DateType(),
});

// empty task list alert section
const EmptyTasksList = ({ active }: { active: string }) => {
  return (
    <Panel className={Style["no-task-panel"]}>
      {active === "toDo" ? (
        <p>You have completed all the tasks!</p>
      ) : active === "inProgress" ? (
        <p>You have no task in progress!</p>
      ) : (
        <p>You have no completed task!</p>
      )}
    </Panel>
  );
};

// add task modal
const AddTaskModal = ({
  open,
  setOpenModal,
}: {
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formValue, setFormValue] = useState({
    title: "",
    category: "",
    priority: "",
    hasReminder: false,
  });
  const formRef = useRef();

  // data selection for category
  const selectData = ["Personal", "Work"].map((item) => ({
    label: item,
    value: item,
  }));

  // function to add task
  const handleAddTask = (
    passValidation: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passValidation) return;
    console.log(event);
    const formData = new FormData(event.currentTarget);
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }

    // TODO: add new task to database

    setOpenModal(false);
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

  const Textarea = forwardRef<HTMLTextAreaElement | null, InputProps>(
    (props, ref) => {
      // console.log(ref);
      return <Input {...props} as="textarea" ref={ref} rows={4} />;
    }
  );

  const CustomDatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
    (props, ref) => <DatePicker {...props} ref={ref} />
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
            <Form.Control name="title" />
            <Form.HelpText>Task name is required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="content">
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name="content" accepter={Textarea}></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.ControlLabel>Category:</Form.ControlLabel>
            <Form.Control
              name="category"
              style={styles.dropdownSelection}
              accepter={SelectPicker}
              data={selectData}
              onChange={(value, event) => console.log(value)}
            />
          </Form.Group>
          <FlexboxGrid>
            <FlexboxGridItem colspan={12}>
              <Form.Group controlId="priority">
                <Form.ControlLabel>Priority:</Form.ControlLabel>
                <Form.Control inline name="priority" accepter={RadioGroup}>
                  <Radio value="Low">Low</Radio>
                  <Radio value="Medium">Medium</Radio>
                  <Radio value="High">High</Radio>
                </Form.Control>
              </Form.Group>
            </FlexboxGridItem>
            <FlexboxGridItem colspan={12}>
              <Form.Group controlId="hasReminder">
                <Form.ControlLabel>Reminder:</Form.ControlLabel>
                <Form.Control
                  name="hasReminder"
                  accepter={Toggle}
                ></Form.Control>
              </Form.Group>
            </FlexboxGridItem>
          </FlexboxGrid>
          <Form.Group controlId="dueDate" style={{ margin: "10px 0" }}>
            <Form.ControlLabel>Due Date:</Form.ControlLabel>
            <Form.Control
              format="hh:mmaa dd/MM/yyyy"
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

// page
const Tasks = () => {
  const [active, setActive] = useState("toDo");
  const [openModal, setOpenModal] = useState(false);
  return (
    <FlexboxGrid justify="center">
      <AddTaskModal open={openModal} setOpenModal={setOpenModal} />
      <Col
        xs={23}
        md={21}
        lg={18}
        xl={16}
        className={Style["tasks-list-section"]}
      >
        <Row className={Style["title-row"]}>
          <Col xs={24}>
            <h3>Task List</h3>
          </Col>
          <Col>
            <Button
              className={Style["add-task-btn"]}
              startIcon={<FaPlus />}
              onClick={() => setOpenModal(true)}
            >
              Add Task
            </Button>
          </Col>
        </Row>
        <Nav
          appearance="subtle"
          activeKey={active}
          className={Style["tasks-nav"]}
        >
          <Nav.Item eventKey="toDo" onClick={() => setActive("toDo")}>
            To-Do
          </Nav.Item>
          <Nav.Item
            eventKey="inProgress"
            onClick={() => setActive("inProgress")}
          >
            In-Progress
          </Nav.Item>
          <Nav.Item eventKey="completed" onClick={() => setActive("completed")}>
            Completed
          </Nav.Item>
        </Nav>
        <Row className={Style["list-meta"]}>
          <Col xs={6} sm={7} md={8} lg={9} xl={10} xxl={12}>
            <FaTasks />
            Task Name
          </Col>
          <Col className={Style["list-sm-col"]}>
            <FaChartPie />
            Progress
          </Col>
          <Col className={Style["list-sm-col"]}>
            <FaRegCalendarAlt />
            Due Date
          </Col>
          <Col className={Style["list-sm-col"]}>
            <BiCategory />
            Category
          </Col>
          <Col className={Style["list-sm-col"]}>
            <FaRegArrowAltCircleDown />
            Priority
          </Col>
          {/* <Col style={{ width: "40px", background: "red" }}>.</Col> */}
        </Row>
        <EmptyTasksList active={active} />
      </Col>
    </FlexboxGrid>
  );
};

export default Tasks;
