import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import BlankLayout from "./BlankLayout";

// Pages. The homepage loads right away; every other page downloads only when visited.
import HomePage from "./pages/HomePage";
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const BlogPages = lazy(() => import("./pages/BlogPages"));
const Casestudies = lazy(() => import("./pages/Casestudies"));
const SingleServicePage = lazy(() => import("./singlepages/servicesinglepage"));
const SingleProductPage = lazy(() => import("./singlepages/productsinglepage"));
const SingleBlogPage = lazy(() => import("./singlepages/blogsinglepage"));
const CompanyPage = lazy(() => import("./pages/company"));
const BookPage = lazy(() => import("./pages/bookpage"));
const CoePage = lazy(() => import("./pages/coepage"));
const PythonPage = lazy(() => import("./pages/pythonpage"));
const ReactPage = lazy(() => import("./pages/reactpage"));
const AzurePage = lazy(() => import("./pages/Azurepage"));
const NetworkingPage = lazy(() => import("./pages/networkingpage"));
const MysqlPage = lazy(() => import("./pages/mysqlpage"));
const AndroidPage = lazy(() => import("./pages/andriodpage"));
const KnowledgePage = lazy(() => import("./pages/knowledgepage"));
const Webinar = lazy(() => import("./pages/Webinar"));
const Paymentpage = lazy(() => import("./pages/PaymentPage"));
const MQTTDashboard = lazy(() => import("./pages/MqttDashboard"));
const MasterclassPage = lazy(() => import("./pages/Masterclass"));
// Components
import ScrollToTop from "./components/ScrollToTop";
const Ideathon = lazy(() => import("./pages/IdeathonPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
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
          <Route path="*" element={<NotFoundPage />} />
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
        <Route element={<BlankLayout />}>
          <Route
            path="/Smart-Manufacturing-AI-Masterclass"
            element={<MasterclassPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
