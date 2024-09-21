import { Route, Routes, useLocation } from 'react-router-dom';
import CustomerComponents from './components/CustomerComponents';
import AdminComponents from './components/AdminComponents';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { AnimatePresence } from 'framer-motion';
import Customer from './components/Customer';

export const ORIGIN = import.meta.env.VITE_ORIGIN;

function App() {

    const location = useLocation();

    return (
    <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname} >

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
    </AnimatePresence>
  );
}

export default App;
