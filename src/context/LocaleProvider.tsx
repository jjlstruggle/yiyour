import { ConfigProvider } from "antd";
import { useContext, useState } from "react";
import I18aContext from "src/context/i18a";
import zhCN from "antd/lib/locale/zh_CN";
import resources from "../locale/resources";
import useAsyncEffect from "src/hooks/useAsyncEffect";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  lng: "zh",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

const LocaleProvider = ({ children }: { children: JSX.Element }) => {
  const locale = useContext(I18aContext).language;
  const [language, setLanguage] = useState(zhCN);

  useAsyncEffect(async () => {
    if (locale === "en") {
      const en = await import("antd/lib/locale/en_US");
      setLanguage(en.default);
    }
  }, [locale]);
  return <ConfigProvider locale={language}>{children}</ConfigProvider>;
};

export default LocaleProvider;
