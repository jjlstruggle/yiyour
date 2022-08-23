import useRequest from "@/hooks/useRequest";
import { searchList } from "@/api/task";
import { TaskList } from "@/interface/api";
import { memo } from "react";
import Card from "@/common/card";
import { Empty, Spin } from "antd";
function Bazaar() {
  const { data, loading, error } = useRequest<TaskList>(() => searchList(1));

  if (data && data.code == "0") {
    return (
      <div className="mt-6 mx-40 columns-5" style={{ columnFill: "auto" }}>
        {data.data.list.length ? (
          data.data.list.map((item, index) => (
            <div
              key={index}
              className="mb-5 relative mt-1"
              style={{
                breakInside: "avoid",
                order: index,
              }}
            >
              <Card
                title={item.taskName}
                price={item.taskPrice}
                img={item.taskPicture}
                tag={item.type}
                linked={false}
                ddl={item.taskDeadline}
              />
            </div>
          ))
        ) : (
          <div
            className="w-256 h-256 mt-6"
            style={{ margin: "0 25%", columnFill: "auto" }}
          >
            <Empty />
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className="columns-5 gap-x-2-3 mt-6 mx-40"
      style={{ columnFill: "auto" }}
    >
      <Spin />
    </div>
  );
}

export default memo(Bazaar);
