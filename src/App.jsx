import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="employees" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
