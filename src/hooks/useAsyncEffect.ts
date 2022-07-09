import { useEffect } from "react";

export default function useAsyncEffect(callback: Function, deps?: any[]) {
  useEffect(() => {
    callback();
  }, deps || []);
}
