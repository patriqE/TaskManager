import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:3001/tasks";

export const fetchTasks = (): Promise<Task[]> => {
  return axios.get<Task[]>(API_URL).then((res) => res.data);
};
export const createTask = (task: Omit<Task, "id">): Promise<Task> =>
  axios.post(API_URL, task).then((res) => res.data);
export const deleteTask = (id: string) => axios.delete(`${API_URL}/${id}`);
export const updateTaskStatus = (
  id: string,
  status: "pending" | "done"
): Promise<void> => {
  return axios
    .patch(`${API_URL}/${id}`, { status })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || "Failed to update task");
    });
};