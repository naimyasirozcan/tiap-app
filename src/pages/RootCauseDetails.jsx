import { useNavigate, useParams } from "react-router-dom"
import Loading from "./Loading"
import { useContext, useEffect, useState } from "react"
import service from "./services/config.services"
import ExceptionListRow from "@/components/ExceptionListRow"
import { ToastContext } from "@/contexts/toast.context"

function RootCauseDetails() {
  const { toasts, setToasts, createToast } = useContext(ToastContext)
  const { _id } = useParams()
  const [rootCause, setRootCause] = useState(null)
  const [exceptions, setExceptions] = useState(null)
  const navigate = useNavigate()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [headerDivStyle, setHeaderDivStyle] = useState("")

  useEffect(() => {
    service.get(`/root-causes/${_id}`)
      .then((res) => {
        setRootCause(res.data)

        const headerStyle = (res.data.task === "picking" && res.data.type === "damaged") ?
          "w-full grid grid-cols-12 rounded-lg bg-yellow-100 p-6 shadow-sm" :
          (res.data.task === "picking" && res.data.type === "missing") ?
            "w-full grid grid-cols-12 rounded-lg bg-orange-100 p-6 shadow-sm" :
            (res.data.task === "packing" && res.data.type === "damaged") ?
              "w-full grid grid-cols-12 rounded-lg bg-blue-100 p-6 shadow-sm" :
              (res.data.task === "packing" && res.data.type === "missing") ?
                "w-full grid grid-cols-12 rounded-lg bg-emerald-100 p-6 shadow-sm" :
                "w-full grid grid-cols-12 rounded-lg bg-zinc-100 p-6 shadow-sm"

        setHeaderDivStyle(headerStyle)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [_id])

  useEffect(() => {
    if (rootCause) {
      service.get(`/exceptions/`, {
        params: {
          rootcause: rootCause._id
        }
      })
        .then((res) => {
          setExceptions(res.data)
          console.log(res.data[0])
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
    <div className="p-8 flex flex-col gap-6">
      <div className={headerDivStyle}>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-3">
          <h1 className="text-2xl font-bold mb-2">{rootCause.title}</h1>

          <div className="flex gap-2 items-center">
            <h3 className="text-sm font-semibold text-gray-700">Task:</h3>
            <p className="text-sm text-gray-600 capitalize">{rootCause.task}</p>
          </div>

          <div className="flex gap-2 items-center">
            <h3 className="text-sm font-semibold text-gray-700">Type:</h3>
            <p className="text-sm text-gray-600 capitalize">{rootCause.type}</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex flex-col items-end justify-center gap-3 mt-4 lg:mt-0">
          <button 
            onClick={() => navigate(`/root-causes/${_id}/edit`)} 
            className="px-6 py-2 bg-zinc-300 hover:bg-zinc-400 rounded-lg transition-colors font-medium text-sm"
          >
            Edit
          </button>

          {(!exceptions || exceptions.length === 0) && (
            <button 
              onClick={() => setShowDeleteConfirm(true)} 
              className="px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors font-medium text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col rounded-lg bg-zinc-100 p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Exceptions related with the root cause:</h2>

        {exceptions.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-[1400px]">
              {exceptions.map((eachException, index) => {
                return <ExceptionListRow key={index} exception={eachException} />
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-sm">There is no exception with this root cause!</p>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="p-8 rounded-xl bg-white shadow-2xl max-w-md w-full mx-4">
            <p className="text-lg font-semibold mb-6">Are you sure you want to delete this root cause?</p>
            <div className="flex items-center justify-end gap-4">
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                className="bg-zinc-200 hover:bg-zinc-300 px-6 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RootCauseDetails