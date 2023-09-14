export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center mt-24 ">
      <div className="relative w-12 h-12 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
}
