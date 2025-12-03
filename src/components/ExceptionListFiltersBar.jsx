
function ExceptionListFiltersBar({ searchParams, setSearchParams }) {

    const handleChange = (e) => {

        const { name, value } = e.target

        if (!value || value === " ") {
            searchParams.delete(name)
            setSearchParams(searchParams)
            return
        }

        // const newParams = new URLSearchParams(searchParams)
        // newParams.set(name, value)
        // setSearchParams(newParams)

        searchParams.set(name, value)
        setSearchParams(searchParams)

        console.log(name, value)
    }

    return (

        <div className="grid grid-cols-12 gap-1">


            <input type="text" name="no" placeholder="exception no" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg p-3" />
            <input type="date" name="createdAt" defaultValue="" placeholder="name.surname01@company.com" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg p-3" />

            <select type="text" name="receivedAs" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                <option value="" className="text-gray-500">received as</option>
                <option value="operation error">Operation Error</option>
                <option value="costumer complaint">Costumer Complaint</option>
            </select>

            <select type="text" name="type" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3">
                <option value="" className="text-gray-500">exception type</option>
                <option value="missing">Missing</option>
                <option value="damaged">Damaged</option>
            </select>

            <select type="text" name="taskType" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3">
                <option value="" className="text-gray-500">task type</option>
                <option value="picking">Picking</option>
                <option value="packing">Packing</option>
            </select>

            <select type="text" name="status" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3">
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
