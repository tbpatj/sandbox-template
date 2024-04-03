import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./Pages/Routes";
const router = createBrowserRouter(routes, { basename: "/" });

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
