import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);
  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 shadow-md !p-3">
      <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center text-white gap-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-tight drop-shadow-sm">
          Weather<span className="text-yellow-300">Now</span>
        </div>
        {/* Social icons */}
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/mohamed.hosny.el.kholy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaInstagram size={20} />
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? (
              <i className="fas fa-moon text-gray-800"></i>
            ) : (
              <i className="fas fa-sun text-yellow-400"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
