interface RequestConfig {
  url?: string;
  method?: "POST" | "GET" | "PUT";
}

interface RequestGetConfig {
  headers?: HeadersInit;
  timeout?: number;
}

interface RequestPostConfig {
  headers?: HeadersInit;
  timeout?: number;
}

interface RequestPutConfig {
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

const putBaseConfig: RequestInit = {
  credentials: "include",
  method: "PUT",
};

const deleteBaseConfig: RequestInit = {
  credentials: "include",
  method: "DELETE",
};

const sleep = (time: number) =>
  new Promise<number>((res) => {
    setTimeout(() => {
      res(1);
    }, time);
  });

const resolveConfig = (
  config?: RequestGetConfig | RequestPostConfig,
  shouldHandle?: boolean
) => {
  let token = localStorage.getItem("token");
  let header = localStorage.getItem("header");
  // 如果没有请求头则添加默认请求头
  if ((config && !config.headers) || !config) {
    config = {};
    if (shouldHandle) {
      // @ts-ignore
      config.headers = token
        ? {
            [header!]: token,
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
          };
    }
  } else if (config.headers) {
    if (token && header) {
      config.headers[header] = token;
    }
    if (!config.headers["Content-Type"]) {
      shouldHandle && (config.headers["Content-Type"] = "application/json");
    }
  }
  return config;
};

function initalRequest() {
  const baseUrl = "http://47.96.86.132:88";
  function request(config: RequestConfig) {}
  request.get = async <T = any>(url: string, config?: RequestGetConfig) => {
    const res = await Promise.race([
      fetch(baseUrl + url, Object.assign(resolveConfig(config), getBaseConfig)),
      sleep(config?.timeout || 5000),
    ]);
    if (typeof res === "number") {
      throw "timeout";
    } else {
      return res.json().then((data) => data as T);
    }
  };
  request.post = async <T = any>(
    url: string,
    data?: BodyInit,
    config?: RequestPostConfig,
    shouldHandle: boolean = true
  ) => {
    config = config || {};
    const res = await Promise.race([
      fetch(
        baseUrl + url,
        Object.assign(
          resolveConfig(config, shouldHandle),
          { body: data },
          postBaseConfig
        )
      ),
      sleep(config?.timeout || 8000),
    ]);
    if (typeof res === "number") {
      throw "timeout";
    } else {
      return res.json().then((data) => data as T);
    }
  };
  request.put = async (
    url: string,
    data?: BodyInit,
    config?: RequestPutConfig
  ) => {
    if ((config && !config.headers) || !config) {
      config = {};
      config.headers = {
        "Content-Type": "application/json",
      };
    }
    const res = await Promise.race([
      fetch(
        baseUrl + url,
        Object.assign(resolveConfig(config), { body: data }, putBaseConfig)
      ),
      sleep(config?.timeout || 8000),
    ]);
    if (typeof res === "number") {
      throw "timeout";
    } else {
      return res.json();
    }
  };
  request.delete = async (url: string, config?: RequestGetConfig) => {
    const res = await Promise.race([
      fetch(
        baseUrl + url,
        Object.assign(resolveConfig(config), deleteBaseConfig)
      ),
      sleep(config?.timeout || 5000),
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
