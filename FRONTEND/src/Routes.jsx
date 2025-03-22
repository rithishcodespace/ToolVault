import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Admin from "./components/Admin";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Unauthorized from "./components/unauthorized";
import Header from "./components/Header";
import About from "./components/About";
import Cart from "./components/Cart";
import Editcard from "./components/Editcard";
import FilteredHome from "./components/FilteredHome"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized/>} />

        <Route 
          path="/client" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <>
                <Header />
                <Home />
              </>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/about/:table/:id" 
          element={
            <ProtectedRoute allowedRoles={["client","admin"]}>
              <>
                <Header/><br /><br /><br />
                <About/>
              </>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Header />
                <Admin />
              </>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <>
                 <Header/>
                <Cart/>
              </>
            </ProtectedRoute>
          } 
        />
        <Route
          path="editcard/:table/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Editcard/>
            </ProtectedRoute>  
          }
        />
        <Route
          path="/client/filteredcard"
          element={
            <ProtectedRoute allowedRoles={["admin","client"]}>
              <Header/><br /><br /><br /><br />
              <FilteredHome/>
            </ProtectedRoute> 
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

