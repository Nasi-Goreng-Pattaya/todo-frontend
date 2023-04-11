import { BarChart, Bars, Line, LineChart, PieChart } from "@rsuite/charts";
import { useEffect, useState } from "react";
import { BsBarChartFill, BsPieChartFill } from "react-icons/bs";
import { MdTimeline } from "react-icons/md";
import { Col, FlexboxGrid, Panel, Placeholder } from "rsuite";
import { TabBar } from "../components/Tab/TabBar";
import { TabItem } from "../components/Tab/TabItem";
import { TabPage } from "../components/Tab/TabPage";

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

const Statistics = ({tasks}: {tasks: Task[]}) => {
  type GraphDataType = {
    pieData: Array<[string, number]>;
    barLastWeekData: Array<[string, number]>;
    barLastThreeMonthsData: BarLastThreeMonthsDataType;
    timelineData: Array<[string, number]>;
  };

  const [active, setActive] = useState("pie"); // pie | bar | line
  const [isGraphDataLoading, setIsGraphDataLoading] = useState(true);
  const [graphData, setGraphData] = useState<GraphDataType>({
    pieData: [],
    barLastWeekData: [],
    barLastThreeMonthsData: { categories: [], data: [] },
    timelineData: [],
  });

  useEffect(() => {
    setGraphData({
      pieData: getPieData(tasks),
      barLastWeekData: getBarLastWeekData(tasks),
      barLastThreeMonthsData: getBarLastThreeMonthsData(tasks),
      timelineData: getTimelineData(tasks),
    });
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
      <Col xs={23} md={22} lg={20} xl={16}>
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
                  data={graphData.pieData}
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
                <BarChart
                  name={"Task Completed"}
                  data={graphData.barLastWeekData}
                />
              )}
            </Panel>
            <Panel header="Last 3 Months' Productivity">
              {isGraphDataLoading ? (
                <Placeholder.Graph active />
              ) : (
                <BarChart data={graphData.barLastThreeMonthsData.data}>
                  {graphData.barLastThreeMonthsData.categories.map(
                    (category) => (
                      <Bars name={category} />
                    )
                  )}
                </BarChart>
              )}
            </Panel>
          </TabPage>
          <TabPage activeTab={active} tabKey="line">
            <Panel header="Productivity Trend Over Time">
              {isGraphDataLoading ? (
                <Placeholder.Graph active />
              ) : (
                <LineChart data={graphData.timelineData}>
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
