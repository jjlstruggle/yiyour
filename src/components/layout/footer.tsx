import { Divider } from "antd";

export default function Foot() {
  return (
    <div className="px-40 bg-main">
      <div className="flex">
        <div>
          <div>特征</div>
          <div className="text-gray-300"></div>
        </div>
        <div>
          <div>解决方案</div>
          <div className="text-gray-300"></div>
        </div>
        <div>
          <div>资源</div>
          <div className="text-gray-300"></div>
        </div>
        <div>
          <div>一隅立画</div>
          <div className="text-gray-300"></div>
        </div>
      </div>
      <Divider />
      <div className="text-gray-300">http://www.yiyulihua.com/</div>
    </div>
  );
}
