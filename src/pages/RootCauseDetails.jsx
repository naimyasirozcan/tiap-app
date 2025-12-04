import { useNavigate, useParams } from "react-router-dom"
import Loading from "./Loading"
import { useEffect, useState } from "react"
import service from "./services/config.services"
import ExceptionListRow from "@/components/ExceptionListRow"


function RootCauseDetails() {

  const { _id } = useParams()
  const [rootCause, setRootCause] = useState(null)
  const [exceptions, setExceptions] = useState(null)
  const navigate = useNavigate()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState()

  useEffect(() => {
    service.get(`/root-causes/${_id}`)
      .then((res) => setRootCause(res.data))
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    service.get(`/exceptions/`, {
      params: {
        rootcause: rootCause ? rootCause._id : ""
      }
    })
      .then((res) => {
        setExceptions(res.data)
        console.log(res.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [rootCause])

  const handleDelete = async () => {
    try {
      const response = await service.delete(`/root-causes/${rootCause._id}`)
      console.log(response.data)
      navigate("/root-causes")
      createToast("success", response.data.message)
    } catch (error) {
      console.log(error)
      createToast("danger", error.response.data.errorMessage)
    }

  }



  if (!rootCause || !exceptions) {
    return <Loading />
  }
  return (
    <div className="p-10 flex flex-col gap-10">

      <div className="w-full h-full  grid grid-cols-12 rounded-lg bg-slate-400 xs:p-4 lg:p-10">

        <div className="xs:col-span-12 lg:col-span-6  flex flex-col">

          <h5>{rootCause.title}</h5>

          <div className="flex gap-3">
            <h6 className="text-xs">Task:</h6>
            <p className="text-xs">{rootCause.task}</p>
          </div>

          <div className="flex gap-3">
            <h6 className="text-xs">Type:</h6>
            <p className="text-xs">{rootCause.type}</p>
          </div>

        </div>

        <div className="xs:col-span-12 lg:col-span-6  flex flex-col items-end justify-center">

          <div className="flex flex-col gap-3">
            <button onClick={() => {
              navigate(`/`)
            }} className="p-2 bg-zinc-500 rounded-lg">Edit</button>

            <button onClick={() => {
              setShowDeleteConfirm(true)
            }} className="p-2 bg-red-400 rounded-lg">Delete</button>

          </div>

        </div>


      </div>

      <div className="w-full h-full flex items-center justify-start rounded-lg bg-slate-400 xs:p-4 lg:p-10">

        <div className="flex flex-col">

          <h1>Exceptions related with the root cause:</h1>

           { exceptions.length > 0 ?
           
           exceptions.map((eachException, index) => {
          return <ExceptionListRow key={index} exception={eachException} />
        })
      :
      <p>There is no exception with this root cause!</p>
      }

        </div>


      </div>

      {
        showDeleteConfirm &&
        <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div class="p-6 rounded-xl shadow-lg bg-white">
            <p className="w-full mb-4">Are you sure to delete?</p>
            <div className="flex items-center justify-between">
              <button onClick={() => {
                setShowDeleteConfirm(false)
              }} className=" bg-zinc-500 px-3 py-1 rounded-lg">Go Back</button>
              <button onClick={handleDelete} className="bg-red-400 px-3 py-1 rounded-lg">Yes</button>
            </div>
          </div>

        </div>
      }

    </div>
  )
}

export default RootCauseDetails
