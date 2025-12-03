import { AuthContext } from "@/contexts/auth.context"
import axios from "axios"
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
    }
    )
      .then((res) => setExceptions(res.data))
      .catch((error) => console.log(error))

      console.log(searchParams)

  }, [searchParams])


  if (!exceptions) {
    return <Loading />
  }

  return (
    <>

      <div className="w-full h-auto p-5">

        <div className="overflow-x-auto">
          <ExceptionListFiltersBar searchParams={searchParams} setSearchParams={setSearchParams} />
        <ExceptionListHeader />

        {exceptions.map((eachException, index) => {
          return <ExceptionListRow key={index} exception={eachException} />
        })}
        </div>
      </div>
    </>
  )
}

export default ExceptionLogs
