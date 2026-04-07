export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-md"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading data...</p>
      </div>
    </div>
  )
}
