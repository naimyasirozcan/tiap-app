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

    // *************************************************************************************************

    useEffect(() => {
        if (formInput.status === "replaced") {
            setIsReplaced(true)
        } else {
            setIsReplaced(false)
        }
    }, [formInput.status])


    // *************************************************************************************************

    useEffect(() => {
        if (task) {
            setMaxQty(Number(task.processedQty))
            setIsBtnDisabled(false)
        } else {
            setMaxQty(0)
            setIsBtnDisabled(true)
        }
    }, [task])


    // *************************************************************************************************

    // *** Get Current Exception ***

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

    // *************************************************************************************************

    // *** Get Order ***

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

    // *************************************************************************************************

    // *** Get SKU ***

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

    // *************************************************************************************************

    // *** Get Task Collections ***

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

    // *************************************************************************************************

    // *** Get Task ***

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


    // *************************************************************************************************

    // *** Get Root Causes ***

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

    // *************************************************************************************************

    // *** Get Employee (Found by) ***

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

    // *************************************************************************************************

    // *** Get Employee (Handled by) ***

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

    // *************************************************************************************************

    // *** Get Exception Locations ***

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

    // *************************************************************************************************

    // *** Get Replace Locations ***

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


    // *************************************************************************************************

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

    // *************************************************************************************************

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

    // *************************************************************************************************

    const handleShowConfirm = (e) => {
        e.preventDefault()

        setShowCancelConfirm(true)

    }

    // *************************************************************************************************

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

    // *************************************************************************************************

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
                createToast("error", error.response.data.errorMessage)
            }

        } finally {
            setIsBtnDisabled(false)
            setIsUploading(false)
        }

    }

    // *************************************************************************************************

    if (!exception) {
        return <Loading />
    }

    // *************************************************************************************************

    return (
        <div className="px-10 pt-3">

            <div className="rounded-[36px] min-w-[350px] bg-[#F6F6F6] bottom-shadow p-8">

                <div>

                    <form onSubmit={handleCreateException}>

                        <div className="flex justify-between px-1">
                            <h2 className="text-xl mb-4">Edit Exception</h2>
                            <h2 className="text-xl mb-4">No: {exception ? exception.no : ""} </h2>
                        </div>

                        <div className="grid grid-cols-12 gap-0">

                            <div className="xs:col-span-12 lg:col-span-8 grid grid-cols-12 gap-2">

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Received As</h6>

                                    <select type="text" name="receivedAs" value={formInput.receivedAs} onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                                        <option value="" className="text-gray-500">received as</option>
                                        <option value="operation error">Operation Error</option>
                                        <option value="costumer complaint">Costumer Complaint</option>
                                    </select>

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Occured On</h6>

                                    <select type="text" name="occurOn" value={formInput.occurOn} onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                                        <option value="" className="text-gray-500">occurred on...</option>
                                        <option value="picking">Picking</option>
                                        <option value="packing">Packing</option>
                                    </select>

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Order No</h6>

                                    <input required type="text" value={formInput.orderNo} name="orderNo" placeholder="Example: WON20230125000001E" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">SKU No</h6>

                                    <input required type="text" value={formInput.skuNo} name="skuNo" placeholder="Example: 156210" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Exception Type</h6>

                                    <select required type="text" name="exceptionType" value={formInput.exceptionType} onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                                        <option value="" className="text-gray-500">exception type...</option>
                                        <option value="damaged">Damaged</option>
                                        <option value="missing">Missing</option>
                                    </select>

                                </div>


                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Quantity</h6>

                                    <input required type="number" min={0} max={maxQty} value={formInput.skuQty} name="skuQty" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>


                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Zone</h6>

                                    <input type="text" disabled={true} value={taskCollection ? taskCollection.zone : ""} name="zone" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Location</h6>

                                    <input type="text" disabled={true} value={task ? task.location.name : ""} name="location" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Root Cause</h6>

                                    <select required type="text" name="rootCause" value={formInput.rootCause} onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                                        <option value="" className="text-gray-500">select route cause......</option>
                                        {availableRootCauses &&

                                            availableRootCauses.map((eachRootCause, index) => {
                                                return <option key={index} value={eachRootCause.title}>{eachRootCause.title}</option>
                                            })
                                        }
                                    </select>

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Department</h6>

                                    <input type="text" disabled={true} value={taskCollection ? taskCollection.employee.department : ""} name="location" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">SKU Price - €</h6>

                                    <input type="text" disabled={true} value={sku ? sku.price : 0} name="skuPrice" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Total Cost - €</h6>

                                    <input type="text" disabled={true} value={sku ? sku.price * formInput.skuQty : 0} name="totalCost" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Found by</h6>

                                    <input required type="email" placeholder="example: adam.johnson01@company.com" value={formInput.foundBy} name="foundBy" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Handled by</h6>

                                    <input required type="email" placeholder="example: adam.johnson01@company.com" value={formInput.handledBy} name="handledBy" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Error by</h6>

                                    <input required type="text" disabled={true} value={taskCollection ? taskCollection.employee.email : ""} name="errorBy" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                                </div>

                                <div className="xs:col-span-12 lg:col-span-6">

                                    <h6 className="mb-2">Status</h6>

                                    <select required type="text" name="status" value={formInput.status} onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                                        <option value="" className="text-gray-500">status</option>
                                        <option value="handled">Handled</option>
                                        <option value="replaced">Replaced</option>
                                        <option value="irrecoverable">Irrecoverable</option>
                                        <option value="backlog">Backlog</option>
                                    </select>

                                </div>


                                {
                                    isReplaced &&
                                    <>
                                        <div className="xs:col-span-12 lg:col-span-6">

                                            <h6 className="mb-2">Replaced Cell</h6>

                                            <select type="text" name="replacedFrom" value={formInput.replacedFrom} onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                                                <option value="" className="text-gray-500">select replace location......</option>
                                                {availableReplacedLocations &&

                                                    availableReplacedLocations.map((eachLocation, index) => {
                                                        return <option key={index} value={eachLocation.name}>{eachLocation.name}</option>
                                                    })
                                                }

                                            </select>

                                        </div>
                                        <div className="xs:col-span-12 lg:col-span-6">

                                            <h6 className="mb-2">Exception Cell</h6>

                                            <select type="text" name="fakeLocation" value={formInput.fakeLocation} onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                                                <option value="" className="text-gray-500">select fake location......</option>
                                                {availableExceptionLocations &&

                                                    availableExceptionLocations.map((eachLocation, index) => {
                                                        return <option key={index} value={eachLocation.name}>{eachLocation.name}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </>
                                }

                            </div>

                            <div className="xs:col-span-12 lg:col-span-4 p-8">


                                {(imgFile || imgURL) && <div className="w-full h-auto flex items-center justify-center rounded-lg">
                                    <img src={imgURL ? imgURL : ""} alt="exception image" className="max-h-[40%]" />
                                </div>}

                                <div className="mt-5">
                                    <input type="file" accept="image/*" placeholder="Choose an image" onChange={handleImageChange} className="flex cursor-pointer items-center w-full h-9 mb-3 text-[11px] p-2 bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                                <div className="mt-5">
                                    <input type="text" placeholder="Notes..." name="notes" value={formInput.notes} onChange={handleChange} className="flex cursor-pointer items-center w-full h-9 mb-3 text-[11px] p-2 bg-[#E0E0E0] rounded-lg px-3" />
                                </div>

                            </div>

                        </div>

                        <div className="flex gap-2 justify-end mt-3">
                            <button onClick={handleShowConfirm} className="bg-red-400 px-3 py-1 rounded-lg">Cancel</button>
                            <button disabled={isBtnDisabled} type="submit" className=" bg-zinc-500 px-3 py-1 rounded-lg">Submit</button>
                        </div>



                    </form>
                </div>
            </div>

            {
                showCancelConfirm &&
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="p-6 rounded-xl shadow-lg bg-white">
                        <p className="w-full mb-4">Are you sure to cancel?</p>
                        <div className="flex items-center justify-between">
                            <button onClick={() => {
                                setShowCancelConfirm(false)
                            }} className=" bg-zinc-500 px-3 py-1 rounded-lg">Go Back</button>
                            <button onClick={handleCancel} className="bg-red-400 px-3 py-1 rounded-lg">Yes</button>
                        </div>
                    </div>

                </div>
            }

        </div>
    )
}

export default EditException