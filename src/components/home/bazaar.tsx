import { HeartFilled } from "@ant-design/icons";

import useRequest from "@/hooks/useRequest";
import { getList } from "@/api";
import { GetList } from "@/interface/api";

export default function Bazaar() {
  const { data, loading, error } = useRequest<GetList>(() => getList(1));

  if (data && data.code == "0") {
    return (
      <div
        className="columns-5 gap-x-2-3 mt-6 mx-40"
        style={{ columnFill: "auto" }}
      >
        {data.data.list.map((item, index) => (
          <div key={index} className="mb-5 relative inline-block mt-1">
            <img src={item.publisherNickname!} style={{ objectFit: "cover" }} />
            <div className="font-bold text-base">{item.worksName}</div>
            <div className="text-xs text-gray-400">
              {item.worksDeadline}截止
            </div>
            <div className="text-xs text-gray-400">
              {item.type}/{item.subtype}
            </div>
            <div className="text-main text-base">
              悬赏： {item.worksPrice}元
            </div>
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
