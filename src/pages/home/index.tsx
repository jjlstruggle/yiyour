/***
 * 任务集市&作品商店
 */
import "./index.css";
import { Carousel, Tabs } from "antd";
import img from "@/assets/temp/shell.jpg";
import useLazy from "@/hooks/useLazy";
const imgs = [img, img, img];
const { TabPane } = Tabs;
const Bazaar = useLazy(import("@/components/home/bazaar"));
const onChange = (key: string) => {
  console.log(key);
};
export default function Index() {
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
