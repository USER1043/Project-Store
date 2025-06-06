import { Box, useColorModeValue } from "@chakra-ui/react"
import HomePage from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("blue.100","gray.895")}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/create" element={<CreatePage/>}></Route>
        </Routes>
      </Box>
    </>
  )
}

export default App
