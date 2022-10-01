import { useState, createContext, Dispatch, SetStateAction } from "react";

const DialogContext = createContext<any>({
  dialog: {},
  dispatchDialogInfo: () => {},
});

DialogContext.displayName = "DialogContext";

const Provider = ({ children }: { children: JSX.Element }) => {
  const [state, setState] = useState({ open: false });

  return (
    <DialogContext.Provider
      value={{
        dialog: state,
        dispatchDialogInfo: setState,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContext;
export { Provider };
