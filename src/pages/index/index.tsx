/***
 * 任务集市&作品商店
 */

import { Carousel, Tabs } from "antd";
import img from "@/assets/temp/shell.jpg";
const imgs = [img, img, img];
const { TabPane } = Tabs;
const onChange = (key: string) => {
  console.log(key);
};
export default function Index() {
  return (
    <div>
      <div className="bg-main flex flex-col items-center w-full py-8">
        <div className="w-1/2 rounded-md h-[240px]">
          <Carousel autoplay style={{ height: 240 }}>
            {imgs.map((item, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-center"
              >
                <img src={item} className="w-full h-[240px]" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="mt-8">
        <Tabs
          centered
          defaultActiveKey="1"
          onChange={onChange}
          size="large"
          tabBarGutter={96}
        >
          <TabPane tab="任务集市" key="1"></TabPane>
          <TabPane tab="作品商店" key="2"></TabPane>
        </Tabs>
      </div>
    </div>
  );
}
