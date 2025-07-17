const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
      <p className="ml-4 text-xl text-gray-600">Loading</p>
    </div>
  )
}
export default LoadingAnimation;
