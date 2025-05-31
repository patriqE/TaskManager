import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, deleteTask, updateTaskStatus } from "../api/taskService";
import { Task } from "../types";

export const TaskList = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const queryClient = useQueryClient();

  // Use mutation to delete and update tasks
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "pending" | "done" }) =>
      updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Update error:", error.message);
    },
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <ul>
      {tasks?.map(
        (
          task 
        ) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Status: {task.status}</span>
            <button onClick={() => deleteMutation.mutate(task.id)}>
              Delete
            </button>
            <button
              onClick={() =>
                updateMutation.mutate({
                  id: task.id,
                  status: task.status === "pending" ? "done" : "pending",
                })
              }
            >
              Toggle Status
            </button>
          </li>
        )
      )}
    </ul>
  );
};