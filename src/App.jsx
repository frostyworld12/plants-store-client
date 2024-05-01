import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import SuppliesPage from "./pages/SuppliesPage/SuppliesPage";
import SuppliersPage from "./pages/SuppliersPage/SuppliersPage";
import CustomersPage from "./pages/CustomersPage/CustomersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="customers" element={<CustomersPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="supplies" element={<SuppliesPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
