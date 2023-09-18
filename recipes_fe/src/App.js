import { useState } from "react"
import Home from "./components/Home Page/home"
import LoginForm from "./components/Login and Register/Login"
import RegisterForm from "./components/Login and Register/register"

function App() {
  const [update, setUpdate] = useState(false)
  let token = JSON.parse(localStorage.getItem("token")) || ""
  return (
    <div>
      {token !== "" ? (
        <Home />
      ) : (
        <>
          <LoginForm />
          <RegisterForm />
        </>
      )}
      <Home />
    </div>
  )
}

export default App
