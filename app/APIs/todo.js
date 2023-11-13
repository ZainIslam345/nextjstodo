import api from "./api";


export const getAllTodos = async () => {
    const res = await api.get("/todos");
    console.log('res',res)
    return res;
};

export const setTodo = async (data) => {
  const res = await api.post("/todos", data);
  return res;
};

export const updateTodo = async (id,data) => {
  const res = await api.put(`/todos/${id}`, data);
  return res;
};

export const deleteTodo = async (id) => {
  const res = await api.delete(`/todos/${id}`);
  return res;
};