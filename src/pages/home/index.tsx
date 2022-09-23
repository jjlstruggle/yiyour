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
const Shop = useLazy(import("@/components/home/shop"));

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
      <div className="my-4 flex justify-center">
        <Tabs
          centered
          defaultActiveKey="1"
          onChange={onChange}
          size="large"
          tabBarGutter={96}
          className="text-xl "
          renderTabBar={(props, DefaultTabbar) => (
            <div className="flex justify-center items-center md:w-[100vw] md:flex-col md:px-4">
              <DefaultTabbar {...props} />
              <Dropdown
                className="ml-10"
                overlay={menu}
                trigger={["click"]}
                children={
                  <Button
                    type="primary"
                    className="flex items-center md:self-end "
                  >
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
          <TabPane tab="作品商店" key="2">
            <Shop />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
