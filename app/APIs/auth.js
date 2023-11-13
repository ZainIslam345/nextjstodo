import api from "./api";

export const register = async (data) => {
  const res = await api.post("/users", data);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res;
};

export const login = async (data) => {
  const res = await api.post("/users/login", data);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res;
};