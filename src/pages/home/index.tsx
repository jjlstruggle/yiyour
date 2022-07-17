/***
 * 任务集市&作品商店
 */
import "./index.css";
import { Carousel, Tabs, Dropdown, Menu, Button } from "antd";
import img from "@/assets/temp/shell.jpg";
import useLazy from "@/hooks/useLazy";
import { Fragment, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const imgs = [img, img, img];
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
      <div className="bg-main flex flex-col items-center w-full py-8">
        <div className="w-1/2 rounded-md h-[210px]">
          <Carousel autoplay style={{ height: 210 }}>
            {imgs.map((item, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-center"
              >
                <img src={item} className="w-full h-[210px]" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="mt-4">
        <Tabs
          centered
          defaultActiveKey="1"
          onChange={onChange}
          size="large"
          tabBarGutter={96}
          className="text-xl"
          tabBarExtraContent={
            <Fragment>
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                children={
                  <Button type="primary" className="flex items-center">
                    {sorts[select]}
                    <DownOutlined />
                  </Button>
                }
              />
            </Fragment>
          }
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
