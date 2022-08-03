import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "@/layout";
import Admin from "./pages/admin";
import { Provider } from "@/context/i18a";
import { BrowserRouter } from "react-router-dom";
import LocaleProvider from "@/context/LocaleProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider>
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  </Provider>
);
