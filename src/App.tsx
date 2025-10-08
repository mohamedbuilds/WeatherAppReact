import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { NotFound } from "./components/NotFound/NotFound";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: "/" },
      // { path: "search", element: <WeatherDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
