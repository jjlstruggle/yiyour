import { Input } from "antd";
import { Dispatch, SetStateAction } from "react";

export default ({
  ad,
  change,
}: {
  ad: number;
  change: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex items-center">
      <button
        className="flex items-center justify-center w-8 h-8 border-none rounded-md cursor-pointer mx-2"
        onClick={() => {
          if (ad) {
            change(ad - 1);
          }
        }}
      >
        -
      </button>
      <Input
        className="w-10"
        placeholder="0"
        value={ad}
        onChange={(e) => {
          if (!isNaN(e.target.value as unknown as number))
            change(Number(e.target.value));
        }}
      />
      <button
        className="flex items-center justify-center w-8 h-8 border-none rounded-md cursor-pointer mx-2"
        onClick={() => {
          change(ad + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
