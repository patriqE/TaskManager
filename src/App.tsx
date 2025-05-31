import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskForm />
      <TaskList />
    </QueryClientProvider>
  );
}

export default App;
