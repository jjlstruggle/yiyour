import { Input } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { ForwardedRef, forwardRef, useState } from "react";

function Text(props: { text: ForwardedRef<TextAreaRef> }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex mb-4 text-base font-normal">
      <div className="w-3/4 relative">
        <Input.TextArea
          ref={props.text}
          autoSize={{ minRows: 2, maxRows: 3 }}
          allowClear
          maxLength={200}
          placeholder="需求说明"
          value={value}
          onChange={(e) => {
            if (e.target.value.length < 200) {
              setValue(e.target.value);
            }
          }}
        />
        <div className="absolute right-2 bottom-2 text-gray-400 z-40">
          {value.length} / 200
        </div>
      </div>
    </div>
  );
}

export default forwardRef((props, ref: ForwardedRef<TextAreaRef>) => (
  <Text {...props} text={ref} />
));
