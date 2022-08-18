import useRequest from "@/hooks/useRequest";
import { searchWorksByPage } from "@/api/work";
import { TaskList, SearchWorksByPageParams } from "@/interface/api";
import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { memo } from "react";
function Shop({}) {
  let body: SearchWorksByPageParams = {
    currentPage: 1,
    pageSize: 12,
    priceSort: 1,
    subtypeId: "",
    timeSort: 5,
    typeId: "时间降序",
  };
  const { data, loading, error } = useRequest<TaskList>(() =>
    searchWorksByPage(body)
  );
  if (data && data.code == "0") {
    return (
      <div
        className="columns-5 gap-x-2-3 mt-6 mx-40"
        style={{ columnFill: "auto" }}
      >
        {data.data.list.map((item, index) => (
          <div key={index} className="mb-5 relative inline-block mt-1">
            <img src={item.taskPicture} style={{ objectFit: "cover" }} />
            <div className="font-bold text-base">{item.taskName}</div>
            <div className="text-xs text-gray-400">{item.taskDeadline}截止</div>
            <div className="text-xs text-gray-400">
              {item.type}/{item.type}
            </div>
            <div className="text-main text-base">悬赏： {item.taskPrice}元</div>
            <div className="absolute right-0 bottom-0 bg-main w-10 h-10 rounded-full flex items-center justify-center text-white">
              <HeartFilled />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div
      className="columns-5 gap-x-2-3 mt-6 mx-40"
      style={{ columnFill: "auto" }}
    ></div>
  );
}
export default memo(Shop);
