import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import showPasswordIcon from "../../assets/eye-icon.png"
import { ToastContext } from "@/contexts/toast.context"

function Signup() {
  const { toast, setToasts, createToast } = useContext(ToastContext)
  const navigate = useNavigate()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [body, setBody] = useState({
    name: "",
    title: "",
    department: "",
    email: "",
    password: "",
  })

  const switchPasswordHide = () => {
    setIsPasswordHidden(!isPasswordHidden)
  }

  const handleChange = (e) => {

  const { name, value } = e.target

  const updatedBody = {
    ...body,
    [name]: value
  }

  setBody(updatedBody)

   console.log(`name: ${updatedBody.name},
    title: ${updatedBody.title},
    department: ${updatedBody.department},
    password: ${updatedBody.password},
    email: ${updatedBody.email},`)

}

  const handleSignup = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, body)

      console.log("Employee logged in to TIAP succesfully.")

      navigate("/login")

    } catch (error) {

      if (error.response && error.response.status === 400) {
        console.log(error.response.data.errorMessage)
        createToast("warning", error.response.data.errorMessage)
      }
      else {
        if (error.response && error.response.status === 500) {
          createToast("warning", error.response.data.errorMessage)
          navigate("/500")
        }
        else {
          console.log(error, "Unknown error.")
        }
      }
    }

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
            <label htmlFor="sign-up-btn" className="text-xs mb-1">Already have an account?</label>
            <button id="sign-up-btn" className="bottom-shadow rounded-lg h-9 w-full" ><Link to={"/login"} className="no-underline">Login</Link></button>
          </div>

        </div>

        <div className="xs:col-span-12 md:col-span-6 sm:col-span-12 flex flex-col justify-center items-center ">

          <div className="rounded-[36px] min-w-[350px] bg-[#F6F6F6] bottom-shadow p-8">

            <div>

              <form onSubmit={handleSignup}>

                <h2 className="text-xl mb-4">Sign Up</h2>

                <div className="grid grid-cols-12 gap-2">

                  <div className="xs:col-span-12 lg:col-span-6">

                    <h6 className="mb-2">Name:</h6>
                    <input type="name" value={body.name} name="name" placeholder="Adam Johnson" onChange={handleChange} className="w-full h-9 mb-3 text-sm bg-[#E0E0E0] rounded-lg p-3" />

                    <h6 className="mb-2">Title:</h6>
                    <select name="title" placeholder="password here..." onChange={handleChange} className="w-full h-9 mb-3 text-sm bg-[#E0E0E0] rounded-lg px-2">
                      <option value="operator">Operator</option>
                      <option value="coach">Coach</option>
                      <option value="team leader">Teamleader</option>
                      <option value="shift leader">Shiftleader</option>
                      <option value="exception handler">Exception Handler</option>
                      <option value="supervisor">Supervisor</option>
                    </select>

                    <h6 className="mb-2">Department:</h6>
                    <select name="department" placeholder="password here..." onChange={handleChange} className="w-full h-9 mb-3 text-sm bg-[#E0E0E0] rounded-lg px-2">
                      <option value=""></option>
                      <option value="outbound">Outbound</option>
                    </select>

                  </div>

                  <div className="xs:col-span-12 lg:col-span-6">

                    <h6 className="mb-2">Company Mail:</h6>
                    <input type="email" value={body.email} name="email" placeholder="name.surname01@company.com" onChange={handleChange} className="w-full h-9 mb-3 text-sm bg-[#E0E0E0] rounded-lg p-3" />

                    <h6 className="mb-2">Password:</h6>
                    <div className="relative">
                      <input type={isPasswordHidden ? "password" : "text"} value={body.password} name="password" placeholder="password here..." onChange={handleChange} className="w-full h-9 mb-3 text-sm bg-[#E0E0E0] rounded-lg p-3" />
                      <img onClick={switchPasswordHide} className="absolute right-2 top-1 cursor-pointer" src={showPasswordIcon} />
                    </div>

                  </div>
                </div>



                <div className="flex justify-end"> <button type="submit" className="mt-3 bg-zinc-500 px-3 py-1 rounded-lg">Sign Up</button></div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Signup
