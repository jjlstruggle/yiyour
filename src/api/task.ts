import request from "@/util/fetch";
import { PublishParams } from "@/interface/api";

export const publish = (data: PublishParams) => {
  return request.post("/api-task/build", JSON.stringify(data));
};

export const getTaskInfo = (id: string) => {
  return request.get(`/api-task/info?id=${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const searchList = (page: number) => {
  return request.get(`/api-task/list?limit=16&page=${page}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getUserPublish = (page: number, id: string) => {
  return request.get(`/api-task/publisher/${page}/8?publisherId=${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
export const getUserCommitted = (page: number) => {
  return request.get(`/api-task/committed/${page}/8`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
export const getUserCollected = (page: number) => {
  return request.get(`/api-task/collected/${page}/8`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getRecommend = () => {
  return request.get("/api-task/recommend", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
