
function InternalServerError() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full lg:px-[400px]">
        <h1 className="text-[50px] text-black mb-4"> 500, server error.</h1>
        <h5 className="text-[25px] text-black font-bold"> We can’t process your request due to a server error. </h5>
        <p className="text-[px] text-zinc-900 font-normal mb-4">Please try again in few minutes. If problem still exist, please contact with your supervisor. If the reason is server, you can be sure we are going to fix it A.S.A.P.</p>
        <span className="text-[11px]">You may want to move:</span>
        <div className="flex gap-4 items-center">
          <button id="sign-up-btn" className="rounded-lg h-9 w-[120px]" ><Link to={"/logs"} className="no-underline">Logs</Link></button>
          <button id="sign-up-btn" className="rounded-lg h-9 w-[120px]" ><Link to={"/dashboard"} className="no-underline">Dashboard</Link></button>
        </div>


      </div>
    </div>
  )
}

export default InternalServerError
