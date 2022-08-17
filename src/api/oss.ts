import request from "@/util/fetch";

export const upload = (file: Blob) => {
  let form = new FormData();
  form.append("file", file);
  return request.post("/api-oss", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
