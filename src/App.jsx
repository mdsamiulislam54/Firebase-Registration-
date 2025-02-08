import { Route, Routes } from 'react-router';
import Home from './componats/Navbar/Home.jsx';
import Product from './componats/Navbar/Product.jsx';
import Register from './componats/Navbar/Register.jsx';
import Login from './componats/Navbar/Login.jsx';
import Layout from './Layout/Layout.jsx';

function App() {
  return (
    <Routes>
    
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Product />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
