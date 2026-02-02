import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thankyou' element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App