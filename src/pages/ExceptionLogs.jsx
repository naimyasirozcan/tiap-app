import { AuthContext } from "@/contexts/auth.context"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Loading from "./Loading"
import ExceptionListRow from "@/components/ExceptionListRow"

function ExceptionLogs() {

  const [ exceptions, setExceptions ] = useState(null)
  const [ searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/exceptions`, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
    })
    .then((res) => setExceptions(res.data))
    .catch((error) => console.log(error))

  },[searchParams])


  if(!exceptions){
    return <Loading/>
  }

    return (
    <div className="w-full h-auto">
      {exceptions.map((eachException) => {
        return <ExceptionListRow exception={eachException}/>
      })}
    </div>
  )
}

export default ExceptionLogs
