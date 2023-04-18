import { Col, Row, FlexboxGrid, Button, Nav, Panel } from "rsuite";
import Style from "../styles/Tasks.module.css";
import {
  FaPlus,
  FaTasks,
  FaRegCalendarAlt,
  FaRegArrowAltCircleDown,
  FaChartPie,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { useState } from "react";

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

const Tasks = () => {
  const [active, setActive] = useState("toDo");

  const handleAddTaskButton = () => {
    // TODO prompt add task modal
  };

  return (
    <FlexboxGrid justify="center">
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
              onClick={() => handleAddTaskButton()}
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
