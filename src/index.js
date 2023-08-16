import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MyMenu from './MyMenu';
import AdminHome from './AdminHome';
import Category from  './Category';
import Product from './Product'
import InsertProduct from './InsertProduct'
import EditProduct from './EditProduct'
import Orders from './order'
import OrderDetail from './orderdetail'
import Users from './users'
import PrintOrder from './printorder'
import AdminLogin from './AdminLogin'
import AdminChangePassword from './AdminChangePassword'
import AdminLogout from './AdminLogout'
const root = ReactDOM.createRoot(document.getElementById('root'));
function MyRouter()
{
  return (<BrowserRouter>
      <Routes>
          <Route path='/' element={<MyMenu />}>
              <Route path='/adminhome' element={<AdminHome />} />
              <Route path='/category' element={<Category />} />
              <Route path='/product' element={<Product />} />
              <Route path='/users' element={<Users />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/order-detail/:orderid' element={<OrderDetail />} />
              <Route path='/print-order' element={<PrintOrder />} />
              <Route path='/insert-product' element={<InsertProduct />} />
              <Route path='/edit-product/:productid' element={<EditProduct />} />
              <Route path='/adminchangepassword' element={<AdminChangePassword />} />
              <Route path='/adminlogout' element={<AdminLogout />} /> 
          </Route>
              <Route path='/adminlogin' element={<AdminLogin />} />
      </Routes>
  </BrowserRouter>)
}
root.render(<MyRouter />);
