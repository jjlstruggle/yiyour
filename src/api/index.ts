import request from "@/util/fetch";

export const getList = (data: { currentPage: number; pageSize?: number }) => {
  return request.post("/api-works/list", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
