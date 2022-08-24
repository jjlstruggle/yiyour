import { useNavigate } from "react-router-dom";
import { Button } from "antd";
export default function Back() {
  const navigate = useNavigate();
  return (
    <Button
      className="shadow-sm w-24 mb-2 h-10 bg-white text-main text-base font-semibold -translate-y-1"
      onClick={() => {
        navigate("/home");
      }}
    >
      返回
    </Button>
  );
}
