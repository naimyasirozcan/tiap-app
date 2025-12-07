import { Link } from "react-router-dom"

function RootCauseCard({ rootCause }) {

  const getCardClass = () => {
    if (rootCause.task === "picking" && rootCause.type === "damaged") {
      return "col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 p-5 bg-yellow-100 flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[180px]"
    } else if (rootCause.task === "picking" && rootCause.type === "missing") {
      return "col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 p-5 bg-orange-100 flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[180px]"
    } else if (rootCause.task === "packing" && rootCause.type === "damaged") {
      return "col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 p-5 bg-blue-100 flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[180px]"
    } else if (rootCause.task === "packing" && rootCause.type === "missing") {
      return "col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 p-5 bg-emerald-100 flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[180px]"
    } else {
      return "col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 p-5 bg-slate-100 flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[180px]"
    }
  }

  return (
    <div className={getCardClass()}>
      <Link to={`/root-causes/${rootCause._id}`}>
        <h2 className="text-base font-semibold underline hover:text-blue-600 transition-colors mb-3">
          {rootCause.title}
        </h2>
      </Link>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-gray-700">Task Type:</h3>
          <p className="text-gray-600 capitalize">{rootCause.task}</p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-gray-700">Exception Type:</h3>
          <p className="text-gray-600 capitalize">{rootCause.type}</p>
        </div>
      </div>
    </div>
  )
}

export default RootCauseCard