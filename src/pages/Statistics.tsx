import { Col, FlexboxGrid, Panel, Placeholder } from "rsuite";
import { useState, useEffect } from "react";
import { BsPieChartFill, BsBarChartFill } from "react-icons/bs";
import { MdTimeline } from "react-icons/md";
import { TabBar } from "../components/Tab/TabBar";
import { TabPage } from "../components/Tab/TabPage";
import { TabItem } from "../components/Tab/TabItem";
import { PieChart, LineChart, Line, BarChart, Bars } from "@rsuite/charts";

// mock data for tasks
const tasks: Task[] = [
  {
    priority: 1,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-10T14:30:00"),
    createdDateTime: new Date("2023-04-06T09:00:00"),
    title: "Finish TypeScript tutorial",
    progress: 50,
    content: "Complete the final section on advanced types",
    category: "Learning",
    dueDateTime: new Date("2023-04-20T23:59:59"),
    isCompleted: 0,
    completedDateTime: null,
  },
  {
    priority: 1,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-15T14:30:00"),
    createdDateTime: new Date("2023-04-10T09:00:00"),
    title: "Finish TypeScript tutorial",
    progress: 50,
    content: "Complete the final section on advanced types",
    category: "Learning",
    dueDateTime: new Date("2023-04-20T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-10T22:59:59"),
  },
  {
    priority: 2,
    hasReminder: 0,
    reminderDateTime: null,
    createdDateTime: new Date("2023-04-11T11:30:00"),
    title: "Send email to client",
    progress: 0,
    content: "Follow up on project status",
    category: "Work",
    dueDateTime: new Date("2023-04-12T17:00:00"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-09T21:59:59"),
  },
  {
    priority: 3,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-13T10:00:00"),
    createdDateTime: new Date("2023-04-08T15:00:00"),
    title: "Buy groceries",
    progress: 100,
    content: "Milk, bread, eggs, cheese, fruit, vegetables",
    category: "Personal",
    dueDateTime: new Date("2023-04-15T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-10T22:59:59"),
  },
  {
    priority: 1,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Complete project proposal",
    progress: 0,
    content: "Write a proposal for the new project.",
    category: "Work",
    dueDateTime: new Date("2023-04-30T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-09T23:59:59"),
  },
  {
    priority: 2,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-15T10:00:00"),
    createdDateTime: new Date(),
    title: "Buy groceries",
    progress: 50,
    content: "Milk, bread, eggs, and cheese",
    category: "Personal",
    dueDateTime: new Date("2023-04-15T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-08T23:59:59"),
  },
  {
    priority: 3,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Read book",
    progress: 25,
    content: "Finish reading 'To Kill a Mockingbird'",
    category: "Personal",
    dueDateTime: new Date("2023-04-15T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-07T00:59:59"),
  },
  {
    priority: 1,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-12T09:00:00"),
    createdDateTime: new Date(),
    title: "Complete task manager app",
    progress: 75,
    content: "Finish building the task manager app with React and Node.js",
    category: "Work",
    dueDateTime: new Date("2023-04-30T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-04-06T10:59:59"),
  },
  {
    priority: 2,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Take out the trash",
    progress: 0,
    content: "Take out the trash and recycle",
    category: "Personal",
    dueDateTime: new Date("2023-04-12T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-03-05T10:59:59"),
  },
  {
    priority: 3,
    hasReminder: 1,
    reminderDateTime: new Date("2023-04-13T14:00:00"),
    createdDateTime: new Date(),
    title: "Go for a walk",
    progress: 0,
    content: "Take a walk around the park",
    category: "Personal",
    dueDateTime: new Date("2023-04-13T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-03-06T09:59:59"),
  },
  {
    priority: 1,
    hasReminder: 0,
    reminderDateTime: new Date(),
    createdDateTime: new Date(),
    title: "Prepare presentation",
    progress: 10,
    content: "Create a presentation for the client meeting",
    category: "Work",
    dueDateTime: new Date("2023-04-18T23:59:59"),
    isCompleted: 1,
    completedDateTime: new Date("2023-02-05T08:59:59"),
  },
];

// function to prepare data for pie charts
const getPieData = (tasks: Task[]): Array<[string, number]> => {
  // count the available categories in a map-like structure
  const map: Map<string, number> = new Map();
  for (const { category } of tasks) {
    map.set(category, (map.get(category) || 0) + 1);
  }
  // create pieData array that is required by PieChart
  const pieData: Array<[string, number]> = [];
  for (const [key, value] of map) {
    pieData.push([key, Number(((value / tasks.length) * 100).toFixed(2))]);
  }
  return pieData;
};

// function to prepare data for bar chart
const getBarLastWeekData = (tasks: Task[]): Array<[string, number]> => {
  // populate map with past 7 days' date
  const map: Map<string, number> = new Map();
  const todayDate = new Date();
  for (let i: number = 0; i < 7; i++) {
    map.set(
      new Date(
        todayDate.getTime() - i * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      0
    );
  }
  for (const { completedDateTime } of tasks) {
    const dateString = completedDateTime?.toLocaleDateString();
    if (!dateString || !map.has(dateString)) continue;
    map.set(dateString, (map.get(dateString) || 0) + 1);
  }
  // create barData array that is required by bar chart
  const barLastWeekData: Array<[string, number]> = [];
  for (const [key, value] of map) {
    barLastWeekData.push([key, value]);
  }
  return barLastWeekData.reverse();
};

type BarLastThreeMonthsDataType = {
  categories: Array<string>;
  data: Array<Array<string | number>>;
};

const getBarLastThreeMonthsData = (
  tasks: Task[]
): BarLastThreeMonthsDataType => {
  // populate map with past 7 days' date
  const monthMap: Map<string, Map<string, number>> = new Map();
  const today = new Date();
  for (let i = 0; i < 3; i++) {
    const month = new Date(today.getFullYear(), today.getMonth() - i);
    const monthName = month.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthMap.set(monthName, new Map<string, number>());
  }

  let idx = 1;
  const categoryMap: Map<string, number> = new Map();
  for (const { completedDateTime, category } of tasks) {
    if (!completedDateTime) continue;
    // populate category map if category is not tracked before
    if (!categoryMap.has(category)) {
      categoryMap.set(category, idx);
      idx += 1;
    }
    // create map to keep track of the count of each categories for those three month
    const monthName = completedDateTime.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (!monthMap.has(monthName)) continue;
    const monthMapValue: Map<string, number> = monthMap.get(monthName)!;
    monthMapValue.set(category, (monthMapValue.get(category) || 0) + 1);
    monthMap.set(monthName, monthMapValue);
  }
  // create barData array that is required by bar chart
  const barLastThreeMonthsData: Array<Array<string | number>> = [];
  for (const [monthName, categoryMapForTheMonth] of monthMap) {
    const dataForTheMonth: Array<string | number> = Array(
      categoryMap.size + 1
    ).fill(0);
    dataForTheMonth[0] = monthName;
    for (const [key, value] of categoryMapForTheMonth) {
      dataForTheMonth[categoryMap.get(key)!] = value;
    }
    barLastThreeMonthsData.push(dataForTheMonth);
  }
  return {
    categories: Array.from(categoryMap.keys()),
    data: barLastThreeMonthsData.reverse(),
  };
};

// function to prepare data for line chart
const getTimelineData = (tasks: Task[]) => {
  // create map to count completed tasks for each time frame
  const map: Map<string, number> = new Map();
  for (let i = 0; i < 24; i++) {
    map.set(`${i.toString().padStart(2, "0")}:00`, 0);
  }
  for (const { completedDateTime } of tasks) {
    if (!completedDateTime) continue;
    const completedHour = `${completedDateTime
      .getHours()
      .toString()
      .padStart(2, "0")}:00`;
    map.set(completedHour, (map.get(completedHour) || 0) + 1);
  }
  // create timelineData array that is required by line chart
  const timelineData: Array<[string, number]> = [];
  for (const [key, value] of map) {
    timelineData.push([key, value]);
  }
  return timelineData;
};

const Statistics = () => {
  const [active, setActive] = useState("pie"); // pie | bar | line
  const [isGraphDataLoading, setIsGraphDataLoading] = useState(true);
  const [pieData, setPieData] = useState<Array<[string, number]>>([]);
  const [barLastWeekData, setBarLastWeekData] = useState<
    Array<[string, number]>
  >([]);
  const [barLastThreeMonthsData, setBarLastThreeMonthsData] =
    useState<BarLastThreeMonthsDataType>({ categories: [], data: [] });
  const [timelineData, setTimelineData] = useState<Array<[string, number]>>([]);

  useEffect(() => {
    setPieData(getPieData(tasks));
    setBarLastWeekData(getBarLastWeekData(tasks));
    setBarLastThreeMonthsData(getBarLastThreeMonthsData(tasks));
    setTimelineData(getTimelineData(tasks));
    setIsGraphDataLoading(false);
  }, []);

  // define available tabs
  const tabItems: TabItem[] = [
    {
      eventKey: "pie",
      title: "Pie Chart",
      icon: <BsPieChartFill />,
    },
    {
      eventKey: "bar",
      title: "Bar Chart",
      icon: <BsBarChartFill />,
    },
    {
      eventKey: "line",
      title: "Timeline",
      icon: <MdTimeline />,
    },
  ];

  return (
    <FlexboxGrid justify="center">
      <Col xs={23} md={23} lg={22}>
        <Panel bordered>
          <TabBar
            tabItems={tabItems}
            appearance="tabs"
            active={active}
            onSelect={setActive}
          />
          <TabPage activeTab={active} tabKey="pie">
            <Panel header="Task Category Distribution">
              {isGraphDataLoading ? (
                <Placeholder.Graph active />
              ) : (
                <PieChart
                  name={"Task Category Distribution"}
                  legend={false}
                  donut
                  data={pieData}
                  startAngle={210}
                />
              )}
            </Panel>
          </TabPage>
          <TabPage activeTab={active} tabKey="bar">
            <Panel header="Last Week's Productivity">
              {isGraphDataLoading ? (
                <Placeholder.Graph active />
              ) : (
                <BarChart name={"Task Completed"} data={barLastWeekData} />
              )}
            </Panel>
            <Panel header="Last 3 Months' Productivity">
              {isGraphDataLoading ? (
                <Placeholder.Graph active />
              ) : (
                <BarChart data={barLastThreeMonthsData.data}>
                  {barLastThreeMonthsData.categories.map((category) => (
                    <Bars name={category} />
                  ))}
                </BarChart>
              )}
            </Panel>
          </TabPage>
          <TabPage activeTab={active} tabKey="line">
            <Panel header="Productivity Trend Over Time">
              {isGraphDataLoading ? (
                <Placeholder.Graph active />
              ) : (
                <LineChart data={timelineData}>
                  <Line name={"Tasks Completed"} area />
                </LineChart>
              )}
            </Panel>
          </TabPage>
        </Panel>
      </Col>
    </FlexboxGrid>
  );
};

export default Statistics;
