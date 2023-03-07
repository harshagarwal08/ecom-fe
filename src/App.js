import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className='app'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProductsPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
