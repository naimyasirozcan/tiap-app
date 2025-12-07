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
    <div className="w-full h-full flex flex-col px-5">
      <div className="mb-4 mt-3">
        <ExceptionListFiltersBar searchParams={searchParams} setSearchParams={setSearchParams} />
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto rounded-lg border-2">
        <div className="min-w-[1400px]">
          <ExceptionListHeader />
          {exceptions.map((eachException, index) => {
            return <ExceptionListRow key={index} exception={eachException} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ExceptionLogs