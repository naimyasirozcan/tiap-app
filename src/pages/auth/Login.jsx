import { useContext, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import logoIcon from "../../assets/tiap-icon-dark.png"
import { AuthContext } from "../../contexts/auth.context"
import axios from "axios"
import { ToastContext } from "@/contexts/toast.context"

function Login() {

  const { toast, setToasts, createToast } = useContext(ToastContext)
  const { isLoggedIn, setIsLoggedIn, loggedUserId, authenticateUser } = useContext(AuthContext)
  const [isButtonDisabled, setIsButtonDisabled] = useState()
  const navigate = useNavigate()
  const [body, setBody] = useState({
    email: "",
    password: ""
  })


  const handleChange = (e) => {
    e.target.name === "email" ? setBody({
      ...body, email: e.target.value
    }) : e.target.name === "password" ? setBody({
      ...body, password: e.target.value
    }) : null
  }

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, body)

      
      localStorage.setItem("authToken", response.data.authToken)
      
      await authenticateUser()
      
      navigate("/logs")

      createToast("success", `Welcome ${body.email}!`)
    } catch (error) {

        console.log(error.response.data.errorMessage)

        if(error.response.data.errorMessage !== "" && error.response.data.errorMessage ){
          createToast("danger", error.response.data.errorMessage)
        }
    }

  }

  if(isLoggedIn){
    return (
        <>
        {<Navigate to="/logs" />}
        </>
    )
  }

  return (
    <div
      className="w-full font-poppins text-black poppins-regular min-h-[calc(100vh-120px)] pt-10">

      <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-120px)]">

        <div className="xs:col-span-12 p-20 md:col-span-6 sm:col-span-12 lg-h-[calc(100vh-68px)] xl:pl-[200px] lg:pl-[200px] md:pl-[100px] flex flex-col justify-center items-start">

          <div className="max-w-screen-xl mb-10">
            <h1 className="text-[36px] mb-10">Track, solve, report, calculate.</h1>
            <p>Tiap is an assistant helps to organize error handling process on warehouse operations.
              <br />
              <br />
              You can easily define error types, descriptions and causes which you can use them in specified exception logs structured according to your needs.</p>
          </div>

          <div className="max-w-screen-xl flex flex-col">
            <label htmlFor="sign-up-btn" className="text-xs mb-1">Don't have an account?</label>
            <button id="sign-up-btn" className="rounded-lg h-9 w-full text-start" ><Link to={"/signup"} className="underline">Sign Up</Link></button>
          </div>

        </div>

        <div className="xs:col-span-12 md:col-span-6 sm:col-span-12 flex flex-col justify-center items-center ">

          <div className="h-[500px] w-[350px] rounded-[36px] bg-[#F6F6F6] p-8">

            <div className="w-full flex items-center justify-center">
              <img src={logoIcon} alt="" />
            </div>

            <div>

              <form onSubmit={handleLogin}>
                <h2 className="text-xl mb-4">Login</h2>
                <h6 className="mb-2">Company Mail:</h6>
                <input type="email" name="email" placeholder="employee@company.com" onChange={handleChange} className="w-full h-9 mb-3 bg-[#E0E0E0] rounded-lg p-3" />
                <h6>Password:</h6>
                <input type="password" name="password" placeholder="password here..." onChange={handleChange} className="w-full h-9 bg-[#E0E0E0] rounded-lg p-3" />
                <button type="submit" className="mt-3 bg-zinc-400 px-3 py-1 rounded-lg">Login</button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login