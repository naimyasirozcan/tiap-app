import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Loading from "./Loading"
import ExceptionListRow from "@/components/ExceptionListRow"
import service from "./services/config.services"
import ExceptionListHeader from "@/components/ExceptionListHeader"
import ExceptionListFiltersBar from "@/components/ExceptionListFiltersBar"

function ExceptionLogs() {
  const [exceptions, setExceptions] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    service.get("/exceptions", {
      params: searchParams
    })
      .then((res) => setExceptions(res.data))
      .catch((error) => console.log(error))

    console.log(searchParams)
  }, [searchParams])

  if (!exceptions) {
    return <Loading />
  }

  return (
    <div className="w-full h-full flex flex-col px-8 py-4">
 
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Exception Logs</h1>
        <p className="text-sm text-gray-600 mt-1">View and filter all exception records</p>
      </div>

      <div className="mb-4">
        <ExceptionListFiltersBar searchParams={searchParams} setSearchParams={setSearchParams} />
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-600">
          Showing <span className="font-semibold text-gray-900">{exceptions.length}</span> exception{exceptions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <div className="h-full overflow-x-auto overflow-y-auto">
          <div className="min-w-[1400px]">
            <ExceptionListHeader />
            {exceptions.length > 0 ? (
              exceptions.map((eachException, index) => {
                return <ExceptionListRow key={index} exception={eachException} />
              })
            ) : (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500 text-sm">No exceptions found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExceptionLogs