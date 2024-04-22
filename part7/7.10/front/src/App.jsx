import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import './main.css'
import Users from "./pages/Users"
import Header from "./components/Header"
import User from "./pages/User"
import Blogs from "./pages/Blogs"
import Layout from "./Layout"

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/blog/:id" element={<Blogs />} />
      </Routes>
    </Layout>
  )
}

export default App