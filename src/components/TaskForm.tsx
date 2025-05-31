import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskService";
import { Task } from "../types";

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // Use mutation to create new task
  const mutation = useMutation({
    mutationFn: (newTask: Omit<Task, "id">) => createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Invalidate cache after mutation
      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description,
      status: "pending" as const, // Added type assertion
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={mutation.isPending} // Show loading state
      >
        {mutation.isPending ? "Adding..." : "Add Task"} 
      </button>
      {mutation.isError && (
        <p>
          Error:{" "}
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Failed to add task"}
        </p>
      )}
    </form>
  );
};
