const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
};

const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] space-x-2">
      <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-0"></div>
      <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="p-4">
      {[1, 2, 3].map((_, idx) => (
        <div key={idx} className="mb-8 animate-pulse">
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((__, i) => (
              <div
                key={i}
                className="h-40 bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const GradientSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-4 border-t-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-spin"></div>
    </div>
  );
};

const LoadingText = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mb-4 w-12 h-12 border-4 border-t-indigo-500 border-gray-200 rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-gray-700 animate-pulse">
        Loading Products...
      </p>
    </div>
  );
};


export { LoadingDots, SkeletonLoader, GradientSpinner, LoadingText, LoadingSpinner};

