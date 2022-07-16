import { Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function HeaderInput() {
  const [val, setVal] = useState("");
  return (
    <Input
      value={val}
      onChange={(e) => setVal(e.target.value)}
      prefix={<SearchOutlined />}
    />
  );
}
