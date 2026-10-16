import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "./components/PageLoader";

const BlankLayout: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default BlankLayout;
