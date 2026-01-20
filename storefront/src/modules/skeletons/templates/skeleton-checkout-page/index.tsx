"use client"

const SectionSkeleton = () => {
  return (
    <div className="bg-white p-6">
      <div className="w-40 h-6 bg-gray-100 animate-pulse mb-6" />
      <div className="flex flex-col gap-y-3">
        <div className="w-3/4 h-4 bg-gray-100 animate-pulse" />
        <div className="w-full h-4 bg-gray-100 animate-pulse" />
        <div className="w-5/6 h-4 bg-gray-100 animate-pulse" />
        <div className="w-2/3 h-4 bg-gray-100 animate-pulse" />
      </div>
      <div className="w-40 h-10 bg-gray-100 animate-pulse mt-6" />
    </div>
  )
}

const SkeletonCheckoutPage = () => {
  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <div className="flex flex-col gap-y-8">
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
      <div className="flex flex-col gap-y-8">
        <div className="bg-white p-6">
          <div className="w-40 h-6 bg-gray-100 animate-pulse mb-6" />
          <div className="flex flex-col gap-y-4">
            <div className="w-full h-4 bg-gray-100 animate-pulse" />
            <div className="w-5/6 h-4 bg-gray-100 animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-100 animate-pulse" />
            <div className="w-2/3 h-4 bg-gray-100 animate-pulse" />
          </div>
          <div className="w-full h-px bg-gray-200 my-6" />
          <div className="flex flex-col gap-y-3">
            <div className="w-2/3 h-4 bg-gray-100 animate-pulse" />
            <div className="w-1/2 h-4 bg-gray-100 animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-100 animate-pulse" />
          </div>
          <div className="w-full h-10 bg-gray-100 animate-pulse mt-6" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCheckoutPage
