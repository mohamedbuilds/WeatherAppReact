import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import WeatherMain from "../components/WeatherMain/WeatherMain";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="flex flex-col flex-grow items-center w-full px-4 py-6 text-center">
        <WeatherMain />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
