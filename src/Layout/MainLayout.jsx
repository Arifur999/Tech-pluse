import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
