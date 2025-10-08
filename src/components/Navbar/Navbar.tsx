export const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-tight drop-shadow-sm">
          Weather<span className="text-yellow-300">Now</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Time */}
          <div className="text-sm leading-tight text-white/90 text-right">
            <p className="font-medium">Wednesday, Oct 8 2025</p>
            <p className="text-xs opacity-90">4:15 PM</p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search city..."
            className="bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
          />

          {/* Unit Toggle */}
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="font-semibold text-white/90">°C</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300/60 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
            </label>
            <span className="font-semibold text-white/90">°F</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
