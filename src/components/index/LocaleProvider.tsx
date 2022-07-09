import { ConfigProvider } from "antd";
import { useContext, useEffect, useState } from "react";
import I18aContext from "src/context/i18a";
import zhCN from "antd/lib/locale/zh_CN";
import resources from "../../locale/resources";
import useAsyncEffect from "src/hooks/useAsyncEffect";

const LocaleProvider = ({ children }: { children: JSX.Element }) => {
  const locale = useContext(I18aContext).language;
  const [language, setLanguage] = useState(zhCN);

  useAsyncEffect(async () => {
    if (locale === "en") {
      const en = await import("antd/lib/locale/en_US");
      const i18n = (await import("i18next")).default;
      const { initReactI18next } = (await import("react-i18next")).default;
      i18n.use(initReactI18next).init({
        lng: locale,
        resources,
        interpolation: {
          escapeValue: false,
        },
      });
      setLanguage(en.default);
    }
  }, [locale]);
  return <ConfigProvider locale={language}>{children}</ConfigProvider>;
};

export default LocaleProvider;
