import {
  Col,
  Row,
  FlexboxGrid,
  Button,
  Nav,
  Panel,
  Tag,
  Whisper,
  Tooltip,
} from "rsuite";
import Style from "../styles/Tasks.module.css";
import {
  FaPlus,
  FaTasks,
  FaRegCalendarAlt,
  FaRegArrowAltCircleDown,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FiPlay } from "react-icons/fi";
import { MdDoneOutline, MdCloudDone } from "react-icons/md";
import { useEffect, useState } from "react";
import AddTaskModal from "../components/Modal/AddTaskModal";
import { useNavigate } from "react-router-dom";
import { Task, TaskJson, toTaskArray } from "../models/Task";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchTasks, updateTask } from "../features/task/taskSlice";
import { useImmer, Updater } from "use-immer";
import moment from "moment";

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

//single task row in list
const SingleTask = ({
  task,
  setTasks,
  active,
}: {
  task: Task;
  setTasks: Updater<Task[]>;
  active: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const date = moment(task.dueDateTime);
  const dateString = `${moment(date).format("DD/MM/YYYY HH:mm")}`;

  const changeTaskStatus = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    active: string
  ) => {
    e.stopPropagation();
    if (active === "toDo") {
      setTasks((draft) => {
        const foundtask = draft.find(
          (draftTask) => draftTask.taskId === task.taskId
        );
        if (foundtask) {
          foundtask.status = "inprogress";
        }
      });
      await dispatch(
        updateTask({
          taskId: task.taskId,
          updatedTask: { ...task, status: "inprogress" } as Task,
        })
      );
    } else if (active === "inProgress") {
      setTasks((draft) => {
        const foundtask = draft.find(
          (draftTask) => draftTask.taskId === task.taskId
        );
        if (foundtask) {
          foundtask.status = "completed";
        }
      });
      await dispatch(
        updateTask({
          taskId: task.taskId,
          updatedTask: { ...task, status: "completed" } as Task,
        })
      );
    }
  };

  return (
    <Row
      className={Style["single-task"]}
      onClick={() => navigate(`/task/${task.taskId}`)}
    >
      <Col xs={6} sm={7} md={8} lg={9} xl={10} xxl={12} id={Style["task-name"]}>
        {task.title}
      </Col>
      <Col className={Style["list-sm-col"]} id={Style["due-date-col"]}>
        {dateString}
      </Col>
      <Col className={Style["list-sm-col"]}>
        <Tag size="lg">{task.category}</Tag>
      </Col>
      <Col className={Style["list-sm-col"]} id={Style["task-priority"]}>
        {task.priority === "high" ? (
          <Tag size="lg" color="red">
            High
          </Tag>
        ) : task.priority === "medium" ? (
          <Tag size="lg" color="yellow">
            Medium
          </Tag>
        ) : (
          <Tag size="lg" color="green">
            Low
          </Tag>
        )}
      </Col>
      <Col className={Style["task-btn"]}>
        {active === "toDo" ? (
          <Whisper
            trigger="hover"
            placement="right"
            speaker={<Tooltip>Start doing</Tooltip>}
          >
            <button
              className={Style["btn-shake-green"]}
              onClick={(e) => {
                changeTaskStatus(e, active);
              }}
            >
              <FiPlay />
            </button>
          </Whisper>
        ) : active === "inProgress" ? (
          <Whisper
            trigger="hover"
            placement="right"
            speaker={<Tooltip>Mark as done</Tooltip>}
          >
            <button
              className={Style["btn-shake-green"]}
              onClick={(e) => {
                changeTaskStatus(e, active);
              }}
            >
              <MdDoneOutline />
            </button>
          </Whisper>
        ) : (
          <Whisper
            trigger="hover"
            placement="right"
            speaker={<Tooltip>You have done the task!</Tooltip>}
          >
            <button className={Style["green-cloud"]}>
              <MdCloudDone />
            </button>
          </Whisper>
        )}
      </Col>
    </Row>
  );
};

// page
const Tasks = () => {
  const [active, setActive] = useState("toDo");
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useImmer<Task[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let ignore = false;

    getTasks();

    async function getTasks() {
      const result = await dispatch(fetchTasks());
      const task = result.payload as TaskJson[];
      if (!ignore) {
        setTasks(toTaskArray(task));
      }
      return task;
    }

    return () => {
      ignore = true;
    };
  }, []);

  const filteredTask = tasks.filter((task) => {
    if (active === "toDo") {
      return task.status === "todo";
    } else if (active === "inProgress") {
      return task.status === "inprogress";
    } else if (active === "completed") {
      return task.status === "completed";
    }
  });

  return (
    <FlexboxGrid justify="center">
      <AddTaskModal
        open={openModal}
        setOpenModal={setOpenModal}
        setTasks={setTasks}
      />
      <Col
        xs={23}
        md={21}
        lg={18}
        xl={16}
        className={Style["tasks-list-section"]}
      >
        <Row className={Style["title-row"]}>
          <Col xs={24}>
            <h3>Tasks List</h3>
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
          <Col className={Style["list-sm-col"]} id={Style["due-date-col"]}>
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
          <Col style={{ width: "35px" }}>.</Col>
        </Row>
        {filteredTask.length === 0 ? (
          <EmptyTasksList active={active} />
        ) : (
          filteredTask.map((task, i) => {
            return (
              <SingleTask
                task={task}
                setTasks={setTasks}
                key={i}
                active={active}
              />
            );
          })
        )}
      </Col>
    </FlexboxGrid>
  );
};

export default Tasks;
