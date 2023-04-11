import { ReactNode } from "react";
import { Panel } from "rsuite";

type TabPageProps = {
  activeTab: string;
  tabKey: string;
  children: ReactNode;
};

export const TabPage = ({ activeTab, tabKey, children }: TabPageProps) => {
  return activeTab === tabKey ? <Panel>{children}</Panel> : null;
};
