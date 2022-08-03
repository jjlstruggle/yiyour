import { useState, createContext, Dispatch, SetStateAction } from "react";

interface User {
  hasLogin: boolean;
  userInfo: {};
}

interface UserContext {
  user: User;
  dispatchUserInfo: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<UserContext>({
  user: { hasLogin: false, userInfo: {} },
  dispatchUserInfo: () => {},
});

UserContext.displayName = "UserContext";

const Provider = ({ children }: { children: JSX.Element }) => {
  const [state, setState] = useState<User>({ hasLogin: false, userInfo: {} });

  return (
    <UserContext.Provider
      value={{
        user: state,
        dispatchUserInfo: setState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { Provider };
