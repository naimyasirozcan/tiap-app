import { ToastContext } from "@/contexts/toast.context"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import service from "./services/config.services"

function CreateRootCause() {

  const navigate = useNavigate()
  const { toasts, setToasts, createToast } = useContext(ToastContext)
  const [newRootCause, setNewRootCause] = useState({
    task: "",
    title: "",
    type: ""
  })

  const handleCreateRootCause = async (e) => {
    e.preventDefault()

    try {
      const response = await service.post("/root-causes", newRootCause)
      console.log(response)
      createToast("success", response.data.message)
      setNewRootCause({
        task: "",
        title: "",
        type: ""
      })
      navigate("/root-causes")
    } catch (error) {
      console.log(error)
      createToast("danger", error.response.data.errorMessage)
      if(error.response.status === 401){
        navigate("/unauthorized")
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    newRootCause[name] = value

    setNewRootCause(newRootCause)
    console.log(name, ": ", value)
    console.log(newRootCause[name])
  }


  return (
    <div
      className="w-full font-poppins text-black poppins-regular min-h-[calc(100vh-120px)] pt-10">

      <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-120px)]">

        <div className="xs:col-span-12 flex flex-col justify-center items-center ">

          <div className="h-[500px] w-[350px] rounded-[36px] bg-[#F6F6F6] p-8">

            <div>

              <form onSubmit={handleCreateRootCause}>
                <h2 className="text-xl mb-4">New Root Cause</h2>

                <h6 className="mb-2">Title:</h6>
                <input type="text" name="title" placeholder="type title here..." onChange={handleChange} className="w-full h-20 mb-3 bg-[#E0E0E0] rounded-lg p-3" />

                <div className="flex flex-col gap-3">

                  <select className=" bg-zinc-200 w-full p-3 rounded-lg" name="type" onChange={handleChange}>
                    <option value="" className="text-gray-500">select type...</option>
                    <option value="damaged">Damaged</option>
                    <option value="missing">Missing</option>
                  </select>

                  <select className=" bg-zinc-200 w-full p-3 rounded-lg" name="task" onChange={handleChange}>
                    <option value="" className="text-gray-500">select task...</option>
                    <option value="picking">Picking</option>
                    <option value="packing">Packing</option>
                  </select>

                </div>

                <div className="flex items-center justify-between">
                  <button type="submit" className="mt-3 bg-red-400 px-3 py-1 rounded-lg" onClick={() => { navigate(-1) }}>Cancel</button>
                  <button type="submit" className="mt-3 bg-green-400 px-3 py-1 rounded-lg" >Submit </button>

                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CreateRootCause
