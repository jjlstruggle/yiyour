import useRequest from "@/hooks/useRequest";
import { searchWorksByPage } from "@/api/work";
import { TaskList, SearchWorksByPageParams } from "@/interface/api";
import { memo } from "react";
import Card from "@/common/card";
import { Empty } from "antd";

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
        {data.data.list.length ? (
          data.data.list.map((item, index) => (
            <div
              key={index}
              className="mb-5 relative mt-1"
              style={{
                breakInside: "avoid",
              }}
            >
              <Card
                title={item.taskName}
                price={item.taskPrice}
                img={
                  index === 0
                    ? "https://www.mooyuu.com/uploadfile/2021/1011/thumb_1000_0_20211011032316905.png"
                    : item.taskPicture
                }
                tag={item.type}
                linked={false}
                ddl={item.taskDeadline}
              />
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    );
  }
  return (
    <div
      className="columns-5 gap-x-2-3 mt-6 mx-40"
      style={{ columnFill: "auto" }}
    >
      <Empty />
    </div>
  );
}
export default memo(Shop);
