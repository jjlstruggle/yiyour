import request from "@/util/fetch";

export const login = (email: string, psword: string) => {
  const data = { email, password: psword };
  return request.post("/api-auth/password/login", JSON.stringify(data));
};
export const codeLogin = (code: string, phone: string) => {
  const data = { code, phone: phone };
  return request.post("/api-auth/code/login", JSON.stringify(data));
};
export const register = (
  phone: string,
  psword: string,
  email: string,
  code: string
) => {
  const data = { email, password: psword, phone, code };
  return request.post("/api-auth/register", JSON.stringify(data));
};

export const sendCode = (phone: string) => {
  return request.post(`/api-auth/send/phone?phone=${phone}`, undefined, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const forgetPassword = (
  phone: string,
  code: string,
  password: string
) => {
  return request.post(
    `/api-auth/forget`,
    JSON.stringify({
      code,
      password,
      phone,
    })
  );
};
