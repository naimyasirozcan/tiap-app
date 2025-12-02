import { useState } from "react"
import { Link } from "react-router-dom"
import logoIcon from "../../assets/tiap-icon-dark.png"

function Login() {

  return (
    <div 
      className="w-full font-poppins text-black poppins-regular h-screen pt-10">

      <div className="grid grid-cols-12 gap-4">

        <div className="md:col-span-6 sm:col-span-12 h-[calc(100vh-68px)] md:pl-[400px] flex flex-col justify-center items-start">
          
          <div className="max-w-screen-xl mb-10">
            <h1 className="text-[36px] mb-10">Track, solve, report, calculate.</h1>
            <p>Tiap is an assistant helps to organize error handling process on warehouse operations.
              <br />
              <br />
              You can easily define error types, descriptions and causes which you can use them in specified exception logs structured according to your needs.</p>
          </div>

          <div className="max-w-screen-xl flex flex-col">
            <label htmlFor="sign-up-btn" className="text-xs mb-1">Don't have an account?</label>
            <button id="sign-up-btn" className="bottom-shadow rounded-lg h-9 w-full" ><Link to={"/signup"} className="no-underline">Sign Up</Link></button>
          </div>

        </div>

        <div className="md:col-span-6 sm:col-span-12 flex flex-col justify-center items-center ">

            <div className="h-[500px] w-[350px] rounded-[36px] bg-[#F6F6F6] bottom-shadow p-8">

              <div className="w-full flex items-center justify-center">
                <img src={logoIcon} alt="" />
              </div>

            <div>

              <form action="">
                <h2 className="text-xl mb-4">Login</h2>
                <h6 className="mb-2">Company Mail:</h6>
                <input type="text" placeholder="employee@company.com" className="w-full h-9 mb-3 bg-[#E0E0E0] rounded-lg p-3" />
                <h6>Password:</h6>
                <input type="password" placeholder="password here..." className="w-full h-9 bg-[#E0E0E0] rounded-lg p-3" />
              </form>
            </div>
            </div>


        </div>

      </div>
    </div>
  )
}

export default Login