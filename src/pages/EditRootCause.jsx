import { ToastContext } from "@/contexts/toast.context"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "./services/config.services"
import Loading from "./Loading"

function EditRootCause() {

    const { _id } = useParams()

    const navigate = useNavigate()
    const { toasts, setToasts, createToast } = useContext(ToastContext)
    const [rootcause, setRootcause] = useState(null)

    useEffect(() => {
        service.get(`/root-causes/${_id}`)
            .then((res) => {
                setRootcause({
                    task: res.data.task || "",
                    title: res.data.title || "",
                    type: res.data.type || ""
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [_id])

    const handleEditRootCause = async (e) => {
        e.preventDefault()

        try {
            const response = await service.put(`/root-causes/${_id}`, rootcause)
            createToast("success", response.data.message)
            setRootcause({
                task: "",
                title: "",
                type: ""
            })
            navigate("/root-causes")
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setRootcause({
            ...rootcause,
            [name]: value
        })
        console.log(name, ": ", value)
    }

    if(!rootcause){
        return <Loading/>
    }


    return (
        <div
            className="w-full font-poppins text-black poppins-regular min-h-[calc(100vh-120px)] pt-10">

            <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-120px)]">

                <div className="xs:col-span-12 flex flex-col justify-center items-center ">

                    <div className="h-[500px] w-[350px] rounded-[36px] bg-[#F6F6F6] p-8">

                        <div>

                            <form onSubmit={handleEditRootCause}>
                                <h2 className="text-xl mb-4">New Root Cause</h2>

                                <h6 className="mb-2">Title:</h6>
                                <input type="text" name="title" value={rootcause.title} placeholder="type title here..." onChange={handleChange} className="w-full h-20 mb-3 bg-[#E0E0E0] rounded-lg p-3" />

                                <div className="flex flex-col gap-3">

                                    <select className=" bg-zinc-200 w-full p-3 rounded-lg" name="type" value={rootcause.type} onChange={handleChange}>
                                        <option value="" className="text-gray-500">select type...</option>
                                        <option value="damaged">Damaged</option>
                                        <option value="missing">Missing</option>
                                    </select>

                                    <select className=" bg-zinc-200 w-full p-3 rounded-lg" name="task" value={rootcause.task} onChange={handleChange}>
                                        <option value="" className="text-gray-500">select task...</option>
                                        <option value="picking">Picking</option>
                                        <option value="packing">Packing</option>
                                    </select>

                                </div>

                                <div className="flex items-center justify-between">
                                    
                                    <button type="button" className="mt-3 bg-red-400 px-3 py-1 rounded-lg" onClick={() => { navigate(-1) }}>Cancel</button>
                                    <button type="submit" className="mt-3 bg-green-400 px-3 py-1 rounded-lg" >Submit</button>

                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default EditRootCause