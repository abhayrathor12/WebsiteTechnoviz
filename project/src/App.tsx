import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import BlankLayout from "./BlankLayout";

// Pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import BlogPages from "./pages/BlogPages";
import Casestudies from "./pages/Casestudies";
import SingleServicePage from "./singlepages/servicesinglepage";
import SingleProductPage from "./singlepages/productsinglepage";
import SingleBlogPage from "./singlepages/blogsinglepage";
import CompanyPage from "./pages/company";
import BookPage from "./pages/bookpage";
import CoePage from "./pages/coepage";
import PythonPage from "./pages/pythonpage";
import ReactPage from "./pages/reactpage";
import AzurePage from "./pages/Azurepage";
import NetworkingPage from "./pages/networkingpage";
import MysqlPage from "./pages/mysqlpage";
import AndroidPage from "./pages/andriodpage";
import KnowledgePage from "./pages/knowledgepage";
import Webinar from "./pages/Webinar";
import Paymentpage from "./pages/PaymentPage";
import MQTTDashboard from "./pages/MqttDashboard";
// Components
import ScrollToTop from "./components/ScrollToTop";
import Ideathon from "./pages/IdeathonPage";
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* ===================== */}
        {/* ROUTES WITH LAYOUT */}
        {/* ===================== */}
        <Route element={<MainLayout />}>
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
          <Route path="/python" element={<PythonPage />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/azure" element={<AzurePage />} />
          <Route path="/network" element={<NetworkingPage />} />
          <Route path="/mysql" element={<MysqlPage />} />
          <Route path="/android" element={<AndroidPage />} />
          <Route path="/learning" element={<KnowledgePage />} />
        </Route>

        {/* ===================== */}
        {/* ROUTES WITHOUT LAYOUT */}
        {/* ===================== */}
        <Route element={<BlankLayout />}>
          <Route
            path="/Webinar-Registration"
            element={<Webinar />}
          />
        </Route>
        <Route element={<BlankLayout />}>
          <Route
            path="/Ideathon"
            element={<Ideathon />}
          />
        </Route>

        <Route element={<BlankLayout />}>
          <Route
            path="/Aurex-Webinar-Registration"
            element={<Paymentpage />}
          />
        </Route>
        <Route element={<BlankLayout />}>
          <Route
            path="/Live-Production"
            element={<MQTTDashboard />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
