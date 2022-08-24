import useRequest from "@/hooks/useRequest";
import { searchList } from "@/api/task";
import { TaskList, TaskListInfo } from "@/interface/api";
import { memo, useRef, useState } from "react";
import Card from "@/common/card";
import { Empty, Spin } from "antd";

function Bazaar() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useRequest(async () => {
    const curRes = await searchList(page);
    const curTask = curRes.data.list;
    const pre = data || ([] as TaskListInfo[]);
    // @ts-ignore
    return pre.concat(curTask);
  }, [page]);
  const io = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          if (io.takeRecords().length == 0) {
            setPage((page) => page + 1);
          }
        }
      });
    })
  ).current;

  let taskList = data as unknown as TaskListInfo[];

  if (taskList && taskList.length) {
    return (
      <div
        className="mt-6 mx-32 columns-5 bg-slate-200 px-8 py-8 rounded-md"
        style={{ columnFill: "auto" }}
      >
        {taskList.length ? (
          taskList.map((item, index) => (
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
