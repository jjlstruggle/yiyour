/***
 * 任务集市&作品商店
 */
import "./index.css";
import { Tabs, Dropdown, Menu, Button } from "antd";
import useLazy from "@/hooks/useLazy";
import { useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const Bazaar = useLazy(import("@/components/home/bazaar"));

const sorts = ["时间降序", "时间增序"];

const onChange = (key: string) => {
  console.log(key);
};

export default function Index() {
  const [select, setSelect] = useState(0);
  const menu = useRef(
    <Menu
      onClick={({ key }) => {
        setSelect(Number(key));
      }}
      items={sorts.map((item, index) => ({
        key: index,
        label: item,
      }))}
    />
  ).current;

  return (
    <div>
      <div className="mt-4">
        <Tabs
          centered
          defaultActiveKey="1"
          onChange={onChange}
          size="large"
          tabBarGutter={96}
          className="text-xl"
          renderTabBar={(props, DefaultTabbar) => (
            <div className="flex justify-center items-center">
              <DefaultTabbar {...props} />
              <Dropdown
                className="ml-10"
                overlay={menu}
                trigger={["click"]}
                children={
                  <Button type="primary" className="flex items-center">
                    {sorts[select]}
                    <DownOutlined />
                  </Button>
                }
              />
            </div>
          )}
        >
          <TabPane tab="任务集市" key="1">
            <Bazaar />
          </TabPane>
          <TabPane tab="作品商店" key="2"></TabPane>
        </Tabs>
      </div>
    </div>
  );
}
