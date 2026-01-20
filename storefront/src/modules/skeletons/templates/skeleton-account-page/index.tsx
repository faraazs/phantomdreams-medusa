"use client"

const SkeletonAccountPage = () => {
  return (
    <div className="w-full" data-testid="account-skeleton">
      <div className="mb-8 flex flex-col gap-y-4">
        <div className="w-40 h-6 bg-gray-100 animate-pulse" />
        <div className="w-3/4 h-4 bg-gray-100 animate-pulse" />
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="w-full h-24 bg-gray-100 animate-pulse" />
        <div className="w-full h-24 bg-gray-100 animate-pulse" />
        <div className="w-full h-24 bg-gray-100 animate-pulse" />
      </div>
    </div>
  )
}

export default SkeletonAccountPage
