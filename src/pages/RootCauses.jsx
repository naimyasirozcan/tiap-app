import { useEffect, useState } from "react"
import Loading from "./Loading"
import service from "./services/config.services"
import RootCauseCard from "@/components/RootCauseCard"
import { useSearchParams } from "react-router-dom"

function RootCauses() {

  const [rootCauses, setRootCauses] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    service.get(`/root-causes`, {
      params: searchParams
    })
      .then((res) => setRootCauses(res.data))
      .catch((error) => console.log(error))
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (!value || value === " ") {
      searchParams.delete(name)
      setSearchParams(searchParams)
      return
    }

    searchParams.set(name, value)
    setSearchParams(searchParams)

    console.log(name, value)
  }

  if (!rootCauses) {
    return <Loading />
  }

  return (
    <div className="w-full px-8 pb-8">

      <div className="bg-zinc-200 fixed top-[32px] left-1/2 -translate-x-1/2 z-50 p-3 rounded-lg flex gap-4 shadow-lg">

        <select 
          className="bg-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" 
          name="type" 
          onChange={handleChange}
        >
          <option value="">select type...</option>
          <option value="damaged">Damaged</option>
          <option value="missing">Missing</option>
        </select>

        <select 
          className="bg-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" 
          name="task" 
          onChange={handleChange}
        >
          <option value="">select task...</option>
          <option value="picking">Picking</option>
          <option value="packing">Packing</option>
        </select>

      </div>

      <div className="pt-20">
        <h1 className="text-2xl font-bold mb-6">Root Causes</h1>

        <div className="grid grid-cols-12 w-full gap-4">
          {
            rootCauses.map((eachRootCause, index) => {
              return <RootCauseCard key={index} rootCause={eachRootCause} />
            })
          }
        </div>
      </div>

    </div>
  )
}

export default RootCauses