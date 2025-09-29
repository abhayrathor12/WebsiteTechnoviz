
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import BlogPages from './pages/BlogPages';
import Casestudies from './pages/Casestudies';
import SingleServicePage from './singlepages/servicesinglepage';
import SingleProductPage from './singlepages/productsinglepage';
import SingleBlogPage from './singlepages/blogsinglepage';
import CompanyPage from './pages/company';
import BookPage from './pages/bookpage';
import CoePage from './pages/coepage';
import ScrollToTop from "./components/ScrollToTop";
// import WhatsAppWidget from './components/chatsection';
function App() {
  return (
    <Router>
      <div className="App font-inter">
        <Header />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<SingleServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<SingleProductPage />} />
            <Route path="/blogs" element={<BlogPages />} />
            <Route path="/blogs/:slug" element={<SingleBlogPage />} />
            <Route path="/case-studies" element={<Casestudies />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/coe" element={<CoePage />} />
            {/* Add other routes as needed */}
          </Routes>
          {/* <WhatsAppWidget/> */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;