import { useLayoutEffect, useState } from "react";

interface RequestData<T> {
  code: string;
  data: T;
  message: string;
}

export default function <T>(request: Function, dep?: []) {
  const [data, setData] = useState<null | RequestData<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await request();
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, dep || []);
  return { data, loading, error };
}
