import useLazy from "@/hooks/useLazy";
const Header = useLazy(import("../../components/user/header"));

/**
 * 个人信息页
 */

export default function Users() {
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        height: "100vh",
        padding: "4vh 5vw",
      }}
    >
      <Header />
    </div>
  );
}
