function ExceptionListHeader() {
  return (
    <div className="w-full min-w-[1400px] grid grid-cols-12 gap-2 px-2 py-3 bg-gray-100 border-b-2 border-gray-300 sticky top-0 z-10">
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Exception No</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Date</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Received As</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Order No</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Type</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Task</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Location</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">SKU</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Root Cause</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Status</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Fake Location</div>
      <div className="col-span-1 flex items-center justify-start text-xs font-bold">Error By</div>
    </div>
  )
}

export default ExceptionListHeader