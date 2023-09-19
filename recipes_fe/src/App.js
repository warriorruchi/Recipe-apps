import { useState } from "react"
import Home from "./components/Home Page/home"
import LoginForm from "./components/Login and Register/Login"
import RegisterForm from "./components/Login and Register/register"
import Faviouate from "./components/Faviouate Page/faviouate"
import {BrowserRouter, Routes,Route,Link, useNavigate} from "react-router-dom"

function App() {
  const [update, setUpdate] = useState(false)
  let navigate=useNavigate()
  let token = JSON.parse(localStorage.getItem("token")) || ""
  return (<>
    <nav>
    {token!==""?<ul>
        <li><Link to="/">Home</Link></li>  
        <li><Link to="/favourites">Favourites</Link></li>  
        <li onClick={()=>{
          localStorage.removeItem("token")
          navigate("/login")
          }}>Logout</li>  
      </ul>:<ul>
        <li><Link to="/register">Register</Link></li>  
        <li><Link to="/login">Login</Link></li>  
          
      </ul>}
      
    </nav>
    
    <Routes>
    <Route path={"/"} element={token!==""?<Home setUpdate={setUpdate}/>:<LoginForm setUpdate={setUpdate}/>}/>
    <Route path={"/login"} element={token===""?<LoginForm setUpdate={setUpdate}/>:<Home/>}/>
    <Route path={"/register"} element={token===""?<RegisterForm setUpdate={setUpdate}/>:<Home/>}/>
    <Route path={"/favourites"} element={token!==""?<Faviouate setUpdate={setUpdate} update={update}/>:<LoginForm setUpdate={setUpdate}/>}/>
    </Routes>
   
    </>
  )
}

export default App
