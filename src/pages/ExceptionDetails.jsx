import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "./services/config.services"
import Loading from "./Loading"
import { ToastContext } from "@/contexts/toast.context"

function ExceptionDetails() {
  const navigate = useNavigate()
  const { createToast, toasts, setToasts } = useContext(ToastContext)
  const { _id } = useParams()
  const [exception, setException] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    service.get(`/exceptions/${_id}`)
      .then((res) => setException(res.data))
      .catch((error) => {
        console.log(error)
        navigate("*")
      })
  }, [])

  const handleDelete = async () => {
    try {
      const response = await service.delete(`/exceptions/${exception._id}`)
      navigate("/logs")
      createToast("success", response.data.message)
    } catch (error) {
      console.log(error)
      createToast("danger", error.response.data.errorMessage)
    }
  }

  if (!exception) {
    return <Loading />
  }

  return (
    <div className="h-full flex flex-col px-8">

      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-4 border-b border-gray-200 -mx-8 px-8">
        <h1 className="text-2xl font-bold text-gray-900">Exception Details</h1>
        <p className="text-sm text-gray-600 mt-1">Exception No: {exception.no}</p>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
          
          <div className="grid grid-cols-12 gap-x-6 gap-y-4">

            <div className="col-span-12 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h2>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Exception No:</h3>
              <p className="text-sm text-gray-900">{exception.no}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Received As:</h3>
              <p className="text-sm text-gray-900 capitalize">{exception.receivedAs}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Occurred On:</h3>
              <p className="text-sm text-gray-900 capitalize">{exception.taskType}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Exception Type:</h3>
              <p className="text-sm text-gray-900 capitalize">{exception.type}</p>
            </div>

            <div className="col-span-12 mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Order & Product Information</h2>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Order No:</h3>
              <p className="text-sm text-gray-900">{exception.order.no}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">SKU Name:</h3>
              <p className="text-sm text-gray-900">{exception.sku.name}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">SKU No:</h3>
              <p className="text-sm text-gray-900">{exception.sku.no}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Quantity:</h3>
              <p className="text-sm text-gray-900">{exception.quantity}</p>
            </div>

            <div className="col-span-12 mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Location Information</h2>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Location:</h3>
              <p className="text-sm text-gray-900">{exception.location.name}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Zone:</h3>
              <p className="text-sm text-gray-900 uppercase">{exception.zone}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Department:</h3>
              <p className="text-sm text-gray-900 capitalize">{exception.department}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Exception Location:</h3>
              <p className="text-sm text-gray-900">{exception.exceptionLocation || "-"}</p>
            </div>

            <div className="col-span-12 mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Financial Information</h2>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">SKU Price:</h3>
              <p className="text-sm text-gray-900 font-semibold">€{exception.sku.price}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Total Cost:</h3>
              <p className="text-sm text-gray-900 font-semibold">€{exception.totalCost}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Status:</h3>
              <p className="text-sm text-gray-900 capitalize">{exception.status}</p>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Replaced From:</h3>
              <p className="text-sm text-gray-900">{exception.replacedFrom || "-"}</p>
            </div>

            <div className="col-span-12 mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">People Information</h2>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Found By:</h3>
              <p className="text-sm text-gray-900">{exception.foundBy ? exception.foundBy.split("@")[0] : "-"}</p>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Error By:</h3>
              <p className="text-sm text-gray-900">{exception.errorBy ? exception.errorBy.split("@")[0] : "-"}</p>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Handled By:</h3>
              <p className="text-sm text-gray-900">{exception.handledBy ? exception.handledBy.split("@")[0] : "-"}</p>
            </div>

            <div className="col-span-12 mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Root Cause Analysis</h2>
            </div>

            <div className="col-span-12 flex flex-col gap-1">
              <h3 className="text-xs font-semibold text-gray-700">Root Cause:</h3>
              <Link 
                to={`/root-causes/${exception.rootcause._id}`}
                className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                {exception.rootcause.title}
              </Link>
            </div>

            <div className="col-span-12 mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Additional Information</h2>
            </div>

            <div className="col-span-12 flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-gray-700">Notes:</h3>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">
                {exception.notes || "No notes available"}
              </p>
            </div>

            <div className="col-span-12 flex flex-col gap-2 mt-4">
              <h3 className="text-xs font-semibold text-gray-700">Image:</h3>
              <div className="flex justify-start">
                <img 
                  src={exception.image} 
                  className="max-h-[300px] max-w-full object-contain rounded-lg border border-gray-300 shadow-sm" 
                  alt="Exception evidence" 
                />
              </div>
            </div>

          </div>

          <div className="flex gap-3 justify-between mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-zinc-300 hover:bg-zinc-400 px-6 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              Back
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                Delete
              </button>
              <button 
                onClick={() => navigate(`/logs/${exception._id}/edit`)} 
                className="bg-zinc-300 hover:bg-zinc-400 px-6 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                Edit
              </button>
            </div>
          </div>

        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="p-8 rounded-xl bg-white shadow-2xl max-w-md w-full mx-4">
            <p className="text-lg font-semibold mb-6">Are you sure you want to delete this exception?</p>
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

export default ExceptionDetails