import I18aContext from "@/context/i18a";
import { Button } from "antd";
import { useContext } from "react";

export default function Language() {
  const { language, setLanguage } = useContext(I18aContext);
  return (
    <Button
      type="primary"
      className="mr-8 flex items-center"
      onClick={() => {
        if (language === "en") {
          setLanguage("zh");
        } else {
          setLanguage("en");
        }
      }}
    >
      <span
        className={
          language === "zh"
            ? "text-lg font-bold transition-all duration-200"
            : "transition-all duration-200"
        }
      >
        中
      </span>
      &nbsp;/&nbsp;
      <span
        className={
          language === "zh"
            ? "transition-all duration-200"
            : "text-lg font-bold transition-all duration-200"
        }
      >
        英
      </span>
    </Button>
  );
}
