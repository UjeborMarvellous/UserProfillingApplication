import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import Read from "./components/Read";
import Update from "./components/Update";
import UpdateWrite from "./components/UpdateWrite";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/Read" element={<Read />} />
          <Route path="/Update" element={<Update />} />
          <Route path="/UpdateTask/:firebaseId" element={<UpdateWrite />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App