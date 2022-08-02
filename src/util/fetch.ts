interface RequestConfig {
  url?: string;
  method?: "POST" | "GET";
}

interface RequestGetConfig {
  headers?: HeadersInit;
  timeout?: number;
}

interface RequestPostConfig {
  headers?: HeadersInit;
  timeout?: number;
}

const getBaseConfig: RequestInit = {
  credentials: "include",
  method: "GET",
};

const postBaseConfig: RequestInit = {
  credentials: "include",
  method: "POST",
};

const sleep = (time: number) =>
  new Promise<number>((res) => {
    setTimeout(() => {
      res(1);
    }, time);
  });

function initalRequest() {
  const baseUrl = "http://47.96.86.132:88";
  function request(config: RequestConfig) {}
  request.get = async (url: string, config?: RequestGetConfig) => {
    const res = await Promise.race([
      fetch(baseUrl + url, Object.assign(getBaseConfig, config)),
      sleep(config?.timeout || 5000),
    ]);
    if (typeof res === "number") {
      throw "timeout";
    } else {
      return res.json();
    }
  };
  request.post = async (
    url: string,
    data?: BodyInit,
    config?: RequestPostConfig
  ) => {
    const res = await Promise.race([
      fetch(
        baseUrl + url,
        Object.assign(postBaseConfig, config, { body: data })
      ),
      sleep(config?.timeout || 8000),
    ]);
    if (typeof res === "number") {
      throw "timeout";
    } else {
      return res.json();
    }
  };
  return request;
}
export default initalRequest();
