import request from "@/util/fetch";
import {
  OperateWorksParams,
  SearchWorksByPageParams,
  UpdateWorksParams,
} from "@/interface/api";

export const operateWorks = (data: OperateWorksParams) => {
  return request.post("/api-works", JSON.stringify(data));
};

export const updateWorks = (data: UpdateWorksParams) => {
  return request.put("/api-works", JSON.stringify(data));
};

export const deleteWorks = (ids: string[]) => {
  return request.post("/api-works/delete", JSON.stringify({ ids }));
};

export const deleteWork = (id: string) => {
  return request.delete(`/api-works/${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const searchWorksByPage = (data: SearchWorksByPageParams) => {
  return request.post("/api-works/list", JSON.stringify(data));
};

export const searchWorksByUser = (page: number, id: string) => {
  return request.get(`/api-works/publisher/${page}/8?publisherId=${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getWorkDetail = (workId: string) => {
  return request.get(`/api-works/${workId}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
