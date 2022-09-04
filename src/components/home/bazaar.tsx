import { searchList } from "@/api/task";
import { TaskListInfo } from "@/interface/api";
import { memo, useEffect, useRef, useState } from "react";
import Card from "@/common/card";

import Masonry from "react-masonry-css";
import useAsyncEffect from "@/hooks/useAsyncEffect";

const Task = ({ item }: { item: TaskListInfo }) => {
  return (
    <div className="mb-5 relative mt-1">
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

const createIo = (load: any) => {
  let io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        io.disconnect();
        load && load();
      }
    });
  });
  return io;
};

function Bazaar() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState<TaskListInfo[]>([]);
  const totalPage = useRef(0);
  const obsever = useRef<HTMLDivElement>(null);

  useAsyncEffect(async () => {
    if (totalPage.current && page > totalPage.current) return;
    const res = await searchList(page);
    if (!totalPage.current) {
      totalPage.current = res.data.totalPage;
    }
    let curList = res.data.list;
    setList((list) => list.concat(curList));
  }, [page]);
  useEffect(() => {
    if (!totalPage.current) return;
    createIo(() =>
      setPage((page) => {
        if (page == totalPage.current) return page;
        else return page + 1;
      })
    ).observe(obsever.current!);
  }, [list.length]);

  return (
    <div className="bg-slate-200 mt-6 mx-32 px-8 pt-8 rounded-md">
      <Masonry
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        breakpointCols={5}
      >
        {list.map((item, index) => (
          <Task key={index} item={item} />
        ))}
      </Masonry>
      <div className="text-center py-4" ref={obsever}>
        {page <= totalPage.current ? "loading..." : "到底啦~~~"}
      </div>
    </div>
  );
}

export default memo(Bazaar);
