import {
  forwardRef,
  ForwardedRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";

interface SelectProps {
  item: string[];
  defaultSelect?: number;
}

type ExtraSelectProps = SelectProps & { s: ForwardedRef<number> };

function Select({ defaultSelect, item, s }: ExtraSelectProps) {
  const [select, setSelect] = useState(defaultSelect || 0);
  const transformSelect = useRef(defaultSelect || 0);
  transformSelect.current = select;
  useImperativeHandle(s, () => transformSelect.current);

  return (
    <div className="flex text-sm font-normal">
      {item.map((s, index) => (
        <div className="flex items-center ml-4" key={index}>
          <div
            onClick={() => {
              setSelect(index);
            }}
            className={
              select === index
                ? "w-3 h-3 border rounded-full  mr-1 bg-yel cursor-pointer"
                : "w-3 h-3 border rounded-full border-black mr-1 cursor-pointer border-solid"
            }
          ></div>
          <div>{s}</div>
        </div>
      ))}
    </div>
  );
}

export default forwardRef((props: SelectProps, ref: ForwardedRef<number>) => (
  <Select {...props} s={ref} />
));
