import { Button } from "@/components/ui/button"
import background from "./assets/PáginaInicial.svg"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div>
        <Router>
          <nav className="absolute bottom-0 right-0 m-3">
            <ul>
              <li>
                <Link to="/login">
                  <Button className={"m-1 w-32 border-2 border-gray-900 p-4 text-lg"}>
                    Login
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/registro">
                  <Button className={"m-1 w-32 border-2 border-gray-900 p-4 text-lg"}>
                    <h1>Cadastre-se</h1>
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/login"  />
            <Route path="/registro" element={<h1>registro</h1>} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
