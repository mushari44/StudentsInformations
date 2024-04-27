import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/View";
import Edit from "./Components/EditStudents";
import Create from "./Components/AddStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
