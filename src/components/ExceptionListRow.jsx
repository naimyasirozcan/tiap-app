import { Link } from "react-router-dom"

function ExceptionListRow({ exception }) {
  return (
    <div className="w-full min-w-[1400px] grid grid-cols-12 gap-2 px-2 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="col-span-1 flex items-center justify-start text-xs underline">
        <Link to={`/logs/${exception._id}`}>{exception.no.slice(0, 10)}...</Link>
      </div>
      <div className="col-span-1 flex items-center justify-start text-xs">{exception.createdAt.slice(0, 10)}</div>
      <div className="col-span-1 flex items-center justify-start text-xs">{exception.receivedAs}</div>
      <div className="col-span-1 flex items-center justify-start text-xs">{exception.order.no.slice(0, 10)}...</div>
      <div className="col-span-1 flex items-center justify-start text-xs">{exception.type}</div>
      <div className="col-span-1 flex items-center justify-start text-xs">{exception.taskType}</div>
      <div className="col-span-1 flex items-center justify-start text-xs">{exception.location.name}</div>
      <div className="col-span-1 flex items-center justify-start text-xs">
        {exception.sku.name.length < 12 ? exception.sku.name : `${exception.sku.name.slice(0, 12)}...`}
      </div>
      <div className="col-span-1 flex items-center justify-start text-xs underline">
        <Link to={`/root-causes/${exception.rootcause._id}`}>
          {exception.rootcause.title.length < 12 ? exception.rootcause.title : `${exception.rootcause.title.slice(0, 12)}...`}
        </Link>
      </div>
      <div className="col-span-1 flex items-center justify-start text-xs">{exception.status}</div>
      <div className="col-span-1 flex items-center justify-start text-xs">
        {(!exception.exceptionLocation || exception.exceptionLocation === "") ? "-" : exception.exceptionLocation}
      </div>
      <div className="col-span-1 flex items-center justify-start text-xs">
        {exception.errorBy === null ? "-" : exception.errorBy.split("@")[0]}
      </div>
    </div>
  )
}

export default ExceptionListRow