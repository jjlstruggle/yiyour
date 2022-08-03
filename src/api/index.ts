import request from "@/util/fetch";

export const getList = (currentPage: number) => {
  const data = {
    currentPage,
    paegSize: 20,
  };
  return request.post("/api-works/list", JSON.stringify(data));
};
