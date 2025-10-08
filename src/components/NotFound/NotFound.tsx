export const NotFound = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found 😢</p>
      <a
        href="/"
        className="text-blue-600 hover:text-blue-800 font-semibold underline"
      >
        Back to Home
      </a>
    </div>
  );
};
