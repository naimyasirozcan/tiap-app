import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import service from "./services/config.services"
import Loading from "./Loading"

function ExceptionDetails() {

  const { _id } = useParams()
  const [exception, setException] = useState(null)

  useEffect(() => {

    service.get(`/exceptions/${_id}`)
      .then((res) => setException(res.data))
      .catch((error) => console.log(error))

    console.log(exception)

  }, [])

  if(!exception){
    return <Loading/>
  }

  return (
    <div>

    </div>
  )
}

export default ExceptionDetails
