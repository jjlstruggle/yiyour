import { Input, InputRef } from "antd";
import { ForwardedRef, forwardRef, useState } from "react";

function NameInput(props: { ipt: ForwardedRef<InputRef> }) {
  const [name, setName] = useState("");
  return (
    <div className="flex items-center mb-12 ">
      <div className="bg-ger w-3 h-7 mr-2"></div>
      <div className="mr-16">请填写任务标题</div>
      <Input
        style={{ width: 300 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="请输入作品名称"
        ref={props.ipt}
      />
    </div>
  );
}
export default forwardRef((props, ref: ForwardedRef<InputRef>) => (
  <NameInput {...props} ipt={ref} />
));
