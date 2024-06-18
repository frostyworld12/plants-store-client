import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import SuppliesPage from "./pages/SuppliesPage/SuppliesPage";
import SuppliersPage from "./pages/SuppliersPage/SuppliersPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SupplyRequestPage from "./pages/SupplyRequestPage/SupplyRequestPage";
import { AuthContext } from "./utility/contexts";
import { getUserData } from "./services/userService";
import { useEffect, useState } from "react";
import { StompSessionProvider } from "react-stomp-hooks";
import { Toaster } from 'react-hot-toast';

const ALLOWED_PAGES = {
  Supplier: [
    { path: 'supplyrequest/:requestId?', component: <SupplyRequestPage /> },
    { path: 'supplies/:requestId?', component: <SuppliesPage /> },
  ],
  Employee: [
    { path: 'supplies/:requestId?', component: <SuppliesPage /> },
    { path: 'products/:productId?', component: <ProductsPage /> },
    { path: 'suppliers/:supplierId?', component: <SuppliersPage /> },
    { path: 'supplyrequest/:requestId?', component: <SupplyRequestPage /> }
  ],
  Admin: [
    { path: 'supplies', component: <SuppliesPage /> },
    { path: 'products/:productId?', component: <ProductsPage /> },
    { path: 'suppliers/:supplierId?', component: <SuppliersPage /> },
    { path: 'employees', component: <EmployeesPage /> }
  ]
};

function App() {
  const [currentUser, setCurrentUser] = useState({});

  window.addEventListener('storage', () => {
    setCurrentUser(getUserData());
  });

  useEffect(() => {
    setCurrentUser(getUserData());
  }, []);

  return (
    <StompSessionProvider url={'http://localhost:8080/ws'}>
      <AuthContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={currentUser ? <HomePage /> : <Navigate to='/login'></Navigate>}>
              {
                ALLOWED_PAGES[currentUser?.user?.role] && ALLOWED_PAGES[currentUser?.user?.role].map((page, i) => {
                  return <Route key={i} path={page.path} element={page.component} />
                })
              }
            </Route>
            <Route path="/">
              <Route path="login/:currentstate?" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>

      <Toaster />
    </StompSessionProvider>
  )
}

export default App
