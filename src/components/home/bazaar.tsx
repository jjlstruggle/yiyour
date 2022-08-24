import useRequest from "@/hooks/useRequest";
import { searchList } from "@/api/task";
import { TaskList, TaskListInfo } from "@/interface/api";
import { memo, useEffect, useRef, useState } from "react";
import Card from "@/common/card";
import { Empty, Spin } from "antd";
import Loading from "@/common/loading";

const Task = ({
  index,
  item,
  io,
}: {
  index: number;
  item: TaskListInfo;
  io: IntersectionObserver;
}) => {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    io.observe(root.current!);
  }, []);
  return (
    <div
      ref={root}
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
  );
};

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

          if (entries.length <= 1) {
            setPage((page) => page + 1);
          }
        }
      });
    })
  ).current;

  let taskList = data as unknown as TaskListInfo[];

  if (loading) return <Loading loading={loading} />;
  else if (!taskList.length)
    return (
      <div
        className="w-256 h-256 mt-6"
        style={{ margin: "0 25%", columnFill: "auto" }}
      >
        <Empty />
      </div>
    );
  return (
    <div className="bg-slate-200 mt-6 mx-32 px-8 pt-8 rounded-md">
      <div className=" columns-5   " style={{ columnFill: "auto" }}>
        {taskList.map((item, index) => (
          <Task key={index} item={item} index={index} io={io} />
        ))}
      </div>
      <div className="text-center py-4">到底啦~~~</div>
    </div>
  );
}

export default memo(Bazaar);
