import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "@/layout";

import Admin from "./pages/admin/login/login";
import Console from "./pages/admin/index";

import { Provider } from "@/context/i18a";
import { BrowserRouter } from "react-router-dom";
import LocaleProvider from "@/context/LocaleProvider";
import { Routes, Route } from "react-router-dom";
import { Provider as DialogProvider } from "@/context/dialog";
import { Provider as ReduxProvider } from "react-redux";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { Provider as UserProvider } from "./context/user";
import store from "@/redux";
import Account from "./pages/account";
dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ReduxProvider store={store}>
    <DialogProvider>
      <UserProvider>
        <Provider>
          <LocaleProvider>
            <BrowserRouter basename="/yihua">
              <Routes>
                <Route path="/*" element={<Layout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/console/*" element={<Console />} />
                <Route path="/account/*" element={<Account />} />
              </Routes>
            </BrowserRouter>
          </LocaleProvider>
        </Provider>
      </UserProvider>
    </DialogProvider>
  </ReduxProvider>
);
