import { getType } from "@/api/oss";
import Container from "@/components/layout/content";
import Foot from "@/components/layout/footer";
import Head from "@/components/layout/header";
import UserContext from "@/context/user";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { updateOssFormat } from "@/redux/slice/oss";
import "@/styles/layout.less";
import { Ref, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function PageLayout() {
  const dispatch = useDispatch();
  const header: Ref<HTMLDivElement> = useRef(null);
  const footer: Ref<HTMLDivElement> = useRef(null);
  const [heightInfo, setHeightInfo] = useState({
    wh: 0,
    headerHeight: 0,
    footerHeight: 0,
  });
  const { dispatchUserInfo, user } = useContext(UserContext);
  useEffect(() => {
    const wh = document.body.clientHeight; // 总高
    const headerHeight = header.current?.clientHeight!; // 头部高度
    const footerHeight = footer.current?.clientHeight!; // 底部高度
    setHeightInfo({ wh, headerHeight, footerHeight });
  }, []);
  useAsyncEffect(async () => {
    if (localStorage.getItem("token")) {
      dispatchUserInfo({
        hasLogin: true,
        userInfo: JSON.parse(localStorage.getItem("user")!),
      });
    }
    const res = await getType();
    dispatch(updateOssFormat(res.data));
  });
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto block">
      <Head ref={header} user={user} />
      <Container heightInfo={heightInfo} />
      <Foot ref={footer} />
    </div>
  );
}
