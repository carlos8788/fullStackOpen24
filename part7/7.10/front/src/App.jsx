import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import './main.css'
import Users from "./pages/Users"
import Header from "./components/Header"

const App = () => {
  return (
    <>
      <NavBar />
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App