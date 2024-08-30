import { Route, Routes } from 'react-router-dom';
import CustomerComponents from './components/CustomerComponents';
import AdminComponents from './components/AdminComponents';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Customer from './components/Customer';

function App() {
  return (
    <Routes>
        
        {/* Login & Register */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

        {/* Protected Routes For Admin */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin" element={<Admin />}>
            <Route path="categories" element={<AdminComponents.Categories />} />
            <Route path="customers" element={<AdminComponents.Customers />} />
            <Route path="products" element={<AdminComponents.Products />} />
            <Route path="statistics" element={<AdminComponents.Statistics />} />
        </Route>
      </Route>
      
        {/* Protected Routes For Users */}
      <Route element={<ProtectedRoute allowedRoles={['User', 'Admin']} />}>
        <Route path="/customer" element={<Customer />}> 
            <Route path="products" element={<CustomerComponents.Products />} />
            <Route path="orders" element={<CustomerComponents.Orders />} />
            <Route path="account" element={<CustomerComponents.Account />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
