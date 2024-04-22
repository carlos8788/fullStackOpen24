import { Container } from "@mui/material"
import Header from "./components/Header"
import NavBar from "./components/NavBar"

const Layout = ({children}) => {
  return (
    <Container maxWidth="xl">
        <NavBar/>
        <Header/>
        {children}
    </Container>
  )
}
export default Layout