import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 text-white mt-16">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
          Weather<span className="text-yellow-300">Now</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/mohamed.hosny.el.kholy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaFacebook size={22} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaTwitter size={22} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaInstagram size={22} />
          </a>
        </div>
      </div>

      <div className="border-t border-white/20 mt-6 py-4 text-center text-sm text-white/80">
        © 2025 <span className="font-semibold text-yellow-300">WeatherNow</span>{" "}
        All rights reserved.
      </div>
    </footer>
  );
};
