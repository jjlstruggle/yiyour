import { Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchOrder() {
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const [search, setSearch] = useSearchParams();
  const SearchKeyParams = search.get("val");
  const SearchEnterHandle = (e: any) => {
    if (e.keyCode === 13) {
      console.log(SearchKeyParams);
      navigate("", {
        state: {
          SearchKeyParams,
        },
      });
    }
  };
  return (
    <>
      {/* <Select/> */}
      <Input
        style={{ width: "200px" }}
        value={val}
        onChange={(e) => setVal(e.target.value?.trim())}
        prefix={<SearchOutlined />}
        onKeyUp={(e) => {
          SearchEnterHandle(e);
        }}
      />
    </>
  );
}
