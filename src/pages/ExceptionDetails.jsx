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
    <div className="px-10 pt-3">
      {/* <div className="rounded-[36px] min-w-[350px] bg-[#F6F6F6] bottom-shadow p-8">

        <div>

          <form onSubmit={handleCreateException}>

            <h2 className="text-xl mb-4">New Exception</h2>

            <div className="grid grid-cols-12 gap-0">

              <div className="xs:col-span-12 lg:col-span-8 grid grid-cols-12 gap-2">

                <div className="xs:col-span-12 lg:col-span-6">

                  <h6 className="mb-2">Received As</h6>

                  <select type="text" name="receivedAs" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                    <option value="" className="text-gray-500">received as</option>
                    <option value="operation error">Operation Error</option>
                    <option value="costumer complaint">Costumer Complaint</option>
                  </select>

                </div>

                <div className="xs:col-span-12 lg:col-span-6">

                  <h6 className="mb-2">Occured On</h6>

                  <select type="text" name="occurOn" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                    <option value="" className="text-gray-500">occurred on...</option>
                    <option value="picking">Picking</option>
                    <option value="packing">Packing</option>
                  </select>

                </div>

                <div className="xs:col-span-12 lg:col-span-6">

                  <h6 className="mb-2">Order No</h6>

                  <input type="text" value={formInput.orderNo} name="orderNo" placeholder="Example: WON20230125000001E" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                </div>

                <div className="xs:col-span-12 lg:col-span-6">

                  <h6 className="mb-2">SKU No</h6>

                  <input type="text" value={formInput.skuNo} name="skuNo" placeholder="Example: 156210" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                </div>

                <div className="xs:col-span-12 lg:col-span-6">

                  <h6 className="mb-2">Exception Type</h6>

                  <select type="text" name="exceptionType" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                    <option value="" className="text-gray-500">exception type...</option>
                    <option value="damaged">Damaged</option>
                    <option value="missing">Missing</option>
                  </select>

                </div>

                {
                  task &&
                  <>
                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Quantity</h6>

                      <input type="number" min={0} max={maxQty} value={formInput.skuQty} name="skuQty" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>


                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Zone</h6>

                      <input type="text" disabled={true} value={taskCollection.zone} name="zone" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Location</h6>

                      <input type="text" disabled={true} value={task.location.name} name="location" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Root Cause</h6>

                      <select type="text" name="rootCause" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
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

                      <input type="text" disabled={true} value={taskCollection.employee.department} name="location" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">SKU Price - €</h6>

                      <input type="text" disabled={true} value={sku.price} name="skuPrice" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Total Cost - €</h6>

                      <input type="text" disabled={true} value={sku.price * formInput.skuQty} name="totalCost" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Found by</h6>

                      <input type="email" placeholder="example: adam.johnson01@company.com" value={formInput.foundBy} name="foundBy" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Handled by</h6>

                      <input type="email" placeholder="example: adam.johnson01@company.com" value={formInput.handledBy} name="handledBy" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Error by</h6>

                      <input type="text" disabled={true} value={taskCollection.employee.email} name="errorBy" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" />

                    </div>

                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Status</h6>

                      <select type="text" name="status" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
                        <option value="" className="text-gray-500">status</option>
                        <option value="handled">Handled</option>
                        <option value="replaced">Replaced</option>
                        <option value="irrecoverible">Irrecoverible</option>
                        <option value="backlog">Backlog</option>
                      </select>

                    </div>

                  </>
                }
                {
                  isReplaced &&
                  <>
                    <div className="xs:col-span-12 lg:col-span-6">

                      <h6 className="mb-2">Replaced Cell</h6>

                      <select type="text" name="fakeLocation" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
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

                      <select type="text" name="fakeLocation" onChange={handleChange} className="col-span-1 w-full h-9 mb-3 text-[11px] bg-[#E0E0E0] rounded-lg px-3" >
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


                {imgFile && <div className="w-full h-auto flex items-center justify-center rounded-lg">
                  <img src={imgURL ? imgURL : ""} alt="exception image" className="max-h-[40%]" />
                </div>}
                {task &&
                  <>
                  
                <div className="mt-5">
                  <input required type="file" accept="image/*" placeholder="Choose an image" onChange={handleImageChange} className="flex cursor-pointer items-center w-full h-9 mb-3 text-[11px] p-2 bg-[#E0E0E0] rounded-lg px-3" />
                </div>

                <div className="mt-5">
                  <input type="text" placeholder="Notes..." name="notes" onChange={handleChange} className="flex cursor-pointer items-center w-full h-9 mb-3 text-[11px] p-2 bg-[#E0E0E0] rounded-lg px-3" />
                </div>

                  </>
                }

              </div>

            </div>

            <div className="flex gap-2 justify-end mt-3">
              <button className="bg-red-400 px-3 py-1 rounded-lg">Cancel</button>
              <button disabled={isBtnDisabled} type="submit" className=" bg-zinc-500 px-3 py-1 rounded-lg">Submit</button>
            </div>

          </form>

        </div>
      </div> */}
    </div>
  )
}

export default ExceptionDetails
