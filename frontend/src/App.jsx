import {Route, Routes} from "react-router"
import Homepage from "./Pages/Homepage.jsx"
import CreateNote from "./Pages/CreateNote.jsx"
import NoteDetailsPage from "./Pages/NoteDetailsPage.jsx"
import { ToastContainer } from "react-toastify"
function App() {


  return (
    <div className="relative h-full w-full">
    <div className="absolute inset-0 -z-10 h-full items-center px-5 py-24 [background: radial-gradient(125%_125%_at_50%_10%,#000_60%,#00ff9d40_100%)]"/> 
    <ToastContainer />
    <Routes>
     <Route path="/" element={<Homepage />} />
     <Route path="/create" element={<CreateNote />} />
     <Route path="/note/:id" element={<NoteDetailsPage />} />
    </Routes>

   </div>
  )
}

export default App
