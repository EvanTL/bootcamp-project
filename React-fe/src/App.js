import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
} from './pages'

import Login from './pages/Login'
import SingleProductPage from './pages/SingleProductPage'
import DeliveryAddress from './components/DeliveryAddress'
import PaymentMethod from './components/PaymentMethod'
import ReviewOrder from './components/ReviewOrder'
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About/>} />
          <Route path='login' element={<Login/>} />
          <Route path='products' element={<Products/>} />
          <Route path='checkout/*' element={<Checkout/>}>
              <Route path="" element={<DeliveryAddress/>}/>
              <Route path="pay" element={<PaymentMethod/>}/>
              <Route path="revieworder" element={<ReviewOrder/>}/>
          </Route>
          <Route path='products/:id' element={<SingleProductPage/>} />
          <Route path='cart' element={<Cart/>} />
          {/* 
          TODO :
          Route to 
          About, Cart, 
          Products, SingleProduct, 
          Checkout */}
          <Route path='error' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
