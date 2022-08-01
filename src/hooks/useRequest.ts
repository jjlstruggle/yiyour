import { useLayoutEffect, useState } from "react";

export default async function (request: Function, dep?: []) {
  const [data, setData] = useState();
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
