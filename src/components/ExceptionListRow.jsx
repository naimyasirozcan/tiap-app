import { Link } from "react-router-dom"

function ExceptionListRow( { exception }) {
  return (
    <div className="w-full grid grid-cols-12 gap-0 p-2">

      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px] underline"><Link to={`/logs/${exception._id}`}>{exception.no}</Link></div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.createdAt.slice(0,10)}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.receivedAs }</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{<Link to={`/orders/${exception.order._id}`}>{exception.order.no}</Link>}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.type}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.taskType}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.location.name}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.sku.name.length < 12 ? exception.sku.name : `${exception.sku.name.slice(0, 12)}...`}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]"><Link to={`/root-causes/${exception.rootcause._id}`}>{exception.rootcause.title.length < 12 ? exception.rootcause.title : `${exception.rootcause.title.slice(0, 12)}...`}</Link></div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.status}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{(!exception.exceptionLocation || exception.exceptionLocation === "" ) ? "-" : exception.exceptionLocation}</div>
      <div className="h-[40px]col-span-1 flex items-center justify-start text-[11px]">{exception.errorBy === null ? "-" : exception.errorBy}</div>

    </div>
  )
}

export default ExceptionListRow