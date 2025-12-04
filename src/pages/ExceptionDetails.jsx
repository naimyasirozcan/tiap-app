import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "./services/config.services"
import Loading from "./Loading"
import { ToastContext } from "@/contexts/toast.context"

function ExceptionDetails() {
  const navigate = useNavigate()
  const { createToast, toasts, setToasts} = useContext(ToastContext)
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

  // ***********************************************************************************************
  
  const handleDelete = async () => {
    try {
      const response = await service.delete(`/exceptions/${exception._id}`)
      console.log(response.data)
      navigate("/logs")
      createToast("success", response.data.message)
    } catch (error) {
      console.log(error)
      createToast("danger", error.response.data.errorMessage )
    }
    
  }
  
  // ***********************************************************************************************
  
  if (!exception) {
    return <Loading />
  }

  return (
    <div className="px-12 pt-4">

      <h1 className="text-[24px] font-black mb-5">Exception Log</h1>
      <div className="grid grid-cols-12 p-5 bg-zinc-200 rounded-lg">

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2">
          <h5>No:</h5>
          <p>{exception.no}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Received As:</h5>
          <p>{exception.receivedAs}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Occurred On:</h5>
          <p>{exception.taskType}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Order No:</h5>
          <p><Link to={`/orders/${exception.order._id}`}>{exception.order.no}</Link></p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Exception Type:</h5>
          <p>{exception.type}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>SKU Name:</h5>
          <p>{exception.sku.name}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>SKU no:</h5>
          <p>{exception.sku.no}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Location:</h5>
          <p><Link to={`/locations/${exception.location._id}`}>{exception.location.name}</Link></p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Quantity:</h5>
          <p>{exception.quantity}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>ZONE:</h5>
          <p>{exception.zone}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Department:</h5>
          <p>{exception.department}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>SKU Price:</h5>
          <p>{exception.sku.price} €</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Total Cost:</h5>
          <p>{exception.totalCost} €</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Status:</h5>
          <p>{exception.status}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Replaced From:</h5>
          <p>{exception.replacedFrom ? exception.replacedFrom : "-"}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Used Exception Location:</h5>
          <p>{exception.exceptionLocation ? exception.exceptionLocation : "-"}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Used Exception Location:</h5>
          <p>{exception.exceptionLocation ? exception.exceptionLocation : "-"}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Found by:</h5>
          <p>{exception.foundBy ? exception.foundBy.split("@")[0] : "-"}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Error by:</h5>
          <p>{exception.errorBy ? exception.errorBy.split("@")[0] : "-"}</p>
        </div>

        <div className="lg:col-span-3 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Handled by:</h5>
          <p>{exception.handledBy ? exception.handledBy.split("@")[0] : "-"}</p>
        </div>

        <div className="lg:col-span-6 md:col-span-6 xs:col-span-12 flex items-center gap-2 lg:mt-4 xs:mt-3">
          <h5>Root Cause:</h5>
          <p><Link to={`/root-causes/${exception.rootcause._id}`}>{exception.rootcause.title}</Link></p>
        </div>

        <div className="xs:col-span-12 flex flex-col items-start gap-2 lg:mt-4 xs:mt-3">
          <h5>Notes:</h5>
          <p>{exception.notes ? exception.notes : "-"}</p>
        </div>

        <div className="xs:col-span-12 flex flex-col items-start gap-2 lg:mt-4 xs:mt-3">
          <h5>Image:</h5>
         <img src={exception.image} className="max-h-[180px] rounded-lg" alt="" />
        </div>

        <div className="xs:col-span-12 flex gap-2 justify-between mt-14">
          <button onClick={() => {
            navigate(-1)
          }} className="bg-zinc-400 px-3 py-1 rounded-lg">Back</button>
          <div className="flex gap-2">
            <button onClick={() => {
              setShowDeleteConfirm(true)
            }} className=" bg-red-900 px-3 py-1 rounded-lg">Delete</button> 
          <button onClick={() => {
            navigate(`/logs/${exception._id}/edit`)
          }} className=" bg-zinc-500 px-3 py-1 rounded-lg">Edit</button>
          </div>
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

export default ExceptionDetails
