import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard"
import CategoryAdd from "../pages/Category/CategoryAdd"
import CategoryList from "../pages/Category/CategoryList"
import CategoryEdit from "../pages/Category/CategoryEdit"
import ExpenseList from "../pages/Expense/ExpenseList"
import ExpenseEdit from "../pages/Expense/Expense.Edit"
import ExpenseAdd from "../pages/Expense/ExpenseAdd"

export default function AppRouter() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/expenses"
          element={token ? <ExpenseList /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses/add"
          element={token ? <ExpenseAdd /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses/edit/:id"
          element={token ? <ExpenseEdit /> : <Navigate to="/login" />}
        />

        <Route
          path="/categories"
          element={token ? <CategoryList /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories/add"
          element={token ? <CategoryAdd /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories/edit/:id"
          element={token ? <CategoryEdit /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
