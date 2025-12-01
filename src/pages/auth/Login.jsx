import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

function Login() {
  return (
    <div style={{
      height: "100%",
      width: "100%",
      paddingTop: "40px"
    }
    }
      className="container-fluid poppins-regular text-dark">

      <div className="row offset-2 h-100">

        <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center h-100"
          style={{ padding: "10px" }}>
          <div className="container">
            <h3 style={{ fontSize: "36px" }}>Track, solve, report, calculate.</h3>
            <p>Tiap is an assistant helps to organize error handling process on warehouse operations.
              <br />
              You can easily define error types, descriptions and causes which you can use them in specified exception logs structured according to your needs.</p>
          </div>
          <div className="container d-f flex-column">
            <label style={{ fontSize: "10px" }} htmlFor="sign-up-btn">Don't have an account?</label>
            <Button id="sign-up-btn" style={{ backgroundColor: "#868686" }}><Link>Sign Up</Link></Button>
          </div>
        </div>

        <div className="col-lg-5 d-flex flex-column justify-content-center align-items-start h-100"
          style={{ padding: "10px" }}>
          <h3 style={{ fontSize: "36px" }}>Track, solve, report, calculate.</h3>
          <p>Tiap is an assistant helps to organize error handling process on warehouse operations.
            <br />
            You can easily define error types, descriptions and causes which you can use them in specified exception logs structured according to your needs.</p>
        </div>

      </div>
    </div>
  )
}

export default Login
