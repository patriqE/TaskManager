import { Task } from "./types";

let tasks: Task[] = [
    {id: "1", title: "Task 1", description: "Do Task 1", status: "pending"},];

    export const getTasks = (): Task[] => tasks;

    export const addTask = (task: Omit<Task, "id">): Task => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
      };
      tasks.push(newTask);
      return newTask;
    };

    export const deleteTask = (id: string) => {
        const index = tasks.findIndex(task => task.id === id);
        if (index!== -1) {
            tasks.splice(index, 1);
            return true;
        }
        return false;
        };

    export const updateTask = (id: string, task: Partial<Task>) => {
        const index = tasks.findIndex(t => t.id === id);
        if (index!== -1) {
            tasks[index] = {...tasks[index],...task};
            return true;
        }
        return false;
        }

    export const updateTaskStatus = (id: string, status: "pending" | "done"): void => {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    };

