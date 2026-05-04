import { PaginaInicial } from "./pages/PaginaInicial";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoverPass } from "./pages/RecoverPass";
import { ChangingPass } from "./pages/ChangingPass";


export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/recoverpass" element={<RecoverPass/>}/>
        <Route path="/changepass" element={<ChangingPass/>}/>
      </Routes>
    </Router>
  )
}

export default App
