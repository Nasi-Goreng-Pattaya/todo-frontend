import { Nav } from "rsuite";
import { TabItem } from "./TabItem";

type TabBarProps = {
  tabItems: TabItem[];
  active: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  appearance: "default" | "subtle" | "tabs" | undefined;
};

export const TabBar = ({
  tabItems,
  active,
  onSelect,
  appearance,
  ...props
}: TabBarProps) => {
  return (
    <Nav
      {...props}
      activeKey={active}
      onSelect={onSelect}
      appearance={appearance}
    >
      {tabItems.map((tabItem, index) => (
        <Nav.Item key={index} eventKey={tabItem.eventKey} icon={tabItem.icon}>
          {tabItem.title}
        </Nav.Item>
      ))}
    </Nav>
  );
};
