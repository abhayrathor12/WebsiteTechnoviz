import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import QuickLink from "./components/QuickLink";

const MainLayout: React.FC = () => {
  return (
    <div className="App font-inter">
      <Header />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
        <Chatbot />
      </main>

      <Footer />
      <QuickLink />
    </div>
  );
};

export default MainLayout;
