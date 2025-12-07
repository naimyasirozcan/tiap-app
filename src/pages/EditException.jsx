import { ToastContext } from "@/contexts/toast.context"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "./services/config.services"
import Loading from "./Loading"

function EditException() {

    const { _id } = useParams()
    const { toasts, setToast, createToast } = useContext(ToastContext)
    const navigate = useNavigate()
    const [exception, setException] = useState(null)
    const [order, setOrder] = useState(null)
    const [sku, setSku] = useState(null)
    const [taskCollection, setTaskCollection] = useState(null)
    const [task, setTask] = useState(null)
    const [isReplaced, setIsReplaced] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [rootcause, setRootcause] = useState(null)
    const [foundBy, setFoundBy] = useState(null)
    const [handledBy, setHandledBy] = useState(null)
    const [imgURL, setImgURL] = useState(null)
    const [imgFile, setImgFile] = useState(null)
    const [maxQty, setMaxQty] = useState(null)
    const [availableRootCauses, setAvailableRootCauses] = useState(null)
    const [availableReplacedLocations, setAvailableReplacedLocations] = useState(null)
    const [availableExceptionLocations, setAvailableExceptionLocations] = useState(null)
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [showCancelConfirm, setShowCancelConfirm] = useState()

    const [formInput, setFormInput] = useState({
        receivedAs: "",
        orderNo: "",
        skuNo: "",
        skuQty: "",
        exceptionType: "",
        occurOn: "",
        rootCause: "",
        department: "",
        foundBy: "",
        status: "",
        replacedFrom: "",
        fakeLocation: "",
        handledBy: "",
        errorBy: "",
        notes: ""
    })

    useEffect(() => {
        if (formInput.status === "replaced") {
            setIsReplaced(true)
        } else {
            setIsReplaced(false)
        }
    }, [formInput.status])

    useEffect(() => {
        if (task) {
            setMaxQty(Number(task.processedQty))
            setIsBtnDisabled(false)
        } else {
            setMaxQty(0)
            setIsBtnDisabled(true)
        }
    }, [task])

    useEffect(() => {
        service.get(`/exceptions/${_id}`)
            .then((res) => {
                setException(res.data)
                setImgURL(res.data.image)
                setFormInput({
                    receivedAs: res.data.receivedAs || "",
                    orderNo: res.data.order?.no || "",
                    skuNo: res.data.sku?.no || "",
                    skuQty: res.data.quantity || "",
                    exceptionType: res.data.type || "",
                    occurOn: res.data.taskType || "",
                    rootCause: res.data.rootcause?.title || "",
                    department: res.data.department || "",
                    foundBy: res.data.foundBy || "",
                    status: res.data.status || "",
                    replacedFrom: res.data.replacedFrom || "",
                    fakeLocation: res.data.exceptionLocation || "",
                    handledBy: res.data.handledBy || "",
                    errorBy: "",
                    notes: ""
                })
                console.log("Exception fetched.")
            })
            .catch((error) => {
                console.log(error)
            })
    }, [_id])

    useEffect(() => {
        if (!formInput.orderNo.trim()) {
            setOrder(null)
            return
        }

        service.get("/orders", {
            params: {
                no: formInput.orderNo
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setOrder(res.data[0])
                    console.log("order: ", res.data[0]._id)
                } else {
                    setOrder(null)
                    console.log("Order not found.")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [formInput.orderNo])

    useEffect(() => {
        if (!formInput.skuNo.trim()) {
            setSku(null)
            return
        }

        service.get("/skus", {
            params: {
                no: formInput.skuNo
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setSku(res.data[0])
                    console.log("sku: ", res.data[0].name)
                } else {
                    setSku(null)
                    console.log("SKU not found.")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [formInput.skuNo])

    useEffect(() => {
        if (!order || !formInput.occurOn.trim()) {
            setTaskCollection(null)
            return
        }

        service.get("/task-collections", {
            params: {
                type: formInput.occurOn,
                order: order._id
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setTaskCollection(res.data[0])
                    console.log("Task Collection: ", res.data[0])
                } else {
                    setTaskCollection(null)
                    console.log("Task collection not found.")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [formInput.occurOn, order])

    useEffect(() => {
        if (!sku || !taskCollection) {
            setTask(null)
            return
        }

        service.get("/tasks", {
            params: {
                taskCollection: taskCollection._id,
                sku: sku._id
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setTask(res.data[0])
                    console.log("Tasks: ", res.data)
                } else {
                    setTask(null)
                    console.log('No task collection found.')
                }
            })
            .catch(((error) => {
                console.log(error)
            }))
    }, [taskCollection, sku])

    useEffect(() => {
        if (!formInput.occurOn.trim() || !formInput.exceptionType.trim()) {
            setAvailableRootCauses(null)
            return
        }

        service.get('/root-causes', {
            params: {
                task: formInput.occurOn,
                type: formInput.exceptionType
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setAvailableRootCauses(res.data)
                    console.log("Root causes: ", res.data)
                } else {
                    console.log("Rootcause not found.")
                }
            })
            .catch(((error) => {
                console.log(error)
            }))
    }, [formInput.occurOn, formInput.exceptionType])

    useEffect(() => {
        if (!formInput.foundBy.trim()) {
            setFoundBy(null)
            return
        }

        service.get('/employees', {
            params: {
                email: formInput.foundBy
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setFoundBy(res.data[0])
                    console.log("Employee (found by): ", res.data[0])
                } else {
                    setFoundBy(null)
                    console.log("Employee not found.")
                }
            })
            .catch(((error) => {
                console.log(error)
            }))
    }, [formInput.foundBy])

    useEffect(() => {
        if (!formInput.handledBy.trim()) {
            setHandledBy(null)
            return
        }

        service.get('/employees', {
            params: {
                email: formInput.handledBy
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setHandledBy(res.data[0])
                    console.log("Employee (handled by): ", res.data[0])
                } else {
                    setHandledBy(null)
                    console.log("Employee not found.")
                }
            })
            .catch(((error) => {
                console.log(error)
            }))
    }, [formInput.handledBy])

    useEffect(() => {
        service.get('/locations', {
            params: {
                purpose: "exception"
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setAvailableExceptionLocations(res.data)
                    console.log("Available exception locations: ", res.data)
                } else {
                    console.log("No available location found.")
                }
            })
            .catch(((error) => {
                console.log(error)
            }))
    }, [])

    useEffect(() => {
        if (!sku) {
            setAvailableReplacedLocations(null)
            return
        }

        service.get('/locations', {
            params: {
                skuId: sku._id
            }
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setAvailableReplacedLocations(res.data)
                    console.log("Available replace locations: ", res.data)
                } else {
                    console.log("No available replace location found.")
                }
            })
            .catch(((error) => {
                console.log(error)
            }))
    }, [sku])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "rootCause") {
            const selectedRootCause = availableRootCauses.find(rootCause => rootCause.title === value)
            setRootcause(selectedRootCause)
        }

        const holder = {
            ...formInput,
            [name]: value
        }

        setFormInput(holder)
        console.log(name, ": ", value)
    }

    const handleCancel = () => {
        const resetForm = {
            receivedAs: "",
            orderNo: "",
            skuNo: "",
            skuQty: "",
            exceptionType: "",
            occurOn: "",
            rootCause: "",
            department: "",
            foundBy: "",
            status: "",
            replacedFrom: "",
            fakeLocation: "",
            handledBy: "",
            errorBy: "",
            notes: ""
        }

        setFormInput(resetForm)
        navigate(-1)
    }

    const handleShowConfirm = (e) => {
        e.preventDefault()
        setShowCancelConfirm(true)
    }

    const handleImageChange = async (e) => {
        const imageToUpload = e.target.files[0]

        try {
            if (imageToUpload) {
                setImgFile(imageToUpload)
                console.log(`Image choosen, file name: ${imageToUpload.name}`)

                const formData = new FormData()
                formData.append("image", imageToUpload)

                const response = await service.post("/uploads", formData)
                console.log(response.data)
                setImgURL(response.data.url)
            }
        } catch (error) {
            createToast("error", "error")
            console.log(error)
        }
    }

    const handleCreateException = async (e) => {
        e.preventDefault()
        setIsBtnDisabled(true)
        setIsUploading(true)

        try {
            const newException = {
                receivedAs: formInput.receivedAs,
                order: order?._id,
                sku: sku?._id,
                quantity: formInput.skuQty,
                type: formInput.exceptionType,
                taskType: formInput.occurOn,
                rootcause: rootcause?._id,
                department: formInput.department,
                foundBy: foundBy?._id,
                handledBy: handledBy?._id,
                status: formInput.status,
                replacedFrom: formInput.replacedFrom,
                exceptionLocation: formInput.fakeLocation,
                image: imgURL,
                notes: formInput.notes
            }

            const response = await service.put(`/exceptions/${_id}`, newException)
            createToast("success", response.data.message)
            navigate("/logs")
        } catch (error) {
            if (error.response.data.errorMessage) {
                console.log(error.response.data.errorMessage)
                createToast("danger", error.response.data.errorMessage)
            }
        } finally {
            setIsBtnDisabled(false)
            setIsUploading(false)
        }
    }

    if (!exception) {
        return <Loading />
    }

    return (
        <div className="h-full flex flex-col px-8">

            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-4 border-b border-gray-200 -mx-8 px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Exception</h1>
                    <p className="text-sm text-gray-600">No: {exception.no}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                    <form onSubmit={handleCreateException}>
                        <div className="grid grid-cols-12 gap-6">

                            <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Received As</label>
                                    <select name="receivedAs" value={formInput.receivedAs} onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        <option value="">received as</option>
                                        <option value="operation error">Operation Error</option>
                                        <option value="costumer complaint">Costumer Complaint</option>
                                    </select>
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Occured On</label>
                                    <select name="occurOn" value={formInput.occurOn} onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        <option value="">occurred on...</option>
                                        <option value="picking">Picking</option>
                                        <option value="packing">Packing</option>
                                    </select>
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Order No</label>
                                    <input required type="text" value={formInput.orderNo} name="orderNo" placeholder="Example: WON20230125000001E" onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">SKU No</label>
                                    <input required type="text" value={formInput.skuNo} name="skuNo" placeholder="Example: 156210" onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Exception Type</label>
                                    <select required name="exceptionType" value={formInput.exceptionType} onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        <option value="">exception type...</option>
                                        <option value="damaged">Damaged</option>
                                        <option value="missing">Missing</option>
                                    </select>
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Quantity</label>
                                    <input required type="number" min={0} max={maxQty} value={formInput.skuQty} name="skuQty" onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Zone</label>
                                    <input type="text" disabled={true} value={taskCollection ? taskCollection.zone : ""} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Location</label>
                                    <input type="text" disabled={true} value={task ? task.location.name : ""} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Root Cause</label>
                                    <select required name="rootCause" value={formInput.rootCause} onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        <option value="">select route cause......</option>
                                        {availableRootCauses && availableRootCauses.map((eachRootCause, index) => {
                                            return <option key={index} value={eachRootCause.title}>{eachRootCause.title}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Department</label>
                                    <input type="text" disabled={true} value={taskCollection ? taskCollection.employee.department : ""} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">SKU Price - €</label>
                                    <input type="text" disabled={true} value={sku ? sku.price : 0} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Total Cost - €</label>
                                    <input type="text" disabled={true} value={sku ? sku.price * formInput.skuQty : 0} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Found by</label>
                                    <input required type="email" placeholder="example: adam.johnson01@company.com" value={formInput.foundBy} name="foundBy" onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Handled by</label>
                                    <input required type="email" placeholder="example: adam.johnson01@company.com" value={formInput.handledBy} name="handledBy" onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Error by</label>
                                    <input required type="text" disabled={true} value={taskCollection ? taskCollection.employee.email : ""} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                                <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Status</label>
                                    <select required name="status" value={formInput.status} onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                        <option value="">status</option>
                                        <option value="handled">Handled</option>
                                        <option value="replaced">Replaced</option>
                                        <option value="irrecoverable">Irrecoverable</option>
                                        <option value="backlog">Backlog</option>
                                    </select>
                                </div>

                                {isReplaced && (
                                    <>
                                        <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-gray-700">Replaced Cell</label>
                                            <select name="replacedFrom" value={formInput.replacedFrom} onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                                <option value="">select replace location......</option>
                                                {availableReplacedLocations && availableReplacedLocations.map((eachLocation, index) => {
                                                    return <option key={index} value={eachLocation.name}>{eachLocation.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-gray-700">Exception Cell</label>
                                            <select name="fakeLocation" value={formInput.fakeLocation} onChange={handleChange} className="w-full h-9 text-xs bg-[#E0E0E0] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                                <option value="">select fake location......</option>
                                                {availableExceptionLocations && availableExceptionLocations.map((eachLocation, index) => {
                                                    return <option key={index} value={eachLocation.name}>{eachLocation.name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </>
                                )}

                            </div>

                            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                                {(imgFile || imgURL) && (
                                    <div className="w-full flex justify-center">
                                        <img src={imgURL} alt="exception image" className="max-h-[300px] max-w-full object-contain rounded-lg border border-gray-300 shadow-sm" />
                                    </div>
                                )}

                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Image</label>
                                    <input type="file" accept="image/*" placeholder="Choose an image" onChange={handleImageChange} className="w-full h-9 text-xs p-2 bg-[#E0E0E0] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-700">Notes</label>
                                    <textarea placeholder="Notes..." name="notes" value={formInput.notes} onChange={handleChange} rows={4} className="w-full text-xs p-2 bg-[#E0E0E0] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-400" />
                                </div>
                            </div>

                        </div>

                        <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
                            <button onClick={handleShowConfirm} className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm">Cancel</button>
                            <button disabled={isBtnDisabled} type="submit" className="bg-zinc-300 hover:bg-zinc-400 px-6 py-2 rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            {showCancelConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="p-8 rounded-xl bg-white shadow-2xl max-w-md w-full mx-4">
                        <p className="text-lg font-semibold mb-6">Are you sure you want to cancel?</p>
                        <div className="flex items-center justify-end gap-4">
                            <button onClick={() => setShowCancelConfirm(false)} className="bg-zinc-200 hover:bg-zinc-300 px-6 py-2 rounded-lg transition-colors font-medium text-sm">Go Back</button>
                            <button onClick={handleCancel} className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm">Yes</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default EditException