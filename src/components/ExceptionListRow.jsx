
function ExceptionListRow( { exception }) {
  return (
    <div className="w-full grid grid-cols-12 gap-0 p-2">

      <div className="h-[40px]col-span-1 flex items-center justify-start px-4">{exception.no}</div>

    </div>
  )
}

export default ExceptionListRow
