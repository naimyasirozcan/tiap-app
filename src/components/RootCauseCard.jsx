import { Link } from "react-router-dom"

function RootCauseCard({ rootCause }) {
  return (

    <div className={
      (rootCause.task === "picking" && rootCause.type === "damaged") ?
        "xs:col-span-12 md-col-span-6 lg:col-span-2 p-5 gap-4 bg-yellow-200 flex flex-col justify-between rounded-lg" :
        (rootCause.task === "picking" && rootCause.type === "missing") ?
          "xs:col-span-12 md-col-span-6 lg:col-span-2 p-5 gap-4 bg-orange-200 flex flex-col justify-between rounded-lg" :
          (rootCause.task === "packing" && rootCause.type === "damaged") ?
            "xs:col-span-12 md-col-span-6 lg:col-span-2 p-5 gap-4 bg-blue-200 flex flex-col justify-between rounded-lg" :
            (rootCause.task === "packing" && rootCause.type === "missing") ?
              "xs:col-span-12 md-col-span-6 lg:col-span-2 p-5 gap-4 bg-emerald-200 flex flex-col justify-between rounded-lg" :
              "xs:col-span-12 md-col-span-6 lg:col-span-2 p-5 gap-4 bg-slate-200 flex flex-col justify-between rounded-lg"
    }>
      <Link to={`/root-causes/${rootCause._id}`} >

        <h1 className="text-[20px] underline">
          {rootCause.title}
        </h1>

      </Link>

      <div className="flex flex-col gap-3 justify-end">


        <div className="flex flex-col gap-3">
          <h1>
            Task Type:
          </h1>

          <p>
            {rootCause.task}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h1>
            Exception Type:
          </h1>

          <p>
            {rootCause.type}
          </p>
        </div>

      </div>

    </div>

  )
}

export default RootCauseCard
