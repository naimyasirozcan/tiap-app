function ExceptionListFiltersBar({ searchParams, setSearchParams }) {

  const handleChange = (e) => {
    const { name, value } = e.target

    if (!value || value === " ") {
      searchParams.delete(name)
      setSearchParams(searchParams)
      return
    }

    searchParams.set(name, value)
    setSearchParams(searchParams)
  }

  return (
    <div className="grid grid-cols-12 gap-2 min-w-[1400px]">
      <input 
        type="text" 
        name="no" 
        placeholder="exception no" 
        onChange={handleChange} 
        className="col-span-1 w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400" 
      />
      <input 
        type="date" 
        name="createdAt" 
        defaultValue="" 
        onChange={handleChange} 
        className="col-span-1 w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400" 
      />
      <select 
        name="receivedAs" 
        onChange={handleChange} 
        className="col-span-1 w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <option value="" className="text-gray-500">received as</option>
        <option value="operation error">Operation Error</option>
        <option value="costumer complaint">Costumer Complaint</option>
      </select>
      <select 
        name="type" 
        onChange={handleChange} 
        className="col-span-1 w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <option value="" className="text-gray-500">exception type</option>
        <option value="missing">Missing</option>
        <option value="damaged">Damaged</option>
      </select>
      <select 
        name="taskType" 
        onChange={handleChange} 
        className="col-span-1 w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <option value="" className="text-gray-500">task type</option>
        <option value="picking">Picking</option>
        <option value="packing">Packing</option>
      </select>
      <select 
        name="status" 
        onChange={handleChange} 
        className="col-span-1 w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <option value="" className="text-gray-500">status</option>
        <option value="handled">Handled</option>
        <option value="replaced">Replaced</option>
        <option value="irrecoverible">Irrecoverible</option>
        <option value="backlog">Backlog</option>
      </select>
    </div>
  )
}

export default ExceptionListFiltersBar