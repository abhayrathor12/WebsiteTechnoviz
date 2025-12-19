import { Outlet } from "react-router-dom";

const BlankLayout: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};

export default BlankLayout;
