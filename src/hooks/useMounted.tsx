import { useEffect, useRef } from "react";

export default function useMounted(callback: Function) {
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    callback();
  });
}
