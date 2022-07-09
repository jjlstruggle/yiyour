import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import { Language } from "src/interface/language";

const voidFn: Dispatch<SetStateAction<"zh" | "en">> = () => {};

const I18aContext = createContext<Language>({
  language: "zh",
  setLanguage: voidFn,
});
const Provider = ({ children }: { children: JSX.Element }) => {
  const [l, setL] = useState<"zh" | "en">("zh");
  return (
    <I18aContext.Provider
      value={{
        language: l,
        setLanguage: setL,
      }}
    >
      {children}
    </I18aContext.Provider>
  );
};

export default I18aContext;
export { Provider };
