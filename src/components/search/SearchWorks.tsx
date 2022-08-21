import { HeartFilled } from "@ant-design/icons";
import useRequest from "@/hooks/useRequest";
import useLazy from "@/hooks/useLazy";
import { searchWorksByPage } from "@/api/work";
import { SearchWorksByPageParams,List,GetList } from "@/interface/api";
import { memo,useState} from "react";
import { Empty,Spin} from "antd"
import Card from "@/common/card"
  const searchParams:SearchWorksByPageParams = {
    "currentPage": 0,
    "pageSize": 0,
    "priceSort": 0,
    "subtypeId": "",
    "timeSort": 0,
    "typeId": ""
  }
function SearchWorks(props:any) {
  const [SearchKey,setSearchKey] = useState(props.searchKey) 
   const NoFound = useLazy(import("@/components/search/NoFound"));
  const { data, loading, error } = useRequest<GetList>(() => searchWorksByPage(searchParams));
   if (data && data.code == "0") {
    console.log(data)
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
                title={item.worksName}
                price={item.worksPrice}
                img={
                  index === 0
                    ? "https://www.mooyuu.com/uploadfile/2021/1011/thumb_1000_0_20211011032316905.png"
                    : item.worksCover
                }
                tag={item.type}
                linked={false}
                ddl={item.worksDeadline}
              />
            </div>
          ))
        ) : (
          <div
          className="mt-6 mx-40 columns-5" style={{ display:"flex",flexFlow:"center",columnFill: "auto" }}>
          <Empty/>
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
      <Spin/>
    </div>
  );
}

export default memo(SearchWorks) 