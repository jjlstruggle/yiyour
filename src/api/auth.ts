import request from "@/util/fetch";

export const login = (email: string, psword: string) => {
  const data = { email, password: psword };
  return request.post("/api-auth/password/login", JSON.stringify(data));
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
