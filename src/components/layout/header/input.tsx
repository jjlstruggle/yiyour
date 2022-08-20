import { Input ,Select} from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"


export default function HeaderInput() {
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  // const [searchType, setsearchType] = useState("1");  
  const SearchEnterHandle = (e:any)=>{
    if(e.keyCode === 13)
    navigate("/search",{
     state:{
      SearchKeyParams:val
     } 
    });
    }
return (
    <>
    {/* <Select/> */}
    <Input
      value={val}
      onChange={(e) => setVal(e.target.value?.trim())}
      prefix={<SearchOutlined />}
      onKeyUp ={(e)=>{SearchEnterHandle(e)}}
      />
    </>
  
  );
}
