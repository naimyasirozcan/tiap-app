import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "./pages/Loading"
import InternalServerError from "./pages/errors/InternalServerError"
import Unathorized from "./pages/errors/Unauthorized"
import MyNavbar from "./components/MyNavbar"
import Sidebar from "./components/Sidebar"
import MyFooter from "./components/MyFooter"
import { Route, Routes } from "react-router-dom"
import CreateExceptionLog from "./pages/CreateExceptionLog"
import ExceptionDetails from "./pages/ExceptionDetails"
import ExceptionLogs from "./pages/ExceptionLogs"
import RootCauses from "./pages/RootCauses"
import RootCauseDetails from "./pages/RootCauseDetails"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/errors/NotFound"

function App() {

  return (
    <div style={{
      height: "100vh", width: "100%", background: "linear-gradient(0deg,rgba(0, 0, 0, 0.43) 25%, rgba(0, 0, 0, 0) 100%)"
    }}>
      <MyNavbar />
      <div style={
        {
          height: "100%",
          display: "flex",
          alignItems: "center"
        }
        }>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/logs" element={<ExceptionLogs/>}/>
          <Route path="/logs" element="./pages/"/>
        </Routes>
      </div>
      <MyFooter />
    </div>
  )
}

export default App